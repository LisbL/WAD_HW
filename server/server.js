const express = require('express');
const pool = require('./database'); // import the database connection
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); //for parsing JSON requests

// --- signup route ---
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, password]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Server Error'});
    }
});


//test route to check if it works
app.get('/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()'); // simple test query
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
