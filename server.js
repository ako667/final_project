const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Статика
app.use(express.static(path.join(__dirname, 'public')));

// Роуты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cakes', require('./routes/cakes'));
app.use('/api/orders', require('./routes/orders'));

// Explicit route for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all for SPA: serve index.html for unmatched routes
app.use((req, res) => {
  // Only serve index.html for HTML accepts or non-API paths
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Подключение MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
