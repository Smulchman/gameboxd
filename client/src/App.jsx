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
// import SearchResults from './pages/SearchResults';
// import Profile from './pages/Profile'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
// 
  const[currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    if (currentPage === 'Signup') {
      return <Signup />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
    if (currentPage === 'SearchResults') {
      return <Projects />;
    }
    return <Home />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
      {/* <Home /> */}
      {/* <QuiltedImageList />      */}
      {/* <Signin /> */}
      <Footer />
    </ApolloProvider>
  );
}

export default App;
