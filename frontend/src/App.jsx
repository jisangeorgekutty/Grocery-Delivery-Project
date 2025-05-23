import React from 'react';
import NavBar from './components/NavBar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Login from './components/Login';
import { useAuthStore } from './store/useAuthStore';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';


function App() {
  const isSellerPath=useLocation().pathname.includes('seller');
  const { setUserLogin } = useAuthStore();
  return (
    <div>
      {isSellerPath ? null : <NavBar />}
      {setUserLogin ? <Login/>:null}

      <Toaster/>
      
      <div className={`${isSellerPath ? '': 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts/>} />
          <Route path="/all-products/:category" element={<ProductCategory/>} />
          <Route path="/all-products/:category/:id" element={<ProductDetails/>}/>
        </Routes>
      </div>
    {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App