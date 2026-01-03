import { prisma } from '@/lib/prisma';
import { UserProfile } from '../types/User';


export const getMe = async (userId: string): Promise<UserProfile | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                userAccounts: {
                    where: { isActive: true },
                    include: {
                        subAccounts: {
                            where: { isActive: true },
                            select: {
                                id: true,
                                name: true,
                                balance: true,
                                description: true,
                                isActive: true,
                            }
                        }
                    }
                },
                categories: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        color: true,
                        icon: true,
                    }
                },
                _count: {
                    select: {
                        transactions: true,
                        categories: true,
                        userAccounts: true,
                    }
                }
            }
        });

        if (!user) {
            return null;
        }

        // Calculate total balance across all sub accounts
        const totalBalance = user.userAccounts.reduce((total, account) => {
            return total + account.subAccounts.reduce((subTotal, subAccount) => {
                return subTotal + Number(subAccount.balance);
            }, 0);
        }, 0);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            theme: user.theme,
            colorTheme: user.colorTheme,
            isAdmin: user.isAdmin || false,
            createdAt: user.createdAt,
            userAccounts: user.userAccounts.map(account => ({
                id: account.id,
                type: account.type,
                currency: account.currency,
                isActive: account.isActive,
                subAccounts: account.subAccounts.map(subAccount => ({
                    id: subAccount.id,
                    name: subAccount.name,
                    balance: Number(subAccount.balance),
                    description: subAccount.description,
                    isActive: subAccount.isActive,
                }))
            })),
            categories: user.categories,
            stats: {
                totalTransactions: user._count.transactions,
                totalCategories: user._count.categories,
                totalAccounts: user._count.userAccounts,
                totalBalance,
            }
        };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
};

export const UpdateUser = async (userId: string, data: any) => {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: data
        });

        return user;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error
    }
}