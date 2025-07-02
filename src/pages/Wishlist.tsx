import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { Heart } from 'lucide-react';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Heart className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-6">Browse products and add your favorites to your wishlist.</p>
        <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow p-6 flex flex-col">
              <img src={item.images[0]?.url} alt={item.images[0]?.alt || item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.category}</p>
              <p className="text-lg font-bold mb-4">${item.price.toFixed(2)}</p>
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="mt-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
