const User = require('../models/User');
const sendEmail = require('../utils/emailService');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        email,
        password,
        isAdmin: false,
    });

    if (user) {
        // Send Welcome Email
        try {
            await sendEmail({
                email: user.email,
                subject: 'Welcome to Mr Blends! 🌶️',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
                        <h1 style="color: #6a040f; text-align: center;">Welcome to Mr Blends!</h1>
                        <p>Hi there,</p>
                        <p>Thank you for creating an account with Mr Blends. We're thrilled to have you join our community of spice enthusiasts!</p>
                        <p>Explore our wide range of traditional Kerala pickles, handcrafted with love and authentic ingredients.</p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="https://mrblends.com/shop" style="background-color: #f77f00; color: white; padding: 15px 25px; text-decoration: none; border-radius: 10px; font-weight: bold;">Browse Our Collection</a>
                        </div>
                        <p style="margin-top: 30px;">Happy pickling!<br>The Mr Blends Team</p>
                    </div>
                `,
            });
        } catch (error) {
            console.error('Error sending welcome email:', error);
        }

        res.status(201).json({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { authUser, registerUser };
