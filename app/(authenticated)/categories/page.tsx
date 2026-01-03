"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowDownUp, ArrowUp, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CategoryForm from "@/components/category-form"
import { useQuery } from "@apollo/client"
import { GET_ALL_CATEGORIES } from "./gql"
import Loading from "@/components/Loading"
import CategoryCard from "./CategoryCard"
import { Label } from "recharts"
import { ThemedSelect } from "@/components/themed-select"
const transactionTypeOptions = [
    { value: "ALL", label: "All", icon: <ArrowDownUp color="#2563eb" /> },
    { value: "EXPENSE", label: "Expense", icon: <ArrowDown color="#ef4444" /> },
    { value: "INCOME", label: "Income", icon: <ArrowUp color="#22c55e" /> },
]

const CategoriesPage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("EXPENSE");
    const [category, setCategory] = useState("ALL")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("EXPENSE")

    const { loading, refetch, data } = useQuery(GET_ALL_CATEGORIES, {
        variables: {
            page: 1,
            limit: 10,
            search: searchTerm,
            sortBy: "type",
            sortOrder: "asc",
            ...(category !== "ALL" && { type: category })
        },
        nextFetchPolicy: "cache-and-network"
    });

    const categories = useMemo(() => { return data?.getAllCategories?.data || [] }, [data])
    return (
        <main className="flex-1 container mx-auto px-4 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="min-h-screen">
                    <div className="container mx-auto px-4 pb-20 pt-4">
                        <div className="flex flex-col space-y-6">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                                    <p className="text-muted-foreground">Manage your expense and income categories</p>
                                </div>
                                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setSelectedCategory("")}><Plus className="h-4 w-4" />Add Category</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>{selectedCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                                        </DialogHeader>
                                        <CategoryForm
                                            category={selectedCategory}
                                            type={activeTab}
                                            onClose={() => {
                                                setIsAddDialogOpen(false)
                                                setSelectedCategory("")
                                            }}
                                            refetch={refetch}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>


                            {/* Search and Category Type filter */}
                            <div className="flex flex-col sm:flex-row gap-4 sm:items-end md:justify-between md:items-center">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        placeholder="Search categories..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="space-y-3 flex-1 max-w-md">
                                    <Label className="text-sm font-medium">Category Type</Label>
                                    <ThemedSelect
                                        options={transactionTypeOptions}
                                        value={transactionTypeOptions.find((t) => t.value === category) || null}
                                        onChange={(option: any) => setCategory(option?.value)}
                                        placeholder="Select transaction type"
                                        isSearchable={false}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categories.map((category: any) => (
                                        <CategoryCard
                                            key={category.id}
                                            category={category}
                                            type="expense" refetch={refetch}
                                            setSelectedCategory={setSelectedCategory}
                                            setIsAddDialogOpen={setIsAddDialogOpen}
                                        />
                                    ))}
                                </div>
                                {(loading) ? <Loading /> : categories.length === 0 && (
                                    <div className="text-center py-12">
                                        <p className="text-muted-foreground">No expense categories found.</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}


export default CategoriesPage;