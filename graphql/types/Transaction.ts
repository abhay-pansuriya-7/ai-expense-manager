export type TransactionInput = {
    id?: string;
    amount: number;
    description: string;
    date: string;
    type: "EXPENSE" | "INCOME" | "TRANSFER";
    categoryId: string;
    isRecurring: boolean;
    recurringItemId: string;
    attachments?: string[];
    recurringData?: RecurringDataInput;
};

export type RecurringDataInput = {
    name: string;
    frequency: string;
    interval: number;
    startDate: string;
    endDate?: string;
};