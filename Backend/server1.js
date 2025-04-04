import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import User from "./schemas/user.js";
import Product from "./schemas/product.js"; 
import cors from "cors";
import Cart from "./schemas/cart.js";
import Order from "./schemas/order.js";

const app = express();

app.use(express.json()); 

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



app.get("/hii", (req, res) => {
    res.send("Hello hiii hiii!");
  });

app.listen(3000, () => {        
  console.log("Server is running on port 3000");
}
);

