// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost', // Your database host
    user: 'root',      // Your database user
    password: 'java123', // Your database password
    database: 'your_database' // Your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// JWT secret key
const JWT_SECRET = 'your_jwt_secret'; // Change this to a secure random string

// Function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to verify JWT token
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.sendStatus(403);
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

// Candidate Signup
app.post('/api/candidates/signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO candidates (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ error: 'User already exists!' });
        }
        res.json({ message: 'Signup successful!' });
    });
});

// Candidate Login
app.post('/api/candidates/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM candidates WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'User not found!' });
        }
        const user = results[0];
        if (user.password !== password) {
            return res.status(400).json({ error: 'Incorrect password!' });
        }
        const token = generateToken(user.id);
        res.json({ message: 'Login successful!', token, name:user.name });
    });
});

// Candidate Logout (optional, usually client-side)
app.post('/api/candidates/logout', (req, res) => {
    // Invalidate the token on the client-side
    res.json({ message: 'Logout successful!' });
});

// Submit Form
app.post('/api/candidates/submit', authenticateJWT, (req, res) => {
    const { formData } = req.body; // Expecting form data in the body
    // Example: Save submitted form data to the database
    const sql = 'INSERT INTO submissions (candidate_id, data) VALUES (?, ?)';
    db.query(sql, [req.user.id, JSON.stringify(formData)], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Submission failed!' });
        }
        res.json({ message: 'Form submitted successfully!' });
    });
});

// Get Assignments
app.get('/api/assignment', authenticateJWT, (req, res) => {
    const sql = 'SELECT * FROM assignments';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve assignments.' });
        }
        res.json(results);
    });
});

// Admin Signup
app.post('/api/admin/signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Admin already exists!' });
        }
        res.json({ message: 'Admin signup successful!' });
    });
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM admins WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Admin not found!' });
        }
        const admin = results[0];
        if (admin.password !== password) {
            return res.status(400).json({ error: 'Incorrect password!' });
        }
        const token = generateToken(admin.id);
        res.json({ message: 'Admin login successful!', token });
    });
});

// Admin Logout (optional, usually client-side)
app.post('/api/admin/logout', (req, res) => {
    // Invalidate the token on the client-side
    res.json({ message: 'Admin logout successful!' });
});

// Create Team
app.post('/api/admin/teams', authenticateJWT, (req, res) => {
    const { teamName } = req.body;
    const sql = 'INSERT INTO teams (name) VALUES (?)';
    db.query(sql, [teamName], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to create team!' });
        }
        res.json({ message: 'Team created successfully!' });
    });
});

// Post Assignment
app.post('/api/admin/assignment', authenticateJWT, (req, res) => {
    const { title, description } = req.body;
    const sql = 'INSERT INTO assignments (title, description) VALUES (?, ?)';
    db.query(sql, [title, description], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to post assignment!' });
        }
        res.json({ message: 'Assignment posted successfully!' });
    });
});

// Get Responses
app.get('/api/admin/responses', authenticateJWT, (req, res) => {
    const sql = 'SELECT * FROM responses';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve responses.' });
        }
        res.json(results);
    });
});

// Schedule Meeting
app.post('/api/admin/meetings', authenticateJWT, (req, res) => {
    const { meetingDetails } = req.body; // Expecting details in the body
    const sql = 'INSERT INTO meetings (details) VALUES (?)';
    db.query(sql, [meetingDetails], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to schedule meeting!' });
        }
        res.json({ message: 'Meeting scheduled successfully!' });
    });
});

// Delete Response
app.delete('/api/admin/responses/:id', authenticateJWT, (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM responses WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to delete response!' });
        }
        res.json({ message: `Response with ID ${id} deleted successfully!` });
    });
});

// Display Response
app.get('/api/admin/responses/:responseId', authenticateJWT, (req, res) => {
    const { responseId } = req.params;
    const sql = 'SELECT * FROM responses WHERE id = ?';
    db.query(sql, [responseId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Response not found!' });
        }
        res.json(results[0]);
    });
});

// Recruit Button
app.post('/api/admin/recruit/:candidateId', authenticateJWT, (req, res) => {
    const { candidateId } = req.params;
    const sql = 'UPDATE candidates SET status = ? WHERE id = ?';
    db.query(sql, ['recruited', candidateId], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to recruit candidate!' });
        }
        res.json({ message: `Candidate with ID ${candidateId} recruited successfully!` });
    });
});

// Start server
app.listen(3001, () => {
    console.log(`Server is running on http://localhost:${3001}`);
});

