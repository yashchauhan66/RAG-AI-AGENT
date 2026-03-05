import fs from "fs";
import { createRequire } from "module";


const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

const loadPDF = async (filePath) => {
    const buffer = fs.readFileSync(filePath);

   
    if (pdf.PDFParse) {
        const parser = new pdf.PDFParse({ data: buffer });
        const result = await parser.getText();
        return result.text;
    }


    const parse = typeof pdf === 'function' ? pdf : pdf.default;
    if (typeof parse === 'function') {
        const data = await parse(buffer);
        return data.text;
    }

    throw new Error("Could not find a valid pdf-parse implementation");
};

export default loadPDF;