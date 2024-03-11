// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost/chatDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Message schema
const messageSchema = new mongoose.Schema({
  text: String,
});

const Message = mongoose.model('Message', messageSchema);

app.use(bodyParser.json());

// POST endpoint to save a new message
app.post('/messages', async (req, res) => {
  try {
    const { text } = req.body;
    const message = new Message({ text });
    await message.save();
    res.status(201).json({ message: 'Message saved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET endpoint to retrieve all messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
