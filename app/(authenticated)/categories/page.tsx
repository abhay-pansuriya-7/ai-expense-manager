"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2, DollarSign, TrendingUp } from "lucide-react"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { CategoryForm } from "@/components/category-form"
import { useQuery } from "@apollo/client"
import { GET_ALL_CATEGORIES } from "./gql"
import Loading from "@/components/Loading"

// Mock data
const mockExpenseCategories = [
    { id: 1, name: "Food & Dining", color: "#FF6B6B", icon: "UtensilsCrossed", limit: 2000, spent: 1200 },
    { id: 2, name: "Transportation", color: "#4ECDC4", icon: "Car", limit: 1500, spent: 800 },
    { id: 3, name: "Entertainment", color: "#45B7D1", icon: "Film", limit: 500, spent: 300 },
    { id: 4, name: "Shopping", color: "#96CEB4", icon: "ShoppingBag", limit: 1000, spent: 1100 },
    { id: 5, name: "Healthcare", color: "#FFEAA7", icon: "Heart", limit: 800, spent: 200 },
    { id: 6, name: "Utilities", color: "#DDA0DD", icon: "Zap", limit: 600, spent: 550 },
]

const mockIncomeCategories = [
    { id: 1, name: "Salary", color: "#2ECC71", icon: "Briefcase" },
    { id: 2, name: "Freelance", color: "#3498DB", icon: "Laptop" },
    { id: 3, name: "Investment", color: "#E74C3C", icon: "TrendingUp" },
    { id: 4, name: "Business", color: "#F39C12", icon: "Building" },
]

const renderIcon = (iconName: string, size = 20) => {
    const IconComponent = (Icons as any)[iconName as keyof typeof Icons]
    return IconComponent ? <IconComponent size={size} /> : <Icons.Circle size={size} />
}

export default function CategoriesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("expense")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("expense")

    const { loading, error, data } = useQuery(GET_ALL_CATEGORIES, {
        variables: {
            page: 1,
            limit: 10,
            search: "",
            sortBy: "name",
            sortOrder: "asc",
            type: selectedCategory === "expense" ? "EXPENSE" : "INCOME"
        },
        nextFetchPolicy: "cache-first"
    });

    const categories = useMemo(() => { return data?.getAllCategories?.data || [] }, [data])

    const filteredExpenseCategories = mockExpenseCategories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const filteredIncomeCategories = mockIncomeCategories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleEdit = (category: any) => {
        setSelectedCategory(category)
        setIsAddDialogOpen(true)
    }

    const handleDelete = (categoryId: any) => {
        console.log("Delete category:", categoryId)
    }

    const CategoryCard = ({ category, type }: any) => {
        const isOverLimit = type === "expense" && category.spent > category.limit
        const limitPercentage = type === "expense" ? (category.spent / category.limit) * 100 : 0

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: category.color + "20", color: category.color }}
                                >
                                    {renderIcon(category.icon, 24)}
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{category.name}</CardTitle>
                                    {type === "expense" && (
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Badge variant={isOverLimit ? "destructive" : "secondary"} className="text-xs">
                                                ${category.spent} / ${category.limit}
                                            </Badge>
                                            {isOverLimit && (
                                                <Badge variant="destructive" className="text-xs">
                                                    Over Limit!
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete "{category.name}"? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(category.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </CardHeader>
                    {type === "expense" && (
                        <CardContent className="pt-0">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Spending Progress</span>
                                    <span>{limitPercentage.toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${isOverLimit ? "bg-destructive" : "bg-primary"
                                            }`}
                                        style={{ width: `${Math.min(limitPercentage, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    )}
                </Card>
            </motion.div>
        )
    }

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
                                        <Button onClick={() => setSelectedCategory("expense")}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Category
                                        </Button>
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
                                                setSelectedCategory("expense")
                                            }}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Search */}
                            <div className="relative max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search categories..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Tabs */}
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 max-w-md">
                                    <TabsTrigger value="expense" className="flex items-center space-x-2">
                                        <DollarSign className="h-4 w-4" />
                                        <span>Expenses</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="income" className="flex items-center space-x-2">
                                        <TrendingUp className="h-4 w-4" />
                                        <span>Income</span>
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="expense" className="mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categories.map((category: any) => (
                                            <CategoryCard key={category.id} category={category} type="expense" />
                                        ))}
                                    </div>
                                    {loading ? <Loading /> : categories.length === 0 && (
                                        <div className="text-center py-12">
                                            <p className="text-muted-foreground">No expense categories found.</p>
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="income" className="mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categories.map((category: any) => (
                                            <CategoryCard key={category.id} category={category} type="income" />
                                        ))}
                                    </div>
                                    {loading ? <Loading /> : categories.length === 0 && (
                                        <div className="text-center py-12">
                                            <p className="text-muted-foreground">No income categories found.</p>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}
