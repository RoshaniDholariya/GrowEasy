const fs = require("fs");
const Papa = require("papaparse");

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const csvFile = fs.readFileSync(filePath, "utf8");

      const result = Papa.parse(csvFile, {
        header: true,
        skipEmptyLines: true,
      });

      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  parseCSV,
};