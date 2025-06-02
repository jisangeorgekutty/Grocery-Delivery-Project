import React from 'react';
import NavBar from './components/NavBar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Login from './components/Login';
import { useAuthStore } from './store/useAuthStore.js';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerDashboard from './pages/seller/SellerDashboard';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import { useEffect } from 'react';
import { useProductStore } from './store/useProductStore.js';


function App() {
  const isSellerPath = useLocation().pathname.includes('seller');
  const { setUserLoginWindow, isSeller, sellerAuth, checkAuth } = useAuthStore();
  const { getAllProducts } = useProductStore();

  useEffect(() => {
    if (isSellerPath) {
      sellerAuth();
    }
  }, [isSellerPath]);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <NavBar />}
      {setUserLoginWindow ? <Login /> : null}

      <Toaster />

      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/all-products/:category" element={<ProductCategory />} />
          <Route path="/all-products/:category/:id" element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/seller' element={isSeller ? <SellerDashboard /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App