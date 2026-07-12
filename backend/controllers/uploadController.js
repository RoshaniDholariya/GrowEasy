const { extractCRMData } = require("../services/geminiService");
const validateCRMRecord = require("../validators/crmValidator");

const multer = require("multer");

const path = require("path");

const { parseCSV } = require("../services/parserService");
const chunk = require("../utils/batch");
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  },

});
const upload = multer({

  storage,

  fileFilter: (req, file, cb) => {

    if (
      file.mimetype === "text/csv" ||
      file.originalname.endsWith(".csv")
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

      // Parse CSV
      const records = await parseCSV(req.file.path);

      // Create batches
      const batches = chunk(records, 20);

      let imported = [];
      let skipped = [];

      // Process each batch
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