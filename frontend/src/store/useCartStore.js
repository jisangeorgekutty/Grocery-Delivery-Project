import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    cartItems: {},

    addToCart: (product) => {
        const cartData = get().cartItems;
        const existingItem = cartData[product._id];

        const updatedCart = {
            ...cartData,
            [product._id]: existingItem
                ? { ...existingItem, quantity: existingItem.quantity + 1 }
                : { ...product, quantity: 1 },
        };

        set({ cartItems: updatedCart });

        if (!existingItem) {
            toast.success(`Added to cart`);
        }
    },

    removeFromCart: (productId) => {
        const cartData = { ...get().cartItems };

        if (cartData[productId]) {
            delete cartData[productId];
            set({ cartItems: cartData });
            toast.success(`Product Removed from cart`);
        }
    },

    updateCartItem: (productId, quantity) => {
        const cartData = get().cartItems;
        const existingItem = cartData[productId];

        if (existingItem) {
            const updatedCart = {
                ...cartData,
                [productId]: { ...existingItem, quantity },
            };
            set({ cartItems: updatedCart });
            toast.success("Cart Updated");
        }
    },
}));
