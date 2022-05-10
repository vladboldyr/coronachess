import {ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { boot } from 'quasar/wrappers'
import {WebSocketLink} from '@apollo/client/link/ws'
import {getMainDefinition} from '@apollo/client/utilities'

/**
 * Костыльный интерфейс, т.к в аполо не заложили ts, исходники на js написаны :)
 */

interface Definintion {
  kind: string;
  operation?: string;
}

export default boot(
  /* async */ ({ app }) => {
    // Default client.
    // const options = /* await */ getClientOptions(/* {app, router ...} */)
    // const apolloClient = new ApolloClient(options)
    //
    // // // Additional client `clientA`
    // // const optionsA = { ...options }
    // // // Modify options as needed.
    // // optionsA.link = createHttpLink({ uri: 'http://clientA.example.com' })
    // // const clientA = new ApolloClient(optionsA)
    //
    // // // Additional client `clientB`
    // // const optionsB = { ...options }
    // // // Modify options as needed.
    // // optionsB.link = createHttpLink({ uri: 'http://clientB.example.com' })
    // // const clientB = new ApolloClient(optionsB)
    //
    // const apolloClients: Record<string, ApolloClient<unknown>> = {
    //   default: apolloClient,
    //   // clientA,
    //   // clientB,
    // }
    const httpLink = new HttpLink({
      // You should use an absolute URL here
      uri: 'https://ccq.l.cidious.com/graphql' || 'http://localhost:3020/graphql'
    })

    // Create the subscription websocket link
    // const wsLink = new WebSocketLink({
    //   uri: 'wss://ccq.l.cidious.com/graphql', // 'ws://localhost:3000/subscriptions',
    //   options: {
    //     reconnect: true
    //   }
    // })

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation }: Definintion = getMainDefinition(query)
        return kind === 'OperationDefinition' &&
          operation === 'subscription'
      },
      // wsLink,
      httpLink
    )

    // Create the apollo client
    const apolloClient = new ApolloClient({
      link,
      cache: new InMemoryCache(),
      connectToDevTools: true
    })
    // Create a provider
    const apolloProvider = createApolloProvider({
      defaultClient: apolloClient
    })

    app.use(apolloProvider)
    // app.provide(ApolloClients, apolloClients)
  }
)
