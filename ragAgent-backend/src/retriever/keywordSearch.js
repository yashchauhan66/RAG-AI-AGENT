import Document from "../models/Document.js";

export async function keywordSearch(query) {
    try {
        // Try text search first
        const results = await Document.find({
            $text: { $search: query }
        }).limit(5).lean();

        if (results.length > 0) {
            return results.map(doc => ({
                text: doc.text,
                score: 0.5 // Default relevance for text search
            }));
        }
    } catch (err) {
        console.warn("Text index search failed or not ready, falling back to regex.");
    }

    // Fallback to simple regex search if text index fails/returns nothing
    const fallbackResults = await Document.find({
        text: { $regex: query, $options: "i" }
    }).limit(5).lean();

    return fallbackResults.map(doc => ({
        text: doc.text,
        score: 0.3
    }));
}