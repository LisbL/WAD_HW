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


// --- login route ---
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const userQuery = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (userQuery.rows.length === 0) {
            return res.status(401).json({ message: 'You do not have an account. Please sign up' });
        }

        const user = userQuery.rows[0];

        // TODO: add password hashing comparison here
        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password." });
        }


        // User exists, send back a simple success response or a JWT
        res.json({ message: 'Login successful', user: userQuery.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- get posts ---
app.get('/posts', async (req, res) => {
  try {
    const posts = await pool.query(`
        SELECT
        id,
        profilePic,
        memePic,
        comment,
        likes,
        TO_CHAR(date, 'DD.MM.YYYY') AS formatted_date
    FROM posts
    ORDER BY date DESC`
    )
    res.json(posts.rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

// --- add posts ---
app.post('/posts', async (req, res) => {
  try {
    const { comment } = req.body

    const newPost = await pool.query(
      'INSERT INTO posts (comment, likes ) VALUES ($1, $2) RETURNING *',
      [comment, 0]
    )

    res.json(newPost.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

// --- delete all posts ---
app.delete('/posts', async (req, res) => {
  try {
    await pool.query('DELETE FROM posts');
    res.json({ message: 'All posts deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(port, () => {
    console.log("Server running on port " + port);
});
