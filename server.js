  




const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: process.env.HOST, // Replace with your remote server address
    user: process.env.USER, // Replace with your database username
    password: process.env.PASSWORD, // Replace with your database password
    database: process.env.DATABASE // Replace with your database name
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully connected to the database!');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { numberPills, date, time, timeCheckbox, nextTime, day } = req.body;

    const query = 'INSERT INTO main (numberPills, date, time, timeCheckbox, nextTime, day) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [numberPills, date, time, timeCheckbox ? 1 : 0, nextTime, day];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.send('New record created successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


