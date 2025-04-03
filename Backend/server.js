import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import User from "./schemas/user.js";
import Product from "./schemas/product.js"; 
import cors from "cors";
import Cart from "./schemas/cart.js";
import Order from "./schemas/order.js";
import FashionProduct from "./schemas/fashionProducts.js";

const app = express();

app.use(express.json()); 
app.use(cors())

app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type"],
  }
));
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); 
  }
}
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await mongoose.model("users").find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post('/getUserOrder', async (req, res) => {
  const { userId, orderId } = req.body; // userId and orderId passed in the request body
  
  if (!userId || !orderId) {
    return res.status(400).json({ error: 'User ID and Order ID are required' });
  }
  
  try {
    // Find the user by ID and ensure the user has the order
    const user = await User.findById(userId).populate({
      path: 'orders',
      match: { _id: new mongoose.Types.ObjectId(orderId) }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the order is found in the user's orders
    const order = user.orders.find(order => order._id.toString() === orderId);

    if (order) {
      return res.json({ order });
    } else {
      return res.status(404).json({ error: 'Order not found for this user' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});


app.post('/getUserCart', async (req, res) => {
  const { userId } = req.body;  // User ObjectId passed in the request body
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  try {
    // Find the user by ID and populate the cart field
    const user = await User.findById(userId).populate('cart');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // If the user has a cart, return it
    if (user.cart) {
      return res.json({ cart: user.cart });
    } else {
      return res.status(404).json({ error: 'No cart found for this user' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await mongoose.model("Product").find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const fashionProducts = [
  {
    title: "Stylish Jacket",
    price: 1999,
    description: "A trendy jacket perfect for winter.",
    imageUrl: "https://images.unsplash.com/photo-1594633313826-7f7eaf4cbb52", // Changed from productImageUrl to imageUrl
    category: "fashion",
  },
  {
    title: "Trendy Sneakers",
    price: 2499,
    description: "Comfortable and stylish sneakers.",
    imageUrl: "https://images.unsplash.com/photo-1603808033192-0e60f01fd6d6", // Changed
    category: "fashion",
  },
  {
    title: "Classic Sunglasses",
    price: 999,
    description: "Protect your eyes with a classic look.",
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a894", // Changed
    category: "fashion",
  },
  {
    title: "Elegant Handbag",
    price: 1799,
    description: "A stylish handbag for all occasions.",
    imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646", // Changed
    category: "fashion",
  },
];

const insertData = async () => {
  try {
    await FashionProduct.deleteMany({}); // Delete existing data
    await FashionProduct.insertMany(fashionProducts);
    console.log("✅ Fashion products inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting products:", error);
  }
};
insertData();

app.get("/fashionProducts", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB is not connected.");
    }
    
    const products = await FashionProduct.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching fashion products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/hii", (req, res) => {
    res.send("Hello hiii hiii!");
  });

app.listen(3000, () => {        
  console.log("Server is running on port 3000");
}
);

