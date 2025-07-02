import React, { useContext, useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  images: { url: string; alt?: string }[];
}
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const AdminEditorPanel: React.FC = () => {
  const { state } = useContext(AuthContext)!;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
const [form, setForm] = useState({ name: '', price: '', stock: '', image: '', description: '' });
const [search, setSearch] = useState('');
const navigate = useNavigate();

// Fetch products with optional search
const fetchProducts = async (searchTerm = '') => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.get('/products', {
      params: searchTerm ? { search: searchTerm, limit: 1000 } : { limit: 1000 }
    });
    setProducts(res.data.data.products);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } else {
      setError('Failed to fetch products');
    }
  } finally {
    setLoading(false);
  }
};

// On mount and user change
useEffect(() => {
  if (!state.user || (state.user.role !== 'admin' && state.user.role !== 'editor')) {
    navigate('/login');
    return;
  }
  fetchProducts();
  // eslint-disable-next-line
}, [state.user]);

// Search bar handler
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearch(e.target.value);
  fetchProducts(e.target.value);
};

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Delete failed');
      } else {
        alert('Delete failed');
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      price: String(product.price),
      stock: String(product.stock),
      image: product.images && product.images[0] ? product.images[0].url : '',
      description: product.description || '',
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editProduct) {
        // Update
        const res = await axios.put(`/products/${editProduct._id}`, {
          name: form.name,
          price: Number(form.price),
          stock: Number(form.stock),
          description: form.description,
          images: [{ url: form.image, alt: form.name }],
        });
        setProducts(products.map((p) => (p._id === editProduct._id ? res.data.data : p)));
        setEditProduct(null);
      } else {
        // Create
        const res = await axios.post('/products', {
          name: form.name,
          price: Number(form.price),
          stock: Number(form.stock),
          category: 'Other',
          description: form.description,
          images: [{ url: form.image, alt: form.name }],
        });
        setProducts([res.data.data, ...products]);
      }
      setForm({ name: '', price: '', stock: '', image: '', description: '' });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Operation failed');
      } else {
        alert('Operation failed');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 rounded-2xl shadow-xl animate-fade-in-up">
      <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 animate-gradient-x animate-float">
        Product Management
      </h2>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search products by name..."
          className="border px-4 py-2 rounded w-full md:w-1/2"
        />
      </div>
      <form onSubmit={handleFormSubmit} className="mb-8 animate-fade-in-down">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Product Name"
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleFormChange}
            placeholder="Price"
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleFormChange}
            placeholder="Stock"
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleFormChange}
            placeholder="Image URL"
            className="border px-4 py-2 rounded col-span-2 md:col-span-1"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            placeholder="Description"
            className="border px-4 py-2 rounded col-span-2 md:col-span-3"
            rows={2}
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
            {editProduct ? 'Update' : 'Add'}
          </button>
          {editProduct && (
            <button type="button" onClick={() => setEditProduct(null)} className="ml-2 px-4 py-1 rounded bg-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="min-w-full bg-white border rounded-xl shadow-lg animate-scale-in">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product._id} className={idx % 2 === 0 ? 'animate-fade-in-up' : 'animate-fade-in-down'} style={{ animationDelay: `${idx * 60}ms` }}>
                <td className="border px-4 py-2">
                  {product.images && product.images[0]?.url ? (
                    <img src={product.images[0].url} alt={product.images[0].alt || product.name} className="h-12 w-12 object-cover rounded" />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-1.5 rounded mr-2 min-w-[70px] transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  {state.user?.role === 'admin' && (
                    <button
                      className="bg-red-500 text-white px-4 py-1.5 rounded min-w-[70px] transition-all duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminEditorPanel;
