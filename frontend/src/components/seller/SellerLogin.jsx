import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

function SellerLogin() {
    const { isSeller } = useAuthStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        isSeller(true)
    }


    return !isSeller && (
        <form action="" onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span>Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" value={email} placeholder='Email' className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" value={password} placeholder='Password' className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' required />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
            </div>
        </form>
    )
}

export default SellerLogin