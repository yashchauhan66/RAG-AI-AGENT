import axios from "axios";

export async function searchTool(query) {

  try {

    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

    const response = await axios.get(url);

    const result = response.data.AbstractText;

    if (!result) {
      return "No useful web result found.";
    }

    return result;

  } catch (error) {

    console.error("Search tool error:", error.message);

    return "Search failed.";

  }

}