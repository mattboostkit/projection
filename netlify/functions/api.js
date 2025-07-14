const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// Import your existing routes
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Your existing API routes would be imported here
// For now, this is a placeholder - you'll need to adapt your server/routes.ts

app.get('/api/test', (req, res) => {
  res.json({ message: 'Netlify Functions working!' });
});

// Export the serverless function
module.exports.handler = serverless(app);