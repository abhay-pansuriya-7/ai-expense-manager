export function composeMiddleware(...middlewares: Function[]) {
    return (resolver: Function) =>
        middlewares.reduceRight((acc, middleware) => middleware(acc), resolver);
}

export function isAuthenticated<TArgs = any, TResult = any>(
    next: (parent: any, args: TArgs, context: any, info: any) => Promise<TResult>
) {
    return async (parent: any, args: TArgs, context: any, info: any): Promise<TResult> => {
        if (!context?.session?.user) {
            throw new Error("Not authenticated");
        }
        return next(parent, args, context, info);
    };
}

export function isAdmin<TArgs = any, TResult = any>(
    next: (parent: any, args: TArgs, context: any, info: any) => Promise<TResult>
) {
    return async (parent: any, args: TArgs, context: any, info: any): Promise<TResult> => {
        const user = context?.session?.user;

        if (!user) {
            throw new Error("You must be signed in.");
        }

        if (!user.isAdmin) {
            throw new Error("You must be an admin to access this resource.");
        }

        return next(parent, args, context, info);
    };
}
