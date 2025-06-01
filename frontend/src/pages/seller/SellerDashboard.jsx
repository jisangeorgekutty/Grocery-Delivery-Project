import React from 'react'
import { assets } from '../../assets/assets';
import { useAuthStore } from '../../store/useAuthStore';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductStore } from '../../store/useProductStore';

function SellerDashboard() {
    const navigate=useNavigate();
    const { isSeller,sellerLogout,sellerAuth } = useAuthStore();
    const { products } = useProductStore();

    // useEffect(() => {
    //     getProducts();
    // }, [products])

    useEffect(() => {
        sellerAuth();
    },[])

    const handleLogOut=()=>{
        if(isSeller){
        sellerLogout();
        navigate('/');
        }
    }


    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];


    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to="/">
                    <img src="" alt="Logo" className='cursor-pointer w-34 md:w-38' />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={handleLogOut} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className='flex '>
                <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                    {sidebarLinks.map((item) => (
                        <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
                            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100/90 border-white "
                                }`
                            }
                        >
                            <img src={item.icon} className='w-7 h-7' alt="" />
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>

                <Outlet />
            </div>
        </>
    );
}

export default SellerDashboard