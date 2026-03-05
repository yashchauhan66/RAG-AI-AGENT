import calculatorTool from "../tools/calculatorTool.js";
import { weatherTool } from "../tools/weatherTool.js";
import { searchTool } from "../tools/searchTool.js";

export async function runAgent(question) {

    const lowerQ = question.toLowerCase();

    const mathMatch = question.match(/[0-9]+\s*[\+\-\*\/]\s*[0-9]+/);
    if (mathMatch) {
        return calculatorTool(mathMatch[0]);
    }


    // Weather - Handle more flexible queries (e.g., "Delhi weather", "weather in Mumbai")
    if (lowerQ.includes("weather")) {
        let city = null;

        if (lowerQ.includes(" in ")) {
            city = question.split(/ in /i)[1];
        } else if (lowerQ.match(/(.*)\s+weather/i)) {
            // Handles "Delhi weather"
            city = question.match(/(.*)\s+weather/i)[1];
        } else if (lowerQ.match(/weather\s+(.*)/i)) {
            // Handles "weather Delhi"
            city = question.match(/weather\s+(.*)/i)[1];
        }

        if (city) {
            // Clean up the city name (remove "ka", "ki", etc. commonly found in Hinglish)
            const cleanCity = city.trim().split(/\s+/)[0].replace(/[^a-zA-Z\s]/g, "");
            if (cleanCity) {
                try {
                    return await weatherTool(cleanCity);
                } catch (err) {
                    console.log("Weather tool failed, falling back to RAG:", err.message);
                }
            }
        }
    }


    if (lowerQ.includes("latest") ||
        lowerQ.includes("news") ||
        lowerQ.includes("who is")) {

        return await searchTool(question);

    }

    return null;

}