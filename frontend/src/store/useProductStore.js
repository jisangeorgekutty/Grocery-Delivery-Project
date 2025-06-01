import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { data } from 'react-router-dom';


export const useProductStore = create((set, get) => ({
    searchQueryData: "",
    products: [],

    isProductAdding: false,
    setSearchQueryData: (value) => {
        set({ searchQueryData: value });
    },

    addToProduct: async (productData) => {
        set({ isProductAdding: true })
        try {
            const res = await axiosInstance.post('/product/add', productData);
            if (res.data.success) {
                toast.success(res.data.message);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Add Product Error:", error.message);
            toast.error(error.response?.data?.message || "Failed to add product");
            return false;
        } finally {
            set({ isProductAdding: false })
        }
    },

    getAllProducts: async () => {
        try {
            const res = await axiosInstance.get('/product/list');
            if (res.data.success) {
                set({ products: res.data.products });
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || error.message || "Something went wrong"
            );
        }
    },

    toggleStock: async (id, inStock) => {
        try {
            const res = await axiosInstance.post('/product/stock', { id, inStock });
            if (res.data.success) {
                set(state => ({
                    products: state.products.map(product =>
                        product._id === id ? { ...product, inStock } : product
                    )
                }));
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }




}));
