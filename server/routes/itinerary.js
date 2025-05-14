const express = require('express');
const router = express.Router();
const { getMovieItinerary } = require('../controllers/itineraryController');

router.post('/generate', getMovieItinerary); // ✅ handles POST /api/itinerary/generate

module.exports = router;
