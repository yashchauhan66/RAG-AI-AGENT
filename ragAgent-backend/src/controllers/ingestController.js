
import { ingestDocument } from "../services/ingestService.js";
import path from "path";
import fs from "fs";

export async function ingestController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded. Send a PDF via multipart/form-data with field name 'pdf'" });
        }

        const filePath = req.file.path;

        console.log(` Received file: ${req.file.originalname}`);

        const result = await ingestDocument(filePath);


        fs.unlinkSync(filePath);

        return res.json({
            success: true,
            message: `Document ingested successfully`,
            chunksStored: result.chunksStored,
            filename: req.file.originalname,
        });

    } catch (error) {
        console.error(" Ingest Controller Error:", error.message);


        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({ error: "Document ingestion failed: " + error.message });
    }
}
