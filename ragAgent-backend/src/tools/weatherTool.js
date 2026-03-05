import axios from "axios";

export async function weatherTool(city) {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const res = await axios.get(url);

        const temp = res.data.main.temp;
        const desc = res.data.weather[0]?.description || "clear sky";

        return `Current temperature in ${city} is ${temp}°C with ${desc}.`;
    } catch (error) {
        if (error.response?.status === 404) {
            return `I couldn't find weather information for "${city}". Please check the city name.`;
        }
        console.error("Weather tool error:", error.message);
        return "I'm having trouble fetching the weather right now.";
    }
}