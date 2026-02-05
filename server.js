const express = require("express");
const path = require("path");
const fetch = require("node-fetch"); // NEW LINE
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// API endpoint (NEW)
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY; // <-- USE ENV VAR
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
