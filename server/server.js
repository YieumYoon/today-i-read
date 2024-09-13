const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

// Import routes
const naverApiRoutes = require('./naver-api');
const imageProxyRoutes = require('./image-proxy');

// Use routes
app.use('/api', naverApiRoutes);
app.use('/proxy-image', imageProxyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});