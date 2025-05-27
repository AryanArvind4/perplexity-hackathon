const express = require('express');
const cors = require('cors');
require('dotenv').config();

const itineraryRoutes = require('./routes/itinerary'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/itinerary', itineraryRoutes); 

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
