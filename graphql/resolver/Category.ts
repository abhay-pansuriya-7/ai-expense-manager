import { prisma } from '@/lib/prisma';
import { composeMiddleware, isAuthenticated } from './middleware';
import { CategoryInput } from '../types/Category';

const CategoryResolver = {
    Query: {
        getAllCategories: composeMiddleware(isAuthenticated)(async (_: any, { page = 1, limit = 10, search, sortBy = 'name', sortOrder = 'asc', type }: {
            page?: number;
            limit?: number;
            search?: string;
            sortBy?: string;
            sortOrder?: 'asc' | 'desc';
            type?: string
        }, context: any) => {
            try {
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");

                const skip = (page - 1) * limit;

                // Build where clause
                const where: any = { userId };
                if (search) { where.name = { contains: search, mode: 'insensitive' }; }
                if (type) { where.type = type; }

                // Build orderBy clause
                const orderBy: any = {};
                orderBy[sortBy] = sortOrder;

                const [categories, total] = await Promise.all([
                    prisma.category.findMany({ where, orderBy, skip, take: limit, }),
                    prisma.category.count({ where })
                ]);

                return {
                    status: true,
                    message: "Categories retrieved successfully",
                    data: categories,
                    pagination: {
                        page,
                        limit,
                        total,
                        totalPages: Math.ceil(total / limit)
                    }
                };
            } catch (e: any) {
                console.log("🚀 ~ getAllCategories ~ e:", e);
                return {
                    status: false,
                    message: e.message ?? "Something went wrong while fetching categories",
                    data: []
                };
            }
        }),
        getCategory: composeMiddleware(isAuthenticated)(async (_: any, { id }: { id: string }, context: any) => {
            try {
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");

                const category = await prisma.category.findFirst({ where: { id, userId } });
                if (!category) { throw new Error("Category not found"); }

                return { status: true, message: "Category retrieved successfully", data: category };
            } catch (e: any) {
                console.log("🚀 ~ getCategory ~ e:", e);
                return { status: false, message: e.message ?? "Something went wrong while fetching category", data: null };
            }
        }),
    },
    Mutation: {
        createCategory: composeMiddleware(isAuthenticated)(async (_: any, { input }: { input: CategoryInput }, context: any) => {
            try {
                const { name, type, description, color, icon, expenseLimit } = input;
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");
                const category = await prisma.category.create({
                    data: { name, type, description, color, icon, expenseLimit, userId },
                });
                return { status: true, message: "Hello there", data: category }
            } catch (e: any) {
                console.log("🚀 ~ createCategory:composeMiddleware ~ e:", e)
                return { status: false, message: e.message ?? "Something went wrong while creating category" }
            }
        }),

        updateCategory: composeMiddleware(isAuthenticated)(async (_: any, { id, input }: { id: string; input: CategoryInput }, context: any) => {
            try {
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");

                const existingCategory = await prisma.category.findFirst({ where: { id, userId } });

                if (!existingCategory) { throw new Error("Category not found"); }

                const { name, type, description, color, icon, expenseLimit } = input;

                await prisma.category.update({
                    where: { id },
                    data: {
                        ...(name !== undefined && { name }),
                        ...(type !== undefined && { type }),
                        ...(description !== undefined && { description }),
                        ...(color !== undefined && { color }),
                        ...(icon !== undefined && { icon }),
                        ...(expenseLimit !== undefined && { expenseLimit }),
                    },
                });

                return {
                    status: true,
                    message: "Category updated successfully"
                };
            } catch (e: any) {
                console.log("🚀 ~ updateCategory ~ e:", e);
                return {
                    status: false,
                    message: e.message ?? "Something went wrong while updating category"
                };
            }
        }),

        deleteCategory: composeMiddleware(isAuthenticated)(async (_: any, { id }: { id: string }, context: any) => {
            try {
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");

                const existingCategory = await prisma.category.findFirst({ where: { id, userId } });
                if (!existingCategory) { throw new Error("Category not found"); }

                await prisma.category.delete({ where: { id } });
                return { status: true, message: "Category deleted successfully" };
            } catch (e: any) {
                console.log("🚀 ~ deleteCategory ~ e:", e);
                return {
                    status: false,
                    message: e.message ?? "Something went wrong while deleting category"
                };
            }
        }),

    },
};


export default CategoryResolver;