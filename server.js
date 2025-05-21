const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const path = require('path');
require('dotenv').config(); 
require('./databases');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

