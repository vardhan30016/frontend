import { useState, useEffect } from "react";

const ViewAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    setAnalytics({
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: orders.length,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Analytics Dashboard
      </h2>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 border">Category</th>
              <th className="p-4 border">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="p-4 border font-medium">Total Products</td>
              <td className="p-4 border">{analytics.totalProducts}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-4 border font-medium">Total Users</td>
              <td className="p-4 border">{analytics.totalUsers}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-4 border font-medium">Total Orders</td>
              <td className="p-4 border">{analytics.totalOrders}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAnalytics;
