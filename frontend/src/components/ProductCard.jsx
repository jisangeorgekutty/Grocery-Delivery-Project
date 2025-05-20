import React, { useEffect, useState } from 'react'
import { assets, dummyProducts } from '../assets/assets';
import { useCartStore } from '../store/useCartStore';

function ProductCard() {
    const [products, setProducts] = useState([]);
    const {cartItems,addToCart,removeFromCart,updateCartItem}=useCartStore();
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return products && (
        <div>
            {products.map((product, index) => (
                <div key={index} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
                    <div className="group cursor-pointer flex items-center justify-center px-2">
                        <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0] || null} alt={product.name} />
                    </div>
                    <div className="text-gray-500/60 text-sm">
                        <p>{product.category}</p>
                        <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                        <div className="flex items-center gap-0.5">
                            {Array(5).fill('').map((_, i) => (
                                    <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} className='md:w-3.5 w-3' alt="rating icon" />
                            ))}
                            <p>4</p>
                        </div>
                        <div className="flex items-end justify-between mt-3">
                            <p className="md:text-xl text-base font-medium text-primary">
                                ${product.offerPrice}
                                <span className="text-gray-500/60 md:text-sm text-xs line-through">${product.price}</span>
                            </p>
                            <div onClick={(e)=>{e.stopPropagation();}} className="text-primary">
                                { !cartItems[product._id] ? (
                                    <button onClick={()=>addToCart(product)} className="flex items-center cursor-pointer justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded">
                                        <img src={assets.cart_icon} alt="cart icon" />
                                        Add
                                    </button>
                                ) : (
                                    <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                        <button onClick={() =>removeFromCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                            -
                                        </button>
                                        <span className="w-5 text-center">{cartItems[product._id]?.quantity}</span>
                                        <button onClick={() => addToCart(product)} className="cursor-pointer text-md px-2 h-full" >
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductCard;