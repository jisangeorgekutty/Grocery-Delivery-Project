import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useOrderStore = create((set, get) => ({
    userOrders: [],
    allOrders: [],

    userPlaceOrderCod: async ({ userId, items, address }) => {
        try {
            const res = await axiosInstance.post('/order/cod', { userId, items, address })
            if (res.data.success) {
                toast.success(res.data.message);
                return { success: true, message: res.data.message };
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },

    userPlaceOrderStripe: async ({ userId, items, address }) => {
        try {
            const res = await axiosInstance.post('/order/stripe', { userId, items, address })
            if (res.data.success) {
                toast.success(res.data.message);
                console.log("Resposnse  url"+res.data.url)
                return { success: true, message: res.data.message, url: res.data.url };
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },

    getUserOrders: async ({ userId }) => {
        try {
            const res = await axiosInstance.get('/order/user', {
                params: { userId }
            });
            if (res.data.success) {
                set({ userOrders: res.data.orders });
                toast.success("User Orders Fetched")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },

    getAllUersOrder: async () => {
        try {
            const res = await axiosInstance.get('/order/seller');
            if (res.data.success) {
                set({ allOrders: res.data.orders });
                toast.success("All Orders Fetched");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
}))