import React, { useState, useEffect } from "react";
import axios from "axios";

const VisitedPlaces = (props) => {
  const [userId, setUserId] = useState(null);
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId === null) {
      const enteredId = window.prompt("Please enter your User ID:");
      if (enteredId === null || enteredId.trim() === "") {
        setError("No User ID entered. Cannot fetch visited places.");
        setUserId("");
      } else {
        setUserId(enteredId.trim());
      }
    }
  }, []);

  useEffect(() => {
    if (userId && userId !== "") {
      const fetchVisitedPlaces = async () => {
        setLoading(true);
        setError(null);
        setVisitedPlaces([]);

        try {
          let placesData = [];
          const response = await axios.get(
            `http://localhost:8000/get_visited_places/${userId}`
          );

          if (response.data && Array.isArray(response.data.visited_places)) {
            placesData = response.data.visited_places;
          } else if (Array.isArray(response.data)) {
            placesData = response.data;
          } else {
            console.error(
              "API response is not in the expected array format:",
              response.data
            );
            setError("Received invalid data format from server.");
          }

          setVisitedPlaces(placesData);
        } catch (err) {
          console.error("Error fetching visited places:", err);

          if (err.response && err.response.status === 404) {
            setError(`User ID '${userId}' not found or has no visited places.`);
          } else {
            setError(
              "Failed to load visited places. Is the backend server running?"
            );
          }

          setVisitedPlaces([]);
        } finally {
          setLoading(false);
        }
      };

      fetchVisitedPlaces();
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
        Loading visited places for User ID: {userId}...
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto pt-10">
      <h2 className="text-3xl font-bold text-center mb-8 !text-white">
        Places Visited by User {userId}
      </h2>

      <div data-aos="fade-up" className="flex flex-wrap gap-6 justify-center">
        {visitedPlaces.length > 0 ? (
          visitedPlaces.map((place) => (
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

              <div className="p-4">
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
            No visited places found for User ID {userId}.
          </p>
        )}
      </div>
    </div>
  );
};

export default VisitedPlaces;
