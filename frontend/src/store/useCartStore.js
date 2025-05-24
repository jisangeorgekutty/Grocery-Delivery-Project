import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    cartItems: {},
    totalCount: 0,
    totalAmount: 0,


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
            const updatedQuantity = cartData[productId].quantity - 1;

            if (updatedQuantity > 0) {
                cartData[productId].quantity = updatedQuantity;
                set({ cartItems: cartData });
            } else {
                delete cartData[productId];
                set({ cartItems: cartData });
                toast.success("Product Removed from cart");
            }
        }
    }
    ,

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
    }


}));
