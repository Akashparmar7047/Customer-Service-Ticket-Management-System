const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) console.error('Database connection failed:', err);
    else console.log('Connected to MySQL database');
});

app.post('/submit_request', (req, res) => {
    const { userName, email, description } = req.body;
    db.query('INSERT INTO service_requests (user_name, email, description, status) VALUES (?, ?, ?, ?)',
        [userName, email, description, Enum], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Request submitted successfully!', request_id: result.insertId });
    });
});

app.get('/requests', (req, res) => {
    db.query('SELECT * FROM service_requests', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.listen(process.env.PORT || 5000, () => console.log('Server running...'));
