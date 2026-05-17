import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="container mx-auto px-4 py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            <span className="text-summer-main">Summer</span> & <span className="text-winter-main">Winter</span>
                        </h3>
                        <p className="text-gray-400">
                            Your one-stop shop for trendy seasonal t-shirts. Quality cotton for summer, cozy thermals for winter.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/" className="hover:text-white transition">Home</a></li>
                            <li><a href="/shop?category=Summer" className="hover:text-white transition">Summer Collection</a></li>
                            <li><a href="/shop?category=Winter" className="hover:text-white transition">Winter Collection</a></li>
                            <li><a href="/cart" className="hover:text-white transition">Cart</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition text-2xl"><FaFacebook /></a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition text-2xl"><FaInstagram /></a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl"><FaTwitter /></a>
                        </div>
                        <p className="mt-6 text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} Summer & Winter. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
