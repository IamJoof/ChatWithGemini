require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const text = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const messageSchema = new mongoose.Schema({
    text: String,
    sender: String,
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// API Routes
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

app.post('/api/messages', async (req, res) => {
    try{
        const newMessage = new Message({
            text: req.body.text,
            sender: req.body.sender
        });
        const savedMessage = await newMessage.save();
        res.json(savedMessage);
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

app.delete('/api/messages/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

app.delete('/api/messages', async (req, res) => {
    try {
        await Message.deleteMany({});
        res.json({ message: 'All messages deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete messages' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});