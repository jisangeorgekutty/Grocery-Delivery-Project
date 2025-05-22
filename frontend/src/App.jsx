import React from 'react';
import NavBar from './components/NavBar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';


function App() {
  const isSellerPath=useLocation().pathname.includes('seller');
  return (
    <div>
      {isSellerPath ? null : <NavBar />}

      <Toaster/>
      
      <div className={`${isSellerPath ? '': 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App