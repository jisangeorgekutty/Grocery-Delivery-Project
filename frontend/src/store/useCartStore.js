import toast from 'react-hot-toast';
import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';
import { axiosInstance } from '../lib/axios';

export const useCartStore = create((set, get) => ({
    cartItems: {},
    totalCount: 0,
    totalAmount: 0,


    setCartItems: (items) => {
        set({ cartItems: items || {} });
        get().getCartCount();
    },

    addToCart: async (product) => {
        const cartData = get().cartItems;
        const existingItem = cartData[product._id];

        const updatedCart = {
            ...cartData,
            [product._id]: existingItem
                ? { ...existingItem, quantity: existingItem.quantity + 1 }
                : { ...product, quantity: 1 },
        };

        set({ cartItems: updatedCart });
        console.log("UPDATED CART ", updatedCart);

        if (!existingItem) {
            toast.success(`Added to cart`);
        }


        const { authUser } = useAuthStore.getState();
        console.log("user", authUser);
        if (authUser?._id) {
            await get().syncCartToDB(authUser._id, updatedCart);
        }
    },

    removeFromCart: async (productId) => {
        const cartData = { ...get().cartItems };

        if (cartData[productId]) {
            const updatedQuantity = cartData[productId].quantity - 1;

            if (updatedQuantity > 0) {
                cartData[productId].quantity = updatedQuantity;
            } else {
                delete cartData[productId];
                toast.success("Product Removed from cart");
            }
            set({ cartItems: cartData });

            const { authUser } = useAuthStore.getState();
            if (authUser?._id) {
                await get().syncCartToDB(authUser._id, cartData);
            }
        }
    }
    ,

    updateCartItem: async (productId, quantity) => {
        const cartData = get().cartItems;
        const existingItem = cartData[productId];

        if (existingItem) {
            const updatedCart = {
                ...cartData,
                [productId]: { ...existingItem, quantity },
            };
            set({ cartItems: updatedCart });
            toast.success("Cart Updated");

            const { authUser } = useAuthStore.getState();
            if (authUser?._id) {
                await get().syncCartToDB(authUser._id, updatedCart);
            }
        }
    },

    getCartCount: () => {
        const cartItems = get().cartItems;
        let count = 0;

        for (const item in cartItems) {
            count += cartItems[item].quantity;
        }
        set({ totalCount: count });
    },

    getCartAmount: (products) => {
        const cartItems = get().cartItems;
        let amount = 0;
        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);
            if (cartItems[itemId].quantity > 0 && itemInfo) {
                amount += itemInfo.offerPrice * cartItems[itemId].quantity;
            }
        }
        console.log("Final amount calculated:", amount);
        set({ totalAmount: Math.floor(amount * 100) / 100 });
    },

    syncCartToDB: async (userId, cartItems) => {
        try {
            console.log("user" + userId + "cartitms" + cartItems);
            await axiosInstance.post("/cart/update", { userId, cartItems });
        } catch (error) {
            console.error("Cart sync failed:", error.message);
        }
    }
}));
