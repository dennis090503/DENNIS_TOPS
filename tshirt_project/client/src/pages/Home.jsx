import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Placeholder for Hero Image - implementing a gradient for now */}
                    <div className="w-full h-full bg-gradient-to-br from-summer-dark to-winter-dark opacity-80"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
                    >
                        Style for Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-summer-main to-winter-main">Season</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-200 mb-10"
                    >
                        Discover our premium collection of breathable summer tees and cozy winter wear.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <Link to="/shop?category=Summer" className="px-8 py-3 bg-summer-main text-white font-bold rounded-full hover:bg-summer-dark transition shadow-lg transform hover:-translate-y-1">
                            Shop Summer
                        </Link>
                        <Link to="/shop?category=Winter" className="px-8 py-3 bg-winter-main text-white font-bold rounded-full hover:bg-winter-dark transition shadow-lg transform hover:-translate-y-1">
                            Shop Winter
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Categories Preview */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Collections</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Summer Card */}
                        <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xl">
                            <div className="absolute inset-0 bg-summer-light transition duration-300 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <h3 className="text-4xl font-bold text-white mb-2">Summer Vibes</h3>
                                <p className="text-white mb-4">Cotton, breathable, and vibrant.</p>
                                <Link to="/shop?category=Summer" className="text-white underline font-semibold hover:text-summer-main">View Collection &rarr;</Link>
                            </div>
                        </div>

                        {/* Winter Card */}
                        <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xl">
                            <div className="absolute inset-0 bg-winter-light transition duration-300 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <h3 className="text-4xl font-bold text-white mb-2">Winter Cozy</h3>
                                <p className="text-white mb-4">Warm, thermal, and stylish.</p>
                                <Link to="/shop?category=Winter" className="text-white underline font-semibold hover:text-winter-main">View Collection &rarr;</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
