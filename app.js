const express = require('express');
const app = express();
const connectDB = require("./db_connection/mongo_db_connection");
const http = require("http").createServer(app); // Create HTTP server
const { initSocket } = require("./socket"); // Import socket initializer
const port = 3000;
const bcrypt = require('bcrypt');
const User = require('./models/user_model'); // Import the User model
require('dotenv').config();

connectDB();

app.use(express.json());

app.use("/chat", require("./routes/routes")); 

app.get('/', (req, res) => res.send('Hello World!'));
app.get('*', (req, res) => res.send('This route not found')); 


app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).send({
     user: newUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT token
    res.status(200).send({ user : {
        id :user._id ,  
        name: user.username  
    } });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
// 👉 Initialize Socket.io
initSocket(http);

// 👉 Use `http.listen()` instead of `app.listen()`
http.listen(port, () => console.log(`🚀 Server listening on port ${port}!`));
