# 🎬 MovieMood Backend

A smart travel itinerary generator that creates real-world trip plans based on your favorite movies — powered by Perplexity's Sonar API.

---

## 🚀 Features

- 🧠 AI-generated travel plans based on any movie + location
- 🔎 Uses Perplexity’s real-time Sonar API
- 🌐 Clean Express.js backend
- 📦 Modular structure (routes, controllers, services, utils)
- 🛡️ Secured `.env` file for API keys

---

## 📁 Folder Structure

server/
├── controllers/
│ └── itineraryController.js
├── routes/
│ └── itinerary.js
├── services/
│ └── sonarService.js
├── utils/
│ └── promptBuilder.js
├── index.js
├── .env (excluded from Git)
└── package.json




## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/movie-mood-backend.git
cd movie-mood-backend/server


2. Install Dependencies

npm install 

3. Add .env File
Create a .env file in the server/ directory with:

SONAR_API_KEY=your_sonar_api_key_here


4. Run the Server
node index.js
# or if you use nodemon
npx nodemon index.js
Server runs on http://localhost:3000
