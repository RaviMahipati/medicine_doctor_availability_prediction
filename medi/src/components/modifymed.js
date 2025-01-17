import React, { useState } from "react";
import axios from "axios";
import './modify.css';  // Import the CSS file here

const ModifyMedCSV = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [rowData, setRowData] = useState("");
  
  // const [modifyKey, setModifyKey] = useState("");
  // const [oldValue, setOldValue] = useState("");
  // const [newValue, setNewValue] = useState("");

  // Define missing states for deleting rows
  const [deleteKey1, setDeleteKey1] = useState("");  // Added state for deleteKey1
  const [deleteValue1, setDeleteValue1] = useState("");  // Added state for deleteValue1
  const [deleteKey2, setDeleteKey2] = useState("");  // Added state for deleteKey2
  const [deleteValue2, setDeleteValue2] = useState("");  // Added state for deleteValue2

  const [loading, setLoading] = useState(false);

  const apiUrl = "http://localhost:5002";

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/search`, {
        params: { key: searchKey, value: searchValue },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Error fetching search results");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRow = async () => {
    setLoading(true);
    try {
      const newRow = JSON.parse(rowData); // Ensure valid JSON
      await axios.post(`${apiUrl}/add-row`, newRow, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Row added successfully!");
    } catch (error) {
      console.error("Error adding row:", error);
      alert("Error adding row");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRow = async () => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/delete-row`, {
        data: {
          key1: deleteKey1,
          value1: deleteValue1,
          key2: deleteKey2,
          value2: deleteValue2,
        },
        headers: { "Content-Type": "application/json" },
      });
      alert("Row deleted successfully!");
    } catch (error) {
      console.error("Error deleting row:", error);
      alert("Error deleting row");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="every-container">
      <h1 className="every-header">CSV Editor</h1>

      {loading && <p className="every-loading">Loading...</p>}

      <div className="every-search-section">
        <h2 className="every-search-title">Search for Value</h2>
        <input
          type="text"
          className="every-input"
          placeholder="Key"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <input
          type="text"
          className="every-input"
          placeholder="Value"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="every-button" onClick={handleSearch}>Search</button>
        <pre className="every-results">{JSON.stringify(searchResults, null, 2)}</pre>
      </div>

      <div className="every-add-row-section">
        <h2 className="every-add-row-title">Add Row</h2>
        <textarea
          rows="4"
          cols="50"
          className="every-textarea"
          placeholder='Row Data (e.g., {"name": "John", "age": 30})'
          value={rowData}
          onChange={(e) => setRowData(e.target.value)}
        ></textarea>
        <button className="every-button" onClick={handleAddRow}>Add Row</button>
      </div>

      <div className="every-delete-row-section">
        <h2 className="every-delete-row-title">Delete Row</h2>
        <input
          type="text"
          className="every-input"
          placeholder="Key 1"
          value={deleteKey1}
          onChange={(e) => setDeleteKey1(e.target.value)}
        />
        <input
          type="text"
          className="every-input"
          placeholder="Value 1"
          value={deleteValue1}
          onChange={(e) => setDeleteValue1(e.target.value)}
        />
        <input
          type="text"
          className="every-input"
          placeholder="Key 2"
          value={deleteKey2}
          onChange={(e) => setDeleteKey2(e.target.value)}
        />
        <input
          type="text"
          className="every-input"
          placeholder="Value 2"
          value={deleteValue2}
          onChange={(e) => setDeleteValue2(e.target.value)}
        />
        <button className="every-button" onClick={handleDeleteRow}>Delete Row</button>
      </div>
    </div>
  );
};

export default ModifyMedCSV;
