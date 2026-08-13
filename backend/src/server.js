import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load Fallback E-Waste JSON Database
const getEwasteData = () => {
  const dataPath = path.join(__dirname, '../data/ewaste_categories.json');
  try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading ewaste_categories.json:', err);
    return { categories: [] };
  }
};

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', service: 'EcoTrace AI Express Backend', timestamp: new Date() });
});

// Get all E-Waste Categories & Specifications
app.get('/api/ewaste/categories', (req, res) => {
  const data = getEwasteData();
  res.json(data);
});

// Fallback AI Scan Endpoint
app.post('/api/ewaste/scan-fallback', (req, res) => {
  const { deviceType } = req.body;
  const data = getEwasteData();
  const found = data.categories.find(c => c.id === (deviceType || 'smartphone')) || data.categories[0];
  res.json({
    success: true,
    source: 'fallback_local_dataset',
    data: found
  });
});

// Schedule Pickup Endpoint
app.post('/api/pickup/schedule', (req, res) => {
  const { deviceId, address, preferredTime } = req.body;
  const requestId = 'ID#' + Math.floor(1000 + Math.random() * 9000);
  
  res.json({
    success: true,
    message: 'Pickup task scheduled successfully',
    pickup: {
      requestId,
      deviceId: deviceId || 'Smartphone',
      pickupTime: preferredTime || 'Tomorrow, 10:00 AM',
      address: address || 'User Address',
      assignedRecycler: 'Authorized Recycler Hub #4',
      status: 'Ready for Pickup',
      value: 450
    }
  });
});

app.listen(PORT, () => {
  console.log(`⚡ EcoTrace Backend Server running on http://localhost:${PORT}`);
});
