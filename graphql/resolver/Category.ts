import { prisma } from '@/lib/prisma';
import { composeMiddleware, isAuthenticated } from './middleware';
import { CategoryInput } from '../types/Category';

const CategoryResolver = {
    Query: {
        getAllCategories: composeMiddleware(isAuthenticated)(async () => {
            return await prisma.user.findMany();
        }),
        getCategory: composeMiddleware(isAuthenticated)(async (_: any, { id }: { id: string }) => {
            return await prisma.user.findUnique({
                where: { id },
            });
        }),
    },
    Mutation: {
        createCategory: composeMiddleware(isAuthenticated)(async (_: any, { input }: { input: CategoryInput }, context: any) => {
            try {

                const { name, type, description, color, icon, expenseLimit } = input;
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");
                const category = await prisma.category.create({
                    data: {
                        name,
                        type,
                        description,
                        color,
                        icon,
                        expenseLimit,
                        userId
                    },
                });
                return { status: true, message: "Hello there", data: category }
            } catch (e: any) {
                console.log("🚀 ~ createCategory:composeMiddleware ~ e:", e)
                return { status: false, message: e.message ?? "Something went wrong while creating category" }
            }
        }),

        updateCategory: composeMiddleware(isAuthenticated)(async (_: any, { id, fname, email, age }: { id: string; fname?: string; email?: string; age?: number }) => {
            return await prisma.user.update({
                where: { id },
                data: {
                    ...(fname !== undefined && { fname }),
                    ...(email !== undefined && { email }),
                    ...(age !== undefined && { age }),
                },
            });
        }),

        deleteCategory: composeMiddleware(isAuthenticated)(async (_: any, { id, fname, email, age }: { id: string; fname?: string; email?: string; age?: number }) => {
            return await prisma.user.update({
                where: { id },
                data: {
                    ...(fname !== undefined && { fname }),
                    ...(email !== undefined && { email }),
                    ...(age !== undefined && { age }),
                },
            });
        }),

    },
};


export default CategoryResolver;