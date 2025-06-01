import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

function SellerLogin() {
    const { isSeller, sellerLogin } = useAuthStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const onSubmitHandler = (e) => {
        e.preventDefault();
        sellerLogin(formData);
    }

    useEffect(() => {
        console.log("isSeller changed:", isSeller); // Debug
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);


    return !isSeller && (
        
        <form action="" onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span>Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" value={formData.email} placeholder='Email' className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" value={formData.password} placeholder='Password' className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' required />
                </div>
                <button type='submit' className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
            </div>
        </form>
    )
}

export default SellerLogin