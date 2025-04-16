import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function BudgetEstimator(props) {
  const { selectedPlace } = props;
  const [persons, setPersons] = useState(2);
  const [response, setResponse] = useState("");
  const [duration, setDuration] = useState("");
  const [place, setPlace] = useState(selectedPlace?.Name);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeToVisit, setTimeToVisit] = useState(
    selectedPlace?.BestTimeToVisit
  );

  const handleEstimate = async () => {
    try {
      setIsProcessing(true);

      const payload = {
        duration,
        place_name: place,
        total_persons: persons,
        best_time_to_visit: timeToVisit,
      };

      // const res = await fetch("http://localhost:8000/estimate_budget", {
      const res = await fetch(
        "https://travel-app-server-1.onrender.com/estimate_budget",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      setResponse(data.budget_estimate);
    } catch (err) {
      console.error({ err });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-black">
      <h1 className="text-2xl text-gray-800 font-bold mb-4">
        Tour Budget Estimator
      </h1>

      <form className="mb-4 space-y-2">
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Enter place"
          className="w-full p-2 border rounded"
          required={true}
        />
        <input
          type="text"
          value={timeToVisit}
          onChange={(e) => setTimeToVisit(e.target.value)}
          placeholder="Time to visit"
          className="w-full p-2 border rounded"
          required={true}
        />
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="3 Days, 4 Night"
          className="w-full p-2 border rounded"
          required={true}
        />
        <input
          type="number"
          value={persons}
          onChange={(e) => setPersons(parseInt(e.target.value))}
          placeholder="Number of persons"
          className="w-full p-2 border rounded"
          required={true}
        />
        <button
          onClick={handleEstimate}
          className={
            isProcessing
              ? "bg-blue-600 px-4 py-2 mt-2 rounded !cursor-progress text-white duration-150 italic opacity-40"
              : "bg-blue-600 px-4 py-2 mt-2 rounded hover:bg-blue-700 text-white duration-150"
          }
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Get Estimate"}
        </button>
      </form>

      <div className="prose max-w-none">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
}
