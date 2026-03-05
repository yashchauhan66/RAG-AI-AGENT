import { chunkText } from "../utils/chunkText.js";
import loadPDF from "../loaders/pdfLoader.js";  
import { storeChunks } from "./vectorService.js";

export const ingestDocument = async (filePath) => {
    console.log(`Loading PDF: ${filePath}`);

    const text = await loadPDF(filePath);

    if (!text || text.trim().length === 0) {
        throw new Error("PDF has no readable text content");
    }

    console.log(`Chunking text (${text.length} chars)...`);
    const chunks = chunkText(text);

    console.log(`Generated ${chunks.length} chunks — embedding & storing...`);
    await storeChunks(chunks);

    return { chunksStored: chunks.length };
};
