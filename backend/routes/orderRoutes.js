const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrders,
    updateOrderStatus,
    deleteOrder,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', addOrderItems);
router.get('/', protect, admin, getOrders);
router.patch('/:id/status', protect, admin, updateOrderStatus);
router.delete('/:id', protect, admin, deleteOrder);

module.exports = router;
