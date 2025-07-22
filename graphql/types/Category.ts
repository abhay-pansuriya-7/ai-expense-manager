export type CategoryInput = {
    name: string
    type: "EXPENSE" | "INCOME" | "TRANSFER"
    description: string
    color: string
    icon: string
    expenseLimit: number
}