import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Function for adding a product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller, quantity } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
      quantity: Number(quantity),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for listing all products
const listProduct = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for removing a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for retrieving a single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for editing a product
const editProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      quantity,
    } = req.body;

    // Check if new images are being uploaded
    const image1 = req.files && req.files.image1 && req.files.image1[0];
    const image2 = req.files && req.files.image2 && req.files.image2[0];
    const image3 = req.files && req.files.image3 && req.files.image3[0];
    const image4 = req.files && req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
          return result.secure_url;
        })
      );
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      quantity: Number(quantity),
      ...(imagesUrl.length > 0 && { image: imagesUrl }), // Only update images if new ones are provided
    };

    const product = await productModel.findByIdAndUpdate(id, productData, { new: true });
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product Updated", product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for handling checkout and updating product quantities
const handleCheckout = async (req, res) => {
    try {
      const { cartItems } = req.body;
      console.log('Cart Items:', cartItems); // Log cart items
  
      // Iterate over each item in the cart
      for (const item of cartItems) {
        const product = await productModel.findById(item.productId);
        console.log('Product:', product); // Log product details
  
        // Check if the product exists and has enough stock
        if (product) {
          if (product.quantity >= item.quantity) {
            product.quantity -= item.quantity;
            await product.save();
            console.log('Updated Product:', product); // Log updated product
          } else {
            return res.json({ success: false, message: `Not enough stock for ${product.name}` });
          }
        } else {
          return res.json({ success: false, message: `Product with ID ${item.productId} not found` });
        }
      }
  
      res.json({ success: true, message: "Checkout Successful" });
    } catch (error) {
      console.error('Checkout Error:', error); // Log any errors
      res.json({ success: false, message: error.message });
    }
  };
  

export { listProduct, addProduct, removeProduct, singleProduct, editProduct, handleCheckout };
