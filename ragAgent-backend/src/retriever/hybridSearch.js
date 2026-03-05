import { searchVector } from "../services/vectorService.js";
import { keywordSearch } from "./keywordSearch.js";

export async function hybridSearch(queryEmbedding, query) {

    const vectorResults = await searchVector(queryEmbedding);

    const keywordResults = await keywordSearch(query);

    const merged = [...vectorResults, ...keywordResults];

    // Deduplicate by text content
    const seen = new Set();
    const unique = merged.filter(doc => {
        if (seen.has(doc.text)) return false;
        seen.add(doc.text);
        return true;
    });

    return unique;

}