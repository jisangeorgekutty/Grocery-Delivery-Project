import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { useCartStore } from "./useCartStore.js";




export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSeller: null,
    setUserLoginWindow: false,
    isSigningUp: false,
    isLoggingIn: false,
    isSellerLoggingIn: false,

    isCheckingAuth: true,
    isCheckingAuthSeller: true,

    loginUserWindow: async (value) => {
        set({ setUserLoginWindow: value });
    },
    sellerAuth: async () => {
        try {
            const res = await axiosInstance.get("/seller/seller-auth");
            if (res.data.success) {
                set({ isSeller: true });
            } else {
                set({ isSeller: null });
            }
        } catch (error) {
            console.error("Error in sellerAuth:", error.message);
            set({ isSeller: null });
        } finally {
            set({ isCheckingAuthSeller: false });
        }
    },
    sellerLogin: async (data) => {
        set({ isSellerLoggingIn: true });
        try {
            const res = await axiosInstance.post("/seller/login", data);
            console.log(res.data.success)
            set({ isSeller: res.data.success });
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
            set({ isSeller: null });
            toast.success("Seller Logged Out Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/checkauth");
            if (res.data.success) {
                set({ authUser: res.data.user });
                const { setCartItems } = useCartStore.getState();
                setCartItems(res.data.user.cartItems)
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            set({ authUser: null });
            console.error("Error in userAuth:", error.message);
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    userLogin: async (email, password) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', { email, password });
            set({ authUser: res.data })
            set({ setUserLoginWindow: false });
            toast.success("Logged in successfully");
            get().checkAuth();
        } catch (error) {
            toast.error(error.response.data.message);
            set({ setUserLoginWindow: true });
        } finally {
            set({ isLoggingIn: false });
        }
    },
    userSignup: async (name, email, password) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', { name, email, password });
            set({ authUser: res.data });
            set({ setUserLoginWindow: false });
            toast.success("Account created successfully");
            get().checkAuth();
        } catch (error) {
            toast.error(error.response.data.message);
            set({ setUserLoginWindow: true });
        } finally {
            set({ isSigningUp: false });
        }

    },
    userLogOut: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Seller Logged Out Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


}))