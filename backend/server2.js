const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const csv = require("csv-parser");
const { parse } = require("json2csv");

const app = express();
const PORT = 5002;

const CSV_FILE_PATH = "./Medicine_Avaibility.csv"; // Path to your CSV file

app.use(cors());
app.use(bodyParser.json());

// Function to read CSV
const readCSV = () => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => resolve(results))
      .on("error", (error) => {
        console.error("Error reading CSV:", error);
        reject(error);
      });
  });
};

// Function to write CSV with headers
const writeCSV = (data) => {
  try {
    const csvData = parse(data, { header: true });
    fs.writeFileSync(CSV_FILE_PATH, csvData, "utf8");
  } catch (error) {
    console.error("Error writing CSV:", error);
    throw error;
  }
};

// Search Route
app.get("/search", async (req, res) => {
  const { key, value } = req.query;
  try {
    const data = await readCSV();
    const results = data.filter((row) => row[key] && row[key] === value);
    res.json(results);
  } catch (error) {
    console.error("Error in /search:", error);
    res.status(500).json({ error: "Error reading the CSV file" });
  }
});

// Add Row Route
app.post("/add-row", async (req, res) => {
  const newRow = req.body;
  try {
    const data = await readCSV();
    data.push(newRow);
    writeCSV(data);
    res.status(200).json({ message: "Row added successfully" });
  } catch (error) {
    console.error("Error in /add-row:", error);
    res.status(500).json({ error: "Error adding row to CSV file" });
  }
});

// Modify Column Route
app.put("/modify-column", async (req, res) => {
  const { key1, value1, key2, value2, targetKey, newValue } = req.body;

  try {
    const data = await readCSV();
    
    // Iterate through the rows and modify the target column if both conditions match
    data.forEach((row) => {
      if (row[key1] === value1 && row[key2] === value2) {
        row[targetKey] = newValue;
      }
    });
    
    writeCSV(data);
    res.status(200).json({ message: "Column updated successfully" });
  } catch (error) {
    console.error("Error in /modify-column:", error);
    res.status(500).json({ error: "Error modifying column in CSV file" });
  }
});


// Add Column Route
app.post("/add-column", async (req, res) => {
  const { columnName, defaultValue } = req.body;
  try {
    const data = await readCSV();
    data.forEach((row) => {
      row[columnName] = defaultValue;
    });
    writeCSV(data);
    res.status(200).json({ message: "Column added successfully" });
  } catch (error) {
    console.error("Error in /add-column:", error);
    res.status(500).json({ error: "Error adding column to CSV file" });
  }
});

// Delete Row Route
app.delete("/delete-row", async (req, res) => {
  const { key1, value1, key2, value2 } = req.body;

  try {
    const data = await readCSV();
    const filteredData = data.filter(
      (row) => !(row[key1] === value1 && row[key2] === value2)
    );

    if (filteredData.length === data.length) {
      return res.status(404).json({ error: "Row not found" });
    }

    writeCSV(filteredData);
    res.status(200).json({ message: "Row deleted successfully" });
  } catch (error) {
    console.error("Error in /delete-row:", error);
    res.status(500).json({ error: "Error deleting row from CSV file" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
