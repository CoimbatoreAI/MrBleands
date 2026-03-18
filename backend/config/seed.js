const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const products = [
    { name: "Mango Pickle", category: "Traditional", price: 199, oldPrice: 249, description: "Authentic Kerala mango pickle made with hand-picked mangoes and traditional spices.", countInStock: 50, isFeatured: true, images: ["/uploads/mango-pickle.jpg"] },
    { name: "Green Chilli Pickle", category: "Spicy", price: 179, oldPrice: 199, description: "Spicy and tangy green chilli pickle, perfect for spice lovers.", countInStock: 40, isFeatured: false, images: ["/uploads/green-chilli-pickle.jpg"] },
    { name: "Salt Lemon Pickle", category: "Lemon", price: 169, oldPrice: 189, description: "Refreshing salt lemon pickle, a classic Kerala accompaniment.", countInStock: 30, isFeatured: false, images: ["/uploads/salt-lemon-pickle.jpg"] },
    { name: "Lemon Pickle", category: "Lemon", price: 179, oldPrice: 209, description: "Traditional spicy lemon pickle matured to perfection.", countInStock: 45, isFeatured: true, images: ["/uploads/lemon-pickle.jpg"] },
    { name: "Garlic Pickle", category: "Traditional", price: 199, oldPrice: 229, description: "Rich and flavorful garlic pickle made with premium garlic cloves.", countInStock: 50, isFeatured: true, images: ["/uploads/garlic-pickle.jpg"] },
    { name: "Yam Pickle", category: "Root", price: 189, oldPrice: 219, description: "Unique and tasty yam pickle, a Kerala specialty.", countInStock: 25, isFeatured: false, images: ["/uploads/yam-pickle.jpg"] },
    { name: "Mango Green Chilli Mix", category: "Mixed", price: 209, oldPrice: 249, description: "A perfect blend of mango and green chilli for a multi-layered flavor profile.", countInStock: 35, isFeatured: false, images: ["/uploads/mango-pickle.jpg", "/uploads/green-chilli-pickle.jpg"] },
    { name: "Yam Dates Mix Pickle", category: "Mixed", price: 219, oldPrice: 259, description: "An exotic mix of yam and dates, balancing spice and sweetness.", countInStock: 20, isFeatured: false, images: ["/uploads/yam-pickle.jpg", "/uploads/dates-pickle.jpg"] },
    { name: "Dates Pickle", category: "Specialty", price: 229, oldPrice: 279, description: "Sweet and spicy dates pickle, a gourmet delight.", countInStock: 40, isFeatured: true, images: ["/uploads/dates-pickle.jpg"] },
    { name: "Dates Lemon Mix", category: "Specialty", price: 219, oldPrice: 249, description: "Tangy lemon combined with sweet dates for a unique taste.", countInStock: 30, isFeatured: false, images: ["/uploads/dates-pickle.jpg", "/uploads/lemon-pickle.jpg"] },
    { name: "Dates Cherry Raisin Mix", category: "Exotic", price: 239, oldPrice: 299, description: "Premium mix of dates, cherries, and raisins for a rich pickle experience.", countInStock: 20, isFeatured: false, images: ["/uploads/dates-pickle.jpg"] },
    { name: "Mixed Vegetable Pickle", category: "Traditional", price: 199, oldPrice: 229, description: "Assorted vegetables pickled in a spicy and aromatic oil.", countInStock: 50, isFeatured: false, images: ["/uploads/mixed-pickle.jpg"] },
    { name: "Papaya Chilli Mix", category: "Exotic", price: 209, oldPrice: 239, description: "Unique papaya and chilli combination for a fresh and spicy kick.", countInStock: 25, isFeatured: false, images: ["/uploads/mixed-pickle.jpg", "/uploads/green-chilli-pickle.jpg"] }
];

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB Atlas for seeding');

        // Create Admin if not exists
        const adminEmail = 'admin@mrblendsonline.com';
        const adminPassword = 'ramesh@71';
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            await User.create({ email: adminEmail, password: adminPassword, isAdmin: true });
            console.log('Admin user created');
        }

        // Seed Products
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('13 Products seeded successfully with corrected image paths');

        process.exit();
    })
    .catch(err => {
        console.error('Error seeding database:', err);
        process.exit(1);
    });
