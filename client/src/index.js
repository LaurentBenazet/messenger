import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {BrowserRouter} from 'react-router-dom';
import {setContext} from '@apollo/client/link/context';
import {AUTH_TOKEN} from './constants';

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/api'
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

const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
