import React from 'react';
import { Route } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from './components/Layout';
import Home from './components/Home';
import Weather from './components/Weather';
import Counter from './components/Counter';
import Todos from './components/Todos';

import './custom.css'

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnReconnect: false
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/weather' component={Weather} />
                <Route path='/todos' component={Todos} />
            </Layout>
        </QueryClientProvider>
    );
}

export default App;
