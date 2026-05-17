import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import CartContext from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                if (data.sizes && data.sizes.length > 0) {
                    setSize(data.sizes[0]);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        addToCart(product, qty, size);
        // Optional: Navigate to cart or show success toast
        alert(`Added to cart!`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-summer-main"></div>
            </div>
        );
    }

    if (!product.name) {
        return <div className="text-center py-20 text-xl">Product not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition">
                <FaArrowLeft className="mr-2" /> Back
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {/* Product Image */}
                <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=No+Image'; }}
                    />
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <p className="text-xl text-gray-500 mb-6">{product.brand}</p>

                    <div className="flex items-end mb-6">
                        <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Sizes</h3>
                        <div className="flex space-x-3">
                            {product.sizes && product.sizes.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center border font-bold transition ${size === s
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-8">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                onClick={() => setQty(Math.max(1, qty - 1))}
                            >-</button>
                            <div className="px-4 py-2 font-bold text-gray-900">{qty}</div>
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                            >+</button>
                        </div>
                        <span className="text-sm text-gray-500">
                            {product.countInStock > 0 ? `${product.countInStock} items in stock` : 'Out of Stock'}
                        </span>
                    </div>

                    <button
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        className={`w-full md:w-auto px-8 py-4 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition ${product.countInStock > 0
                            ? 'bg-gradient-to-r from-summer-main to-winter-main text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <FaShoppingCart className="mr-3" />
                        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
