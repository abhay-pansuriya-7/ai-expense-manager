"use client"
import { IconColorOptions } from "@/lib/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import * as Icons from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useMutation } from "@apollo/client"
import { DELETE_CATEGORY } from "./gql"
import { toast } from "sonner"
const renderIcon = (iconName: string, size = 20) => {
    const IconComponent = (Icons as any)[iconName as keyof typeof Icons]
    return IconComponent ? <IconComponent size={size} /> : <Icons.Circle size={size} />
}
const CategoryCard = ({ category, type, refetch, setSelectedCategory, setIsAddDialogOpen }: any) => {
    const spent = category?.spent || 0;
    type = category?.type || type;
    const expenseLimit = category?.expenseLimit || 0;
    const isOverLimit = type === "EXPENSE" && spent > expenseLimit;
    const limitPercentage = type === "EXPENSE" ? (spent / expenseLimit) * 100 : 0;
    const color = IconColorOptions.find((c) => c.label === category.color)?.value;

    const [DeleteCategory, { loading: deleteLoading }] = useMutation(DELETE_CATEGORY)


    const handleEdit = (category: any) => {
        setSelectedCategory(category)
        setIsAddDialogOpen(true)
    }

    const handleDelete = (categoryId: any) => {
        DeleteCategory({
            variables: { deleteCategoryId: categoryId }
        }).then(({ data }) => {
            toast[data?.deleteCategory?.status ? "success" : "error"](data?.deleteCategory?.message);
            refetch();
        }).catch((error) => {
            toast.error(error?.message);
        })
    }

    return (
        <div>
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: color + "20", color: color }}
                            >
                                {renderIcon(category.icon, 24)}
                            </div>
                            <div>
                                <CardTitle className="text-lg">{category.name}</CardTitle>
                                {(type === "EXPENSE" && expenseLimit > 0) && (
                                    <div className="flex items-center space-x-2 mt-1">
                                        <Badge variant={isOverLimit ? "destructive" : "secondary"} className="text-xs">
                                            ${spent} / ${expenseLimit}
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
                                <Icons.Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <Icons.Trash2 className="h-4 w-4 text-destructive" />
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
                {(type === "EXPENSE" && expenseLimit > 0) && (
                    <CardContent className="pt-0">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Spending Progress</span>
                                <span>{limitPercentage.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${isOverLimit ? "bg-destructive" : "bg-primary"}`}
                                    style={{ width: `${Math.min(limitPercentage, 100)}%` }}
                                />
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    )
}

export default CategoryCard;