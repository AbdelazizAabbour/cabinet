require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const db = require('./config/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify Transporter on Startup
transporter.verify((error, success) => {
    if (error) {
        console.error('Email Transporter Error:', error);
    } else {
        console.log('Email Transporter is ready to send messages');
    }
});

// Routes
app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    const sql = `INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)`;
    const params = [name, email, phone, message];

    db.run(sql, params, async function (err) {
        if (err) {
            console.error('Error inserting message:', err.message);
            return res.status(500).json({ error: 'Failed to save message.' });
        }

        const messageId = this.lastID;

        // Path to logo
        const logoPath = path.resolve(__dirname, '../public/logo.png');

        // Send Email Notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `🔔 Nouveau Message : ${name}`,
            text: `Nouveau message de ${name} (${email}): ${message}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            background-color: #f8f9fa;
                        }
                        .email-container {
                            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border-radius: 12px;
                            overflow: hidden;
                            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                            border: 1px solid #eee;
                        }
                        .header {
                            background: linear-gradient(135deg, #fc006dff, #ff78b3ff);
                            color: white;
                            padding: 40px 20px;
                            text-align: center;
                        }
                        .header img {
                            max-width: 120px;
                            height: auto;
                            margin-bottom: 20px;
                            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 26px;
                            font-weight: 700;
                            letter-spacing: -0.5px;
                        }
                        .header p {
                            margin: 10px 0 0;
                            opacity: 0.9;
                            font-size: 16px;
                        }
                        .content {
                            padding: 40px;
                        }
                        .status-badge {
                            display: inline-block;
                            padding: 6px 12px;
                            background-color: #fff0f6;
                            color: #AD1457;
                            font-size: 12px;
                            font-weight: 700;
                            border-radius: 20px;
                            margin-bottom: 30px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                        .field {
                            margin-bottom: 25px;
                        }
                        .field-label {
                            font-weight: 700;
                            color: #999;
                            text-transform: uppercase;
                            font-size: 11px;
                            margin-bottom: 8px;
                            display: block;
                            letter-spacing: 1px;
                        }
                        .field-value {
                            font-size: 17px;
                            color: #222;
                            font-weight: 500;
                        }
                        .message-box {
                            background-color: #fafafa;
                            padding: 25px;
                            border-radius: 8px;
                            border: 1px dashed #ddd;
                            font-size: 16px;
                            color: #444;
                            line-height: 1.8;
                            margin-top: 5px;
                        }
                        .footer {
                            background-color: #fafafa;
                            padding: 30px;
                            text-align: center;
                            font-size: 13px;
                            color: #888;
                            border-top: 1px solid #f0f0f0;
                        }
                        .footer strong {
                            color: #AD1457;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            <img src="cid:logo" alt="Cabinet Hannit Logo">
                            <h1>Cabinet Hannit</h1>
                            <p>Système de Notification de Contact</p>
                        </div>
                        <div class="content">
                            <div class="status-badge">Nouvelle Demande</div>
                            
                            <div class="field">
                                <span class="field-label">Patient / Contact</span>
                                <div class="field-value">${name}</div>
                            </div>
                            
                            <div class="field">
                                <span class="field-label">Coordonnées</span>
                                <div class="field-value">
                                    Email : ${email}<br>
                                    Téléphone : ${phone || 'Non renseigné'}
                                </div>
                            </div>
                            
                            <div class="field">
                                <span class="field-label">Message du Patient</span>
                                <div class="message-box">${message}</div>
                            </div>
                        </div>
                        <div class="footer">
                            Ce message a été généré par votre site web professionnel.<br>
                            ID de Message : <strong>#${messageId}</strong>
                        </div>
                    </div>
                </body>
                </html>
            `,
            attachments: [{
                filename: 'logo.png',
                path: logoPath,
                cid: 'logo' // Same CID value as in the html img src
            }]
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(201).json({
                message: 'Message sent and email notification triggered successfully!',
                id: messageId
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            res.status(201).json({
                message: 'Message saved to database, but email notification failed.',
                id: messageId,
                warning: 'Email notification could not be sent. Check backend logs for details.'
            });
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
