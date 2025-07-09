import { prisma } from '@/lib/prisma';
import { composeMiddleware, isAuthenticated, isAdmin } from './middleware';

const UserResolvers = {
  Query: {
    users: composeMiddleware(isAuthenticated)(async () => {
      return await prisma.user.findMany();
    }),
    user: composeMiddleware(isAuthenticated)(async (_: any, { id }: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id },
      });
    }),
  },
  Mutation: {
    updateUser: composeMiddleware(isAuthenticated)(async (_: any, { id, fname, email, age }: { id: string; fname?: string; email?: string; age?: number }) => {
      return await prisma.user.update({
        where: { id },
        data: {
          ...(fname !== undefined && { fname }),
          ...(email !== undefined && { email }),
          ...(age !== undefined && { age }),
        },
      });
    }),
    deleteUser: async (_: any, { id }: { id: string }) => {
      return await prisma.user.delete({
        where: { id },
      });
    },
  },
};


export default UserResolvers;