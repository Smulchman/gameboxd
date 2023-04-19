import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <Navbar className="nav" />
      <Home />
    </>
  );
}

export default App;
