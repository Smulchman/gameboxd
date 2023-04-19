import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import GameList from './components/getgame';
import BasicImageList from './components/home';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Home />
      <BasicImageList />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
