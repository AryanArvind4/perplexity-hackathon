const express = require('express');
const cors = require('cors');
require('dotenv').config();

const itineraryRoutes = require('./routes/itinerary'); // ✅ make sure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/itinerary', itineraryRoutes); // ✅ this sets the base path

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
