require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Phục vụ các file tĩnh từ thư mục hiện tại

// Cấu hình transporter cho Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Email của bạn
        pass: process.env.GMAIL_PASS // App Password
    }
});

// API endpoint để gửi email
app.post('/send-email', async (req, res) => {
    try {
        const { location, datetime, food, drinks, note } = req.body;

        // Tạo nội dung email HTML
        const htmlContent = `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    h1 { color: #ff69b4; }
                    .section { margin: 20px 0; }
                    .label { font-weight: bold; color: #333; }
                </style>
            </head>
            <body>
                <h1>🌸 New Date Request! 🌸</h1>
                
                <div class="section">
                    <p class="label">Location:</p>
                    <p>${location}</p>
                </div>

                <div class="section">
                    <p class="label">Date/Time Options:</p>
                    ${datetime.map(dt => `<p>- ${dt.date} at ${dt.time}</p>`).join('')}
                </div>

                <div class="section">
                    <p class="label">Food Preferences:</p>
                    <p>${food.join(', ')}</p>
                </div>

                <div class="section">
                    <p class="label">Drink Preferences:</p>
                    <p>${drinks.join(', ')}</p>
                </div>

                <div class="section">
                    <p class="label">Special Note:</p>
                    <p>${note}</p>
                </div>
            </body>
            </html>
        `;

        // Cấu hình email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.MAIL_TO,
            subject: 'New Date Request! 💕',
            html: htmlContent
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
});

// Route mặc định để phục vụ trang index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Open the above URL in your browser to see the application');
});
