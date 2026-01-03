import { prisma } from '@/lib/prisma';
import { composeMiddleware, isAuthenticated, isAdmin } from './middleware';
import { updateUserInput } from '../types/User';
import { UpdateUser } from '../services/User';

const UserResolvers = {
	Query: {
		getUser: composeMiddleware(isAuthenticated)(async (_: any, args: any, context: any) => {
			try {
				const userId = context?.session?.user?.id ?? "";
				const user = await prisma.user.findUnique({ where: { id: userId, isDeleted: false }, include: { userAccounts: { include: { subAccounts: true } } } });
				return { status: true, message: "User fetched successfully", data: user }
			} catch (err: any) {
				return { status: false, message: err?.message ?? "Something went wrong while fetching user" }
			}
		}),
	},
	Mutation: {
		updateUser: composeMiddleware(isAuthenticated)(async (_: any, inp: updateUserInput) => {
			try {
				const { id, input } = inp;
				const result = await UpdateUser(id, input);
				if (result?.id) {
					return { status: true, message: "User updated successfully", data: result }
				}
				return { status: false, message: "Something went wrong while updating user " }
			} catch (err: any) {
				return { status: false, message: err?.message ?? "Something went wrong while updating user" }
			}
		}),

		deleteUser: async (_: any, { id }: { id: string }) => {
			try {
				const user = await prisma.user.update({ where: { id }, data: { isDeleted: true } });
				if (user?.id) {
					return { status: true, message: "User deleted successfully" }
				}
				return { status: false, message: "Something went wrong while deleting user" }
			} catch (err: any) {
				return { status: false, message: err?.message ?? "Something went wrong while deleting user" }
			}
		},
	},
};


export default UserResolvers;