import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import GameList from './components/getgame';
import BasicImageList from './components/home';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <BasicImageList />
      <GameList />
    </ApolloProvider>
  );
}

export default App;
