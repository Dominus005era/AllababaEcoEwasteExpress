require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const valuationRoutes = require('./routes/valuation.routes');
const passportRoutes = require('./routes/passport.routes');
const pickupRoutes = require('./routes/pickup.routes');
const recyclerRoutes = require('./routes/recycler.routes');
const traceabilityRoutes = require('./routes/traceability.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Mount application routes
app.use('/api/valuations', valuationRoutes);
app.use('/api/passport', passportRoutes);
app.use('/api/pickup', pickupRoutes);
app.use('/api/recycler', recyclerRoutes);
app.use('/api/traceability', traceabilityRoutes);

// Global Error Handler Middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`E-Waste Management Backend running on port ${PORT}`);
});
