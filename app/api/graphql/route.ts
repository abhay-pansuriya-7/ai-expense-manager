// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from '@/graphql';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// 🚀 Create Apollo Server instance once (singleton pattern)
const server = new ApolloServer({
    schema,
    // Production optimizations
    introspection: process.env.NODE_ENV !== 'production',
    includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
    // Cache control for better performance
    plugins: [
        // Add caching plugin if needed
        // require('apollo-server-plugin-response-cache')(),
    ],
    // Format errors for production
    formatError: (err) => {
        // Log errors in production for monitoring
        if (process.env.NODE_ENV === 'production') {
            console.error('GraphQL Error:', err);
        }
        
        // Don't expose internal errors in production
        if (process.env.NODE_ENV === 'production' && err.message.includes('Internal')) {
            return new Error('Internal server error');
        }
        
        return err;
    },
});

// 🚀 Create handler once (not per request)
const handler = startServerAndCreateNextHandler(server, {
    context: async (req: NextRequest) => {
        // Only get session when needed (lazy evaluation)
        const getSession = async () => {
            return await getServerSession(authOptions);
        };

        return {
            // Lazy session loading for better performance
            getSession,
            // Direct session access (cached)
            session: await getServerSession(authOptions),
            req,
            // Add any other context you need
            headers: req.headers,
        };
    },
});

// 🚀 Export properly typed handlers
export async function GET(request: NextRequest): Promise<Response> {
    try {
        return await handler(request);
    } catch (error) {
        console.error('GraphQL GET Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<Response> {
    try {
        return await handler(request);
    } catch (error) {
        console.error('GraphQL POST Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

// 🚀 Add OPTIONS for CORS (if needed)
export async function OPTIONS(request: NextRequest): Promise<Response> {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}