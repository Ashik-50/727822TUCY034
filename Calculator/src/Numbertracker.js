import React, { useState } from "react";

const API_BASE_URL = "http://localhost:9876/numbers"; // Change if needed

export default function NumberTracker() {
  const [numberType, setNumberType] = useState("p");
  const [prevState, setPrevState] = useState([]);
  const [currState, setCurrState] = useState([]);
  const [avg, setAvg] = useState(null);
  const [error, setError] = useState("");

  const fetchNumbers = async () => {
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/${numberType}`);
      const data = await response.json();

      if (response.ok) {
        setPrevState(data.windowPrevState || []);
        setCurrState(data.windowCurrState || []);
        setAvg(data.avg || 0);
      } else {
        setError(data.error || "Failed to fetch numbers");
      }
    } catch (err) {
      setError("Error fetching numbers. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Number Tracker</h1>

      {/* Dropdown for Number Type Selection */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Choose Type:</label>
        <select
          className="px-3 py-2 border rounded"
          value={numberType}
          onChange={(e) => setNumberType(e.target.value)}
        >
          <option value="p">Prime (p)</option>
          <option value="f">Fibonacci (f)</option>
          <option value="e">Even (e)</option>
          <option value="r">Random (r)</option>
        </select>
      </div>

      {/* Fetch Numbers Button */}
      <button
        onClick={fetchNumbers}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Fetch Numbers
      </button>

      {/* Display Error Message */}
      {error && <p className="text-red-500 mt-3">{error}</p>}

      {/* Display Previous & Current State */}
      <div className="mt-6 bg-white p-4 rounded shadow w-full max-w-lg">
        <h2 className="text-lg font-semibold">Previous Window:</h2>
        <p className="text-gray-700">{prevState.length ? prevState.join(", ") : "None"}</p>

        <h2 className="text-lg font-semibold mt-4">Current Window:</h2>
        <p className="text-gray-700">{currState.length ? currState.join(", ") : "None"}</p>

        <h2 className="text-lg font-semibold mt-4">Average:</h2>
        <p className="text-blue-600 font-bold">{avg !== null ? avg.toFixed(2) : "N/A"}</p>
      </div>
    </div>
  );
}
