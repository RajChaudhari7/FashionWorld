// routes/dashboardRoute.js
import express from 'express';
import Product from '../models/productModel.js'; // Import your Product model
import Order from '../models/orderModel.js'; // Import your Order model
import User from '../models/userModel.js'; 

const router = express.Router();

// GET total number of products
router.get('/products/count', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product count', error });
  }
});

// GET total sales
router.get('/orders/total-orders', async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    res.status(200).json({ totalSales });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total sales', error });
  }
});

// Endpoint to count total users
router.get('/users/count', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ count: totalUsers });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;