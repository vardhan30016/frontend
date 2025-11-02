import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({ name: "", price: "", image: "" });
  const [cart, setCart] = useState([]);

  // Load products & cart from localStorage on mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(storedProducts);
    setCart(storedCart);
  }, []);

  // Update localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handle form inputs
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Add a new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const { name, price, image } = productData;

    if (!name.trim() || !price || !image.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: parseFloat(price),
      image: image.trim(),
    };

    setProducts([...products, newProduct]);
    setProductData({ name: "", price: "", image: "" });
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Add to cart
  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-pink-500 p-4 text-white shadow">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="hover:underline">
            Dashboard
          </button>
          <button onClick={() => navigate("/logout")} className="hover:underline">
            Logout
          </button>
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Add Product Form */}
      <form
        onSubmit={handleAddProduct}
        className="p-6 flex flex-col md:flex-row gap-4 justify-center items-center bg-white shadow-md rounded-lg mx-6 mt-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={productData.image}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">
            No products available. Add some above.
          </p>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-lg rounded-lg p-4 text-center hover:shadow-xl transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded mb-3"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              />
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-gray-700 mb-2">₹{p.price.toFixed(2)}</p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
