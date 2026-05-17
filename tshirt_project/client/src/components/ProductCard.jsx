import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <Link to={`/product/${product._id}`}>
                <div className="h-64 overflow-hidden relative group">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
                    />
                    {product.countInStock === 0 && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                            Out of Stock
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-bold text-gray-800 hover:text-summer-main transition truncate">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

                <div className="flex justify-between items-center mt-3">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <Link
                        to={`/product/${product._id}`}
                        className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
