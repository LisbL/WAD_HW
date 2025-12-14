const express = require('express');
const pool = require('./database'); // import the database connection
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'your_super_secret_key';

const app = express();
const port = 3000;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}


app.use(cors());
app.use(express.json()); //for parsing JSON requests

// --- signup route ---
app.post('/signup', async (req, res) => {
  const { email, password } = req.body
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    )

    // Create JWT
    const token = jwt.sign({ id: newUser.rows[0].id, email }, JWT_SECRET, { expiresIn: '1h' })

    res.json({ user: newUser.rows[0], token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server Error' })
  }
})


// --- login route ---
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const userQuery = await pool.query('SELECT * FROM users WHERE email=$1', [email])

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ message: 'You do not have an account. Please sign up' })
    }

    const user = userQuery.rows[0]

    // Compare hashed password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    // Create JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
    res.json({ message: 'Login successful', token, user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})


// --- get posts ---
app.get('/posts', authenticateToken, async (req, res) => {
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
app.post('/posts', authenticateToken, async (req, res) => {
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
app.delete('/posts', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM posts');
    res.json({ message: 'All posts deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single post
app.get('/posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  try {
    const post = await pool.query('SELECT * FROM posts WHERE id=$1', [id])
    if (post.rows.length === 0) return res.status(404).json({ error: "Post not found" })
    res.json(post.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// Update post
app.put('/posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  const { comment } = req.body
  try {
    const updated = await pool.query(
      'UPDATE posts SET comment=$1 WHERE id=$2 RETURNING *',
      [comment, id]
    )
    res.json(updated.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// Delete post
app.delete('/posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM posts WHERE id=$1', [id])
    res.json({ message: "Post deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})



app.listen(port, () => {
    console.log("Server running on port " + port);
});
