const PDFDocument = require("pdfkit");

const buildPdfBuffer = async (writer) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    writer(doc);
    doc.end();
  });
};

module.exports = { buildPdfBuffer };
