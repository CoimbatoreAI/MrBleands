const Order = require('../models/Order');
const sendEmail = require('../utils/emailService');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' });
            return;
        } else {
            const order = new Order({
                orderItems,
                shippingAddress,
                paymentMethod,
                totalPrice,
            });

            const createdOrder = await order.save();

            // 1. Send Order Request Email to Admin
            const adminEmail = process.env.EMAIL_USER || 'mullakkalramesh@gmail.com';
            const orderDetailsHtml = orderItems.map(item => `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * item.qty}</td>
                </tr>
            `).join('');

            try {
                await sendEmail({
                    email: adminEmail,
                    subject: `New Order Received! 📦 #${createdOrder._id.toString().slice(-6).toUpperCase()}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
                            <h2 style="color: #6a040f;">New Order Received</h2>
                            <p>You have received a new order from <strong>${shippingAddress.name}</strong>.</p>
                            
                            <h3>Customer Details:</h3>
                            <p><strong>Name:</strong> ${shippingAddress.name}<br>
                               <strong>Email:</strong> ${shippingAddress.email}<br>
                               <strong>Phone:</strong> ${shippingAddress.phone}<br>
                               <strong>Address:</strong> ${shippingAddress.address}, ${shippingAddress.city} - ${shippingAddress.postalCode}, ${shippingAddress.country}</p>
                            
                            <h3>Order Items:</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr style="background: #f8f8f8;">
                                        <th style="padding: 10px; text-align: left;">Item</th>
                                        <th style="padding: 10px; text-align: center;">Qty</th>
                                        <th style="padding: 10px; text-align: right;">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${orderDetailsHtml}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2" style="padding: 10px; font-weight: bold; text-align: right;">Total:</td>
                                        <td style="padding: 10px; font-weight: bold; text-align: right;">₹${totalPrice}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <p>Method: ${paymentMethod}</p>
                        </div>
                    `,
                });
            } catch (err) {
                console.error('Admin order email failed:', err);
            }

            // 2. Send Order Confirmation Email to Customer
            try {
                await sendEmail({
                    email: shippingAddress.email,
                    subject: 'Thank you for your order! Mr Blends 🌶️',
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #6a040f; text-align: center;">Order Confirmed!</h2>
                            <p>Hi ${shippingAddress.name},</p>
                            <p>Thank you for shopping with Mr Blends. We have received your order and it's being processed.</p>
                            
                            <h3>Your Order Summary:</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tbody>
                                    ${orderDetailsHtml}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2" style="padding: 10px; font-weight: bold; text-align: right;">Total:</td>
                                        <td style="padding: 10px; font-weight: bold; text-align: right;">₹${totalPrice}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            
                            <p>We'll notify you once your spices are on their way!</p>
                            <p>If you have any questions, feel free to reply to this email.</p>
                            <p>Best Regards,<br>Mr Blends Team</p>
                        </div>
                    `,
                });
            } catch (err) {
                console.error('Customer order email failed:', err);
            }

            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = req.body.status || order.status;
            if (order.status === 'Delivered') {
                order.isPaid = true;
            }
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: 'Order removed' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addOrderItems,
    getOrders,
    updateOrderStatus,
    deleteOrder,
};
