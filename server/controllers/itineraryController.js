const { buildPrompt } = require('../utils/promptBuilder');
const { callSonar } = require('../services/sonarService');

exports.getMovieItinerary = async (req, res) => {
  const { movie, location } = req.body;

  if (!movie || !location) {
    return res.status(400).json({ error: "Movie and location are required." });
  }

  try {
    const prompt = buildPrompt(movie, location);
    const itinerary = await callSonar(prompt);

    res.json({ itinerary });
  } catch (error) {
    console.error('Error contacting Sonar API:', error.message);
    res.status(500).json({ error: 'Failed to fetch itinerary from Sonar API' });
  }
};
