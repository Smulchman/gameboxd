import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
// router for changing pages and connecting to server
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// our 4 pages (including homepage)
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
// navbar and footer will be displayed on all pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  uri: 'http://127.0.0.1:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/SearchResults" element={<SearchResults />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
