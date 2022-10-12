import { ApolloClient, InMemoryCache } from '@apollo/client'

console.log(process.env.NEXT_PUBLIC_CMS_DEV);


export const client = new ApolloClient({
    uri: process.env.CMS_DEV,
    cache: new InMemoryCache()
})