import toast from 'react-hot-toast';
import { create } from 'zustand';
import { dummyProducts } from '../assets/assets';


export const useProductStore = create((set, get) => ({
    searchQueryData:"",
    products:[],
    
    getProducts:()=>{
        set({products:dummyProducts});
    },
    setSearchQueryData:(value)=>{
        set({searchQueryData:value});
    }

    
}));
