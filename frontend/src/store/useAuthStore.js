import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";


export const useAuthStore=create((set,get)=>({
    authUser: true,
    isSeller: true,
    setUserLogin:false,
    isSigningUp: false,
    isLoggingIn: false,

    isCheckingAuth: true,

    loginUser:async(value)=>{
        set({setUserLogin:value});
    }
}))