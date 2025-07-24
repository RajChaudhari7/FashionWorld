import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl, currency } from '../App';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ token }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: Array(12).fill(0), // Initialize with zeros for 12 months
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch total products
    const fetchTotalProducts = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/products/count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTotalProducts(data.count);
      } catch (error) {
        console.error('Error fetching total products:', error);
      }
    };

    // Fetch total sales
    const fetchTotalSales = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/orders/total-sales`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTotalSales(data.totalSales);
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    };

    // Fetch total users
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/users/count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTotalUsers(data.count);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    // Fetch orders data
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
        if (response.data.success) {
          const ordersData = response.data.orders;
          setOrders(ordersData);
          setTotalOrders(ordersData.length);

          // Calculate total sales from orders
          const totalSalesFromOrders = ordersData.reduce((total, order) => total + order.amount, 0);
          setTotalSales(totalSalesFromOrders);

          // Update graph data
          const salesDataForGraph = Array(12).fill(0); // Initialize with zeros for 12 months
          ordersData.forEach(order => {
            const monthIndex = new Date(order.date).getMonth();
            if (monthIndex >= 0 && monthIndex < 12) {
              salesDataForGraph[monthIndex] += order.amount;
            }
          });
          setSalesData(prevData => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: salesDataForGraph,
              },
            ],
          }));
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchTotalProducts();
    fetchTotalUsers();
    fetchOrders();
  }, [token]);

  return (
    <div className='p-5 bg-gray-100 min-h-screen mr-10 bg-orange-100'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>Dashboard</h1>

      {/* Cards Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div
          className='bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 cursor-pointer'
          onClick={() => navigate('/list')}
        >
          <h2 className='text-lg font-semibold text-gray-700'>Total Products</h2>
          <p className='text-3xl text-blue-500'>{totalProducts}</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500'>
          <h2 className='text-lg font-semibold text-gray-700'>Total Sales</h2>
          <p className='text-3xl text-green-500'>{currency} {totalSales}</p>
        </div>
        <div
          className='bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 cursor-pointer'
          onClick={() => navigate('/users')}
        >
          <h2 className='text-lg font-semibold text-gray-700'>Total Users</h2>
          <p className='text-3xl text-purple-500'>{totalUsers}</p>
        </div>
        <div
          className='bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 cursor-pointer'
          onClick={() => navigate('/orders')}
        >
          <h2 className='text-lg font-semibold text-gray-700'>Total Number of Orders</h2>
          <p className='text-3xl text-orange-500'>{totalOrders}</p>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-8 h-96'>
        <h2 className='text-lg font-semibold mb-4 text-gray-700'>Sales Over Time</h2>
        <Bar data={salesData} />
      </div>
    </div>
  );
};

export default Dashboard;
