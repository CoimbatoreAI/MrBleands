const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Use SSL/TLS
        auth: {
            user: process.env.EMAIL_USER || 'mullakkalramesh@gmail.com',
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Mr Blends Admin" <${process.env.EMAIL_USER || 'mullakkalramesh@gmail.com'}>`,
        to: options.email,
        subject: options.subject,
        html: options.html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;
