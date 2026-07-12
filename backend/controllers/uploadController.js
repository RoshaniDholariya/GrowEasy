const { extractCRMData } = require("../services/geminiService");
const validateCRMRecord = require("../validators/crmValidator");

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { parseCSV } = require("../services/parserService");
const chunk = require("../utils/batch");

// Create uploads directory if it doesn't exist
const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer Upload
const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "text/csv" ||
      file.originalname.toLowerCase().endsWith(".csv")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"));
    }
  },
});

const uploadCSV = [
  upload.single("file"),

  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No CSV uploaded",
        });
      }

      // Absolute path of uploaded file
      const filePath = path.join(uploadDir, req.file.filename);

      // Parse CSV
      const records = await parseCSV(filePath);

      // Create batches
      const batches = chunk(records, 20);

      let imported = [];
      let skipped = [];

      // Process batches
      for (const batch of batches) {
        console.log(`Processing batch (${batch.length} records)...`);

        const aiRecords = await extractCRMData(batch);

        for (const record of aiRecords) {
          const validation = validateCRMRecord(record);

          if (validation.valid) {
            imported.push(record);
          } else {
            skipped.push({
              record,
              reason: validation.errors,
            });
          }
        }
      }

      // Delete uploaded CSV after processing
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(200).json({
        success: true,
        imported,
        skipped,
        stats: {
          totalImported: imported.length,
          totalSkipped: skipped.length,
          imported: imported.length,
          skipped: skipped.length,
        },
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

module.exports = {
  uploadCSV,
};