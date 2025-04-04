import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import User from "./schemas/user.js";
import Product from "./schemas/product.js"; 
import cors from "cors";
import Cart from "./schemas/cart.js";
import Order from "./schemas/order.js";
import FashionProduct from "./schemas/fashionProducts.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";

// Load passport configuration
import "./config/passport.js";

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, 
  },
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

// Authentication Routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect("/"); 
  }
);

// Product Routes
app.get("/products", async (req, res) => {
  try {
    const products = await mongoose.model("Product").find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fashion Products Routes
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

// Logout Route
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Graceful shutdown on process termination
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down gracefully...");
  await mongoose.disconnect();
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 
