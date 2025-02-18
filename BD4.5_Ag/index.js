const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./BD4.5_Ag/database.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

// Get all restaurants
app.get('/restaurants', (req, res) => {
    db.all('SELECT * FROM restaurants', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ restaurants: rows });
    });
});

// Get restaurant by ID
app.get('/restaurants/details/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM restaurants WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ restaurant: row });
    });
});

// Get restaurants by cuisine
app.get('/restaurants/cuisine/:cuisine', (req, res) => {
    const { cuisine } = req.params;
    db.all('SELECT * FROM restaurants WHERE cuisine = ?', [cuisine], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ restaurants: rows });
    });
});

// Get restaurants by filter
app.get('/restaurants/filter', (req, res) => {
    const { isVeg, hasOutdoorSeating, isLuxury } = req.query;
    const query = `SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?`;
    db.all(query, [isVeg, hasOutdoorSeating, isLuxury], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ restaurants: rows });
    });
});

// Get restaurants sorted by rating
app.get('/restaurants/sort-by-rating', (req, res) => {
    db.all('SELECT * FROM restaurants ORDER BY rating DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ restaurants: rows });
    });
});

// Get all dishes
app.get('/dishes', (req, res) => {
    db.all('SELECT * FROM dishes', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ dishes: rows });
    });
});

// Get dish by ID
app.get('/dishes/details/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM dishes WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ dish: row });
    });
});

// Get dishes by filter
app.get('/dishes/filter', (req, res) => {
    const { isVeg } = req.query;
    db.all('SELECT * FROM dishes WHERE isVeg = ?', [isVeg], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ dishes: rows });
    });
});

// Get dishes sorted by price
app.get('/dishes/sort-by-price', (req, res) => {
    db.all('SELECT * FROM dishes ORDER BY price ASC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ dishes: rows });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});