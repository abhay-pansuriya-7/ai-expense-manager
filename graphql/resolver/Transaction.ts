import { prisma } from '@/lib/prisma';
import { composeMiddleware, isAuthenticated } from './middleware';
import { TransactionInput } from '../types/Transaction';

const TransactionResolver = {
    Query: {
        getAllTransactions: composeMiddleware(isAuthenticated)(async (_: any, {
            page = 1,
            limit = 10,
            search,
            sortBy = 'date',
            sortOrder = 'desc',
            type
        }: {
            page?: number;
            limit?: number;
            search?: string;
            sortBy?: string;
            sortOrder?: 'asc' | 'desc';
            type?: 'EXPENSE' | 'INCOME' | 'TRANSFER';
        }, context: any) => {
            try {
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");

                const skip = (page - 1) * limit;

                // Build where clause
                const where: any = { userId };
                if (search) {
                    where.OR = [
                        { description: { contains: search, mode: 'insensitive' } },
                        { notes: { contains: search, mode: 'insensitive' } }
                    ];
                }
                if (type) { where.type = type; }

                // Build orderBy clause
                const orderBy: any = {};
                orderBy[sortBy] = sortOrder;

                const [transactions, total] = await Promise.all([
                    prisma.transaction.findMany({
                        where,
                        orderBy,
                        skip,
                        take: limit,
                        include: {
                            category: true,
                            attachments: true,
                            recurringItem: true
                        }
                    }),
                    prisma.transaction.count({ where })
                ]);

                return {
                    status: true,
                    message: "Transactions retrieved successfully",
                    data: transactions.map(transaction => ({
                        ...transaction,
                        amount: parseFloat(transaction.amount.toString()),
                        date: transaction.date.toISOString(),
                        createdAt: transaction.createdAt.toISOString(),
                        updatedAt: transaction.updatedAt.toISOString(),
                        attachments: transaction.attachments.map(att => att.url)
                    })),
                    pagination: {
                        page,
                        limit,
                        total,
                        totalPages: Math.ceil(total / limit)
                    }
                };
            } catch (e: any) {
                console.log("🚀 ~ getAllTransactions ~ e:", e);
                return {
                    status: false,
                    message: e.message ?? "Something went wrong while fetching transactions",
                    data: []
                };
            }
        }),

        getTransaction: composeMiddleware(isAuthenticated)(async (_: any, { id }: { id: string }, context: any) => {
            try {
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");

                const transaction = await prisma.transaction.findFirst({
                    where: { id, userId },
                    include: {
                        category: true,
                        attachments: true,
                        recurringItem: true
                    }
                });

                if (!transaction) {
                    throw new Error("Transaction not found");
                }

                return {
                    status: true,
                    message: "Transaction retrieved successfully",
                    data: {
                        ...transaction,
                        amount: parseFloat(transaction.amount.toString()),
                        date: transaction.date.toISOString(),
                        createdAt: transaction.createdAt.toISOString(),
                        updatedAt: transaction.updatedAt.toISOString(),
                        attachments: transaction.attachments.map(att => att.url)
                    }
                };
            } catch (e: any) {
                console.log("🚀 ~ getTransaction ~ e:", e);
                return {
                    status: false,
                    message: e.message ?? "Something went wrong while fetching transaction",
                    data: null
                };
            }
        }),
    },

    Mutation: {
        addTransaction: composeMiddleware(isAuthenticated)(async (_: any, { input }: { input: TransactionInput }, context: any) => {
            try {
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");

                const { amount, description, date, type, categoryId, isRecurring, recurringItemId, attachments = [] } = input;

                // Create transaction
                const transaction = await prisma.transaction.create({
                    data: {
                        userId,
                        amount,
                        description,
                        date: new Date(date),
                        type,
                        categoryId,
                        isRecurring,
                        recurringItemId: recurringItemId || null,
                        attachments: {
                            create: attachments.map(url => ({
                                url,
                                type: 'attachment',
                                name: url.split('/').pop() || 'attachment',
                                size: 0
                            }))
                        }
                    },
                    include: {
                        category: true,
                        attachments: true,
                        recurringItem: true
                    }
                });

                return {
                    status: true,
                    message: "Transaction added successfully",
                    data: {
                        ...transaction,
                        amount: parseFloat(transaction.amount.toString()),
                        date: transaction.date.toISOString(),
                        createdAt: transaction.createdAt.toISOString(),
                        updatedAt: transaction.updatedAt.toISOString(),
                        attachments: transaction.attachments.map(att => att.url)
                    }
                };
            } catch (e: any) {
                console.log("🚀 ~ addTransaction ~ e:", e);
                return {
                    status: false,
                    message: e.message ?? "Something went wrong while adding transaction",
                    data: null
                };
            }
        }),

        updateTransaction: composeMiddleware(isAuthenticated)(async (_: any, { id, input }: { id: string; input: TransactionInput }, context: any) => {
            try {
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");

                const existingTransaction = await prisma.transaction.findFirst({
                    where: { id, userId }
                });

                if (!existingTransaction) {
                    throw new Error("Transaction not found");
                }

                const {
                    amount,
                    description,
                    date,
                    type,
                    categoryId,
                    isRecurring,
                    recurringItemId,
                    attachments = []
                } = input;

                // Update transaction
                await prisma.transaction.update({
                    where: { id },
                    data: {
                        ...(amount !== undefined && { amount }),
                        ...(description !== undefined && { description }),
                        ...(date !== undefined && { date: new Date(date) }),
                        ...(type !== undefined && { type }),
                        ...(categoryId !== undefined && { categoryId }),
                        ...(isRecurring !== undefined && { isRecurring }),
                        ...(recurringItemId !== undefined && { recurringItemId }),
                    }
                });

                // Handle attachments update if provided
                if (attachments.length > 0) {
                    // Delete existing attachments
                    await prisma.attachment.deleteMany({
                        where: { transactionId: id }
                    });

                    // Create new attachments
                    await prisma.attachment.createMany({
                        data: attachments.map(url => ({
                            transactionId: id,
                            url,
                            type: 'attachment',
                            name: url.split('/').pop() || 'attachment',
                            size: 0
                        }))
                    });
                }

                return {
                    status: true,
                    message: "Transaction updated successfully"
                };
            } catch (e: any) {
                console.log("🚀 ~ updateTransaction ~ e:", e);
                return {
                    status: false,
                    message: e.message ?? "Something went wrong while updating transaction"
                };
            }
        }),

        deleteTransaction: composeMiddleware(isAuthenticated)(async (_: any, { id }: { id: string }, context: any) => {
            try {
                const userId = context?.session?.user?.id ?? "";
                if (!userId) throw new Error("User not found");

                const existingTransaction = await prisma.transaction.findFirst({
                    where: { id, userId }
                });

                if (!existingTransaction) {
                    throw new Error("Transaction not found");
                }

                // Delete attachments first
                await prisma.attachment.deleteMany({
                    where: { transactionId: id }
                });

                // Delete transaction
                await prisma.transaction.delete({
                    where: { id }
                });

                return {
                    status: true,
                    message: "Transaction deleted successfully"
                };
            } catch (e: any) {
                console.log("🚀 ~ deleteTransaction ~ e:", e);
                return {
                    status: false,
                    message: e.message ?? "Something went wrong while deleting transaction"
                };
            }
        }),
    },
};

export default TransactionResolver;