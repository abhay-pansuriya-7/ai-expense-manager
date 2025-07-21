import { prisma } from '@/lib/prisma';

type AccountType = "PERSONAL" | "BUSINESS" | "SAVINGS" | "INVESTMENT";

export const CreateUserDefaultAccount = async (userId: string, type: AccountType) => {
    try {
        // validating user
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) { throw new Error("User not found while creating user account"); }

        const userAccountData = {
            userId,
            type,
            currency: "INR"
        }
        const userAccount = await prisma.userAccount.create({ data: userAccountData });

        const subUserAccountData = {
            userAccountId: userAccount.id,
            name: "Default Account",
            balance: 0,
            description: "Your Default Account"
        }
        await prisma.subUserAccount.create({ data: subUserAccountData });

        return { status: true, message: "User account created successfully" }

    } catch (err: any) {
        return { status: false, message: err?.message }
    }

};