import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAddressStore = create((set, get) => ({
    addressList: [],

    addAddress: async ({ address, userId }) => {
        try {
            const res = await axiosInstance.post('/address/add', { address, userId });
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Add address error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },

    getUserAddress: async ({userId}) => {
        try {
            const res = await axiosInstance.get('/address/get',{
            params: { userId }
        });
            set({ addressList: res.data.address });
            console.log("Address",res.data.address)
        } catch (error) {
            console.error("Add address error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

}))