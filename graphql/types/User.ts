export interface UserProfile {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    theme: string;
    colorTheme: string;
    isAdmin: boolean;
    createdAt: Date;
    userAccounts: {
        id: string;
        type: string;
        currency: string
        isActive: boolean;
        subAccounts: {
            id: string;
            name: string;
            balance: number;
            description: string | null;
            isActive: boolean;
        }[];
    }[];
    categories: {
        id: string;
        name: string;
        type: string;
        color: string | null;
        icon: string | null;
    }[];
    stats: {
        totalTransactions: number;
        totalCategories: number;
        totalAccounts: number;
        totalBalance: number;
    };
}

export type updateUserInput = {
    id: string,
    input: {
        name?: string | null;
        email?: string;
        image?: string | null;
        theme?: string;
        colorTheme?: string;
    }
}