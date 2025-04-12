import React, { useState, useEffect } from "react";
import axios from "axios";

const Destinations = (props) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:8000/get_all_destinations"
        );

        if (response.data && Array.isArray(response.data.destinations)) {
          setDestinations(response.data.destinations);
        } else if (Array.isArray(response.data)) {
          setDestinations(response.data);
        } else {
          console.error(
            "API response is not in the expected format:",
            response.data
          );
          setError("Received invalid data format from server.");
          setDestinations([]);
        }
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError("Failed to load destinations. Is the backend server running?");
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading destinations...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 !text-white">
        Explore Destinations
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <div
              key={destination.DestinationID}
              className="bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-[45%] md:w-[30%] lg:w-[23%] border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gray-200 rounded flex items-center justify-center text-gray-400">
                <img
                  className="h-full object-cover object-center"
                  src={destination.ImageURL}
                  alt={destination.Name}
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold mb-2 text-blue-600">
                  <span>ID: </span>
                  {destination.DestinationID}
                </h3>
                <h3 className="text-xl font-semibold mb-2 text-blue-600">
                  {destination.Name || "Unnamed Destination"}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {destination.State || "Location unknown"}
                </p>
                <p className="text-gray-700 text-sm">
                  <span>Best time to visit: </span>
                  {destination.BestTimeToVisit || "No description available."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No destinations found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Destinations;
