import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
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

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        {/* want nav on all pages */}
        <Navbar />
        <Routes>
          <Route
          path='/'
          element={<Home />}
          />
          <Route
          path='/Profile'
          element={<Profile />}
          />
          <Route
          path='/SearchResults'
          element={<SearchResults />}
          />
          <Route
          path='/Signup'
          element={<Signup />}
          />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
