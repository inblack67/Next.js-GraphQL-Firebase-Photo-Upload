import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

let apolloClient;

function createIsomorphLink() {
    if (typeof window === 'undefined') {
        const { SchemaLink } = require('@apollo/client/link/schema')
        const { typeDefs } = require('./graphql/typeDefs')
        const { resolvers } = require('./graphql/resolvers')
        return new SchemaLink({ typeDefs, resolvers })
    } else {
        const { createUploadLink } = require('apollo-upload-client');
        return createUploadLink({
            uri: '/api/graphql',
            credentials: 'same-origin',
        })
    }
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    }

    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: errorLink.concat(createIsomorphLink()),
        cache: new InMemoryCache(),
    })
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState)
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    return store
}
