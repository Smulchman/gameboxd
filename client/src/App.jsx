import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuiltedImageList from './components/gamebox';
import Signin from './pages/Signup'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      {/* <Home /> */}
      {/* <QuiltedImageList />      */}
      <Signin />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
