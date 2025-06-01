import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { data } from "react-router-dom";


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSeller: null,
    setUserLogin: false,
    isSigningUp: false,
    isLoggingIn: false,
    isSellerLoggingIn: false,

    isCheckingAuth: true,
    isCheckingAuthSeller: true,

    loginUser: async (value) => {
        set({ setUserLogin: value });
    },
    sellerAuth: async () => {
        try {
            const res = await axiosInstance.get("/seller/seller-auth");
            if (res.data.success) {
                set({ isSeller: true });
            } else {
                set({ isSeller: false });
            }
        } catch (error) {
            console.error("Error in sellerAuth:", error.message);
            set({ isSeller: false });
        } finally {
            set({ isCheckingAuthSeller: false });
        }
    },
    sellerLogin: async (data) => {
        set({ isSellerLoggingIn: true });
        try {
            const res = await axiosInstance.post("/seller/login", data);
            console.log(res.data.success)
            set({ isSeller:res.data.success });
            toast.success("Seller Logged In Successfully");
            get().sellerAuth();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSellerLoggingIn: false });
        }
    },
    sellerLogout: async () => {
        try {
            await axiosInstance.get("/seller/logout");
            set({ isSeller: false });
            toast.success("Seller Logged Out Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },


}))