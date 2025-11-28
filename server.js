const express = require('express');
const db = require('./models/db.config.js'); // Path yang benar

const app = express();
const PORT = 8001;

app.use(express.json());

// Import routes
const userRoutes = require('./routes/user.routes.js');
const productRoutes = require('./routes/products.routes.js');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});