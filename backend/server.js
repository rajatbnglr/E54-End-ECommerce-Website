const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// MongoDB Connection
// ===============================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });


// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
    res.json({
        message: "E-Commerce Backend API is running"
    });
});


// ===============================
// Products API
// ===============================

app.get("/products", (req, res) => {

    const products = [

        {
            id: 1,
            title: "Premium Backpack",
            price: 49.99,
            category: "Bags",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
            rating: {
                rate: 4.5,
                count: 120
            }
        },

        {
            id: 2,
            title: "Classic Wrist Watch",
            price: 79.99,
            category: "Accessories",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            rating: {
                rate: 4.4,
                count: 95
            }
        },

        {
            id: 3,
            title: "Wireless Headphones",
            price: 59.99,
            category: "Electronics",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            rating: {
                rate: 4.7,
                count: 210
            }
        },

        {
            id: 4,
            title: "Running Shoes",
            price: 89.99,
            category: "Footwear",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            rating: {
                rate: 4.6,
                count: 180
            }
        },

        {
            id: 5,
            title: "Modern Sunglasses",
            price: 39.99,
            category: "Accessories",
            image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
            rating: {
                rate: 4.3,
                count: 75
            }
        },

        {
            id: 6,
            title: "Smart Watch",
            price: 129.99,
            category: "Electronics",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            rating: {
                rate: 4.8,
                count: 250
            }
        }

    ];

    res.status(200).json(products);
});


// ===============================
// Signup API
// ===============================

app.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Name, email and password are required"
            });

        }

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(409).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = new User({

            name,
            email,
            password: hashedPassword

        });

        await user.save();

        res.status(201).json({

            message: "Signup successful",
            email: user.email

        });

    } catch (error) {

        console.error("Signup error:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ===============================
// Login API
// ===============================

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required"
            });

        }

        const user = await User.findOne({
            email
        });

        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordCorrect) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        res.status(200).json({

            message: "Login successful",
            email: user.email,
            name: user.name

        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});