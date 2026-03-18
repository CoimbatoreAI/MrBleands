const sendEmail = require('../utils/emailService');

// @desc    Subscribe to newsletter
// @route   POST /api/subscription/subscribe
// @access  Public
const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // 1. Welcome email to the subscriber
    await sendEmail({
      email: email,
      subject: 'Welcome to the Mr Blends Spice Circle! 🌶️',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
          <h1 style="color: #6a040f; text-align: center;">Welcome to Mr Blends!</h1>
          <p>Thank you for joining our Spice Circle. You're now on the list to receive exclusive offers, tradition-inspired recipes, and early access to our latest pickle blends!</p>
          <p>Stay tuned for some tangy inspiration delivered straight to your inbox.</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://mrblends.com" style="background-color: #f77f00; color: white; padding: 15px 25px; text-decoration: none; border-radius: 10px; font-weight: bold;">Explore Our Shop</a>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #777;">If you didn't mean to subscribe, please ignore this email.</p>
        </div>
      `,
    });

    // 2. Notification email to Admin
    const adminEmail = process.env.EMAIL_USER || 'mullakkalramesh@gmail.com';
    await sendEmail({
      email: adminEmail,
      subject: 'New Newsletter Subscription! 📥',
      html: `
        <h3>New Subscriber Details:</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p>This user just joined the Mr Blends Spice Circle!</p>
      `,
    });

    res.status(200).json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Error in subscription. Please try again later.' });
  }
};

module.exports = { subscribeUser };
