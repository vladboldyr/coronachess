import {ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client/core'
import {DefaultApolloClient, provideApolloClient} from '@vue/apollo-composable'
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
  ({ app }) => {
    const httpLink = new HttpLink({
      // You should use an absolute URL here
      uri: 'https://ccq.l.cidious.com/graphql'
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
    /* const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation }: Definintion = getMainDefinition(query)
        return kind === 'OperationDefinition' &&
          operation === 'subscription'
      },
      // wsLink,
      httpLink
    ) */

    // Create the apollo client
    const apolloClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: true
    })
    // Create a provider
    const apolloProvider = createApolloProvider({
      defaultClient: apolloClient
    })

    app.use(apolloProvider)
    provideApolloClient(apolloClient);
    // app.provide(DefaultApolloClient, apolloClient);
  }
)
