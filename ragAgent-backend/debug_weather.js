import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function testWeather() {
    const city = "Delhi";
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log("Testing URL:", url);
    try {
        const res = await axios.get(url);
        console.log("Weather OK:", res.data.main.temp);
    } catch (e) {
        console.error("Weather Failed:", e.response?.status, e.response?.data || e.message);
    }
}

testWeather();
