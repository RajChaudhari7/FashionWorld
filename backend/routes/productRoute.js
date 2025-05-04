import express from 'express';
import { listProduct, addProduct, removeProduct, singleProduct, editProduct, handleCheckout } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Route for adding a new product
productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);

// Route for removing a product
productRouter.post('/remove', adminAuth, removeProduct);

// Route for retrieving a single product
productRouter.post('/single', singleProduct);

// Route for listing all products
productRouter.get('/list', listProduct);

// Route for editing a product
productRouter.post('/edit', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), editProduct);

// Route for handling checkout and updating product quantities
productRouter.post('/checkout', adminAuth, handleCheckout);

export default productRouter;
