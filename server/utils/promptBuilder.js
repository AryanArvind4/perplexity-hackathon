// utils/promptBuilder.js
exports.buildPrompt = (movie, location) => {
    return `You're an expert travel planner and film enthusiast.
  
  A user is visiting **${location}** and absolutely loves the movie **"${movie}"**.
  
  Your task is to suggest a **highly personalized travel itinerary** that matches the **themes, aesthetics, emotions, and iconic moments** of the movie.
  
   Focus Areas:
  - Recommend **real-world locations** in or around ${location} that reflect key scenes, mood, or settings from the movie.
  - Suggest **local experiences** (e.g., food, music, neighborhoods, art, activities) that match the movie’s vibe.
  - Include **exact place names** (with descriptions) whenever possible.
  - Make the experience feel like the movie is coming to life.
  
  Format:
  1. **Morning** – Suggestions
  2. **Afternoon** – Suggestions
  3. **Evening** – Suggestions
  4. **Optional** – Offbeat ideas or hidden gems
  5. **Why it fits "${movie}"** – Short paragraph explaining the connection
  
  Keep the tone engaging and cinematic.`;
  
  };


