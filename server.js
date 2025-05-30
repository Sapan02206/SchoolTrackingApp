const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Serve static files

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'codewithsapan007@gmail.com',
    pass: 'mjep fsqg bksp cukz'
  }
});

// API route
app.post('/send-attendance', (req, res) => {
  const { name, email, date, status } = req.body;

  const mailOptions = {
    from: 'School Admin <codewithsapan@gmail.com>',
    to: email,
    subject: 'Attendance Update',
    text: `Hi ${name}, your attendance for ${date} is marked as: ${status}.`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to send email');
    }
    res.send('Email sent successfully');
  });
});

// Optional: default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
