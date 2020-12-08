import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'

const httpLink = new HttpLink({ uri: 'http://127.0.0.1:8000' })

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export default client