const Wishlist = require('../models/Wishlist');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user._id, products: [] });
        }
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add or remove product from wishlist
// @route   POST /api/wishlist/:productId
// @access  Private
const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        let wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user._id, products: [productId] });
        } else {
            const exists = wishlist.products.includes(productId);
            if (exists) {
                wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
            } else {
                wishlist.products.push(productId);
            }
            await wishlist.save();
        }

        wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getWishlist, toggleWishlist };
