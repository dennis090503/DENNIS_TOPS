import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { userInfo, logout } = useContext(UserContext);
    const { cartItems } = useContext(CartContext);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <span className="font-bold text-2xl tracking-tighter">
                            <span className="text-summer-main">Summer</span>
                            <span className="text-gray-800">&</span>
                            <span className="text-winter-main">Winter</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-700 hover:text-summer-main transition">Home</Link>
                        <Link to="/shop?category=Summer" className="text-gray-700 hover:text-summer-main transition">Summer Wear</Link>
                        <Link to="/shop?category=Winter" className="text-gray-700 hover:text-winter-main transition">Winter Wear</Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/cart" className="relative text-gray-700 hover:text-gray-900 transition">
                            <FaShoppingCart className="h-6 w-6" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                            )}
                        </Link>

                        {userInfo ? (
                            <div className="relative group">
                                <button className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none">
                                    <span className="mr-2 font-medium">{userInfo.name}</span>
                                    <FaUser className="h-5 w-5" />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-gray-100">
                                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="text-gray-700 hover:text-gray-900 transition">
                                <FaUser className="h-6 w-6" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <Link to="/cart" className="relative text-gray-700 hover:text-gray-900 transition mr-4">
                            <FaShoppingCart className="h-6 w-6" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                            )}
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-gray-900 focus:outline-none">
                            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/shop?category=Summer" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-summer-main hover:bg-gray-50" onClick={() => setIsOpen(false)}>Summer Wear</Link>
                        <Link to="/shop?category=Winter" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-winter-main hover:bg-gray-50" onClick={() => setIsOpen(false)}>Winter Wear</Link>

                        {userInfo ? (
                            <>
                                <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-50">Hello, {userInfo.name}</div>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50">Logout</button>
                            </>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
