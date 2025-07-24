import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// Create HTTP link to your GraphQL endpoint
const httpLink = createHttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin', // Include cookies for authentication
});

// Auth link to add authentication headers if needed
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            // Add any additional headers here if needed
        }
    };
});

// Error link for handling GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(
                `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        });
    }

    if (networkError) {
        console.error(`Network error: ${networkError}`);

        // Handle specific network errors
        if ('statusCode' in networkError && networkError.statusCode === 401) {
            // Handle unauthorized errors - could redirect to login
            console.warn('Unauthorized access - consider redirecting to login');
        }
    }
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            // Add type policies for better caching if needed
            Query: {
                fields: {
                    // Example: Configure field policies for pagination
                    // expenses: {
                    //   keyArgs: false,
                    //   merge(existing = [], incoming) {
                    //     return [...existing, ...incoming];
                    //   },
                    // },
                },
            },
        },
    }),
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all',
        },
        query: {
            errorPolicy: 'all',
        },
    },
    // Enable dev tools in development
    connectToDevTools: process.env.NODE_ENV === 'development',
});