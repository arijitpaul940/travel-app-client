import React, { useState, useEffect } from "react";
import axios from "axios";

import { Modal, BudgetEstimator } from "../../components";

function RecommendedPlaces() {
  const [userId, setUserId] = useState(null);
  const [recommendedPlaces, setRecommendedPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isBudgetPlannerOpen, setIsBudgetPlannerOpen] = useState(false);

  useEffect(() => {
    if (userId === null) {
      const enteredId = window.prompt(
        "Please enter your User ID to get recommendations:"
      );
      if (enteredId === null || enteredId.trim() === "") {
        setError("No User ID entered. Cannot fetch recommendations.");
        setUserId("");
      } else {
        setUserId(enteredId.trim());
      }
    }
  }, []);

  useEffect(() => {
    if (userId && userId !== "") {
      const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        setRecommendedPlaces([]);
        try {
          let placesData = [];
          const response = await axios.get(
            `http://localhost:8000/recommendations/${userId}`
          );

          if (response.data && Array.isArray(response.data.recommendations)) {
            placesData = response.data.recommendations;
          } else if (Array.isArray(response.data)) {
            placesData = response.data;
          } else {
            console.error(
              "API response is not in the expected array format:",
              response.data
            );
            setError("Received invalid data format from server.");
          }

          setRecommendedPlaces(placesData);
        } catch (err) {
          console.error("Error fetching recommendations:", err);

          if (err.response && err.response.status === 404) {
            setError(
              `User ID '${userId}' not found or no recommendations available.`
            );
          } else {
            setError(
              "Failed to load recommendations. Is the backend server running?"
            );
          }

          setRecommendedPlaces([]);
        } finally {
          setLoading(false);
        }
      };

      fetchRecommendations();
    }
  }, [userId]);

  if (userId === null || userId === "") {
    return error ? (
      <div className="text-center p-10 text-orange-600">{error}</div>
    ) : (
      <div className="text-center p-10">Waiting for User ID...</div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-10">
        Loading recommendations for User ID: {userId}...
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 !text-white">
        Recommended Places for User {userId}
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {recommendedPlaces.length > 0 ? (
          recommendedPlaces.map((place) => (
            <div
              key={place.DestinationID}
              className="bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-[45%] md:w-[30%] lg:w-[23%] border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gray-200 rounded flex items-center justify-center text-gray-400">
                <img
                  className="h-full object-cover object-center"
                  src={place.ImageURL}
                  alt={place.Name}
                />
              </div>

              <div className="p-4 relative">
                <button
                  title="Tell me budget"
                  className="absolute top-4 right-4"
                  onClick={() => {
                    setSelectedPlace(place);
                    setIsBudgetPlannerOpen(true);
                  }}
                >
                  <i className="fa-solid fa-brain text-xl text-gray-800"></i>
                </button>
                <h3 className="text-sm font-semibold mb-2 text-blue-600">
                  <span>ID: </span>
                  {place.DestinationID}
                </h3>
                <h3 className="text-xl font-semibold mb-2 text-blue-600">
                  {place.Name || "Unnamed place"}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {place.State || "Location unknown"}
                </p>
                <p className="text-gray-700 text-sm">
                  <span>Best time to visit: </span>
                  {place.BestTimeToVisit || "No description available."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            No recommendations found for User ID {userId}. Perhaps explore more
            or visit some places first!
          </p>
        )}
      </div>

      <Modal
        title={"Budget Planner"}
        isOpen={isBudgetPlannerOpen}
        onClose={() => setIsBudgetPlannerOpen(false)}
      >
        <BudgetEstimator selectedPlace={selectedPlace} />
      </Modal>
    </div>
  );
}

export default RecommendedPlaces;
