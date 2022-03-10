import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {BrowserRouter} from 'react-router-dom';
import {setContext} from '@apollo/client/link/context';
import {AUTH_TOKEN} from './constants';
import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/api'
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:8080/subscriptions`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN)
        }
    }
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : ''
        }
    };
});

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return (
            kind === 'OperationDefinition' &&
            operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
