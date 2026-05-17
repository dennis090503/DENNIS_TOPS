import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl">
                    <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
                    <Link to="/" className="text-summer-main hover:underline font-bold">Go Back</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={`${item.product}-${item.size}`} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0" />

                                <div className="flex-grow sm:ml-6 text-center sm:text-left">
                                    <Link to={`/product/${item.product}`} className="text-lg font-bold text-gray-800 hover:text-summer-main">{item.name}</Link>
                                    <p className="text-gray-500 text-sm">Size: {item.size}</p>
                                    <p className="text-gray-900 font-bold mt-1">${item.price}</p>
                                </div>

                                <div className="flex items-center mt-4 sm:mt-0">
                                    <select
                                        className="border rounded-md p-2 mr-4"
                                        value={item.qty}
                                        onChange={(e) => addToCart({ ...item, _id: item.product }, Number(e.target.value), item.size)}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700 transition"
                                        onClick={() => removeFromCart(item.product, item.size)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md h-fit border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Items</span>
                            <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-xl font-bold text-gray-900 border-t pt-4">
                            <span>Total</span>
                            <span>
                                ${cartItems
                                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                                    .toFixed(2)}
                            </span>
                        </div>
                        <button
                            onClick={checkoutHandler}
                            className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
