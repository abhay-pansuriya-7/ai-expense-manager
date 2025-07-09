// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from '@/graphql';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const server = new ApolloServer({
    schema,
    // (optional) enable introspection if needed in prod
    // introspection: process.env.NODE_ENV !== 'production',
});

const handler = startServerAndCreateNextHandler(server, {
    context: async (req, res) => {
        // For App Router, we need to pass authOptions directly to getServerSession
        // without the req and res parameters
        const session = await getServerSession(authOptions);

        return {
            session, // 👈 this is now accessible in resolvers under `context.session`
            req,     // 👈 if you need access to the request object in resolvers
        };
    },
});

export { handler as GET, handler as POST };