const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { setupWebSocket } = require('./websocket/collaboration'); // WebSocket integration
require('dotenv').config(); // Make sure .env is at project root

const app = express();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('BrumPad Backend is running!');
});

// ----------------------
// MongoDB Connection
// ----------------------
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("Error: MONGO_URI is not defined in .env");
    process.exit(1);
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// ----------------------
// Middleware
// ----------------------
app.use(cors());
app.use(bodyParser.json());

// ----------------------
// Routes
// ----------------------
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/files', require('./routes/fileRoutes'));
app.use('/api/code', require('./routes/codeRoutes'));

// ----------------------
// Start Server
// ----------------------
const server = app.listen(PORT, () => {
    console.log(`🚀Backend running on port ${PORT}`);
});

// ----------------------
// WebSocket setup
// ----------------------
setupWebSocket(server);
