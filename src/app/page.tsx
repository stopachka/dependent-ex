"use client";

import { db } from "@/lib/db";
import { useState } from "react";

function App() {
  const [selectedStateId, setSelectedStateId] = useState<string>("");

  // Query all states
  const {
    isLoading: statesLoading,
    error: statesError,
    data: statesData,
  } = db.useQuery({
    states: {},
  });

  // Query cities for the selected state
  const {
    isLoading: citiesLoading,
    error: citiesError,
    data: citiesData,
  } = db.useQuery(
    selectedStateId
      ? {
          cities: {
            $: { where: { state: selectedStateId } },
          },
        }
      : null,
  );

  if (statesLoading) return null;
  if (statesError) return statesError.message;

  const states = statesData?.states || [];
  const cities = citiesData?.cities || [];

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white border-2 border-gray-200 rounded-lg p-8 w-[600px]">
        <div className="grid grid-cols-2 gap-6">
          {/* State Select */}
          <div className="flex flex-col gap-2">
            <label className="text-4xl font-bold text-gray-900">State</label>
            <select
              className="h-14 px-4 border-2 border-blue-500 rounded-lg text-2xl outline-none focus:border-blue-600"
              value={selectedStateId}
              onChange={(e) => setSelectedStateId(e.target.value)}
            >
              <option value="">Select a state...</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City Select */}
          <div className="flex flex-col gap-2">
            <label className="text-4xl font-bold text-gray-900">City</label>
            {!selectedStateId ? (
              <div className="h-14 px-4 border-2 border-gray-300 rounded-lg text-2xl flex items-center text-gray-400 bg-gray-50">
                Select a state first...
              </div>
            ) : citiesLoading ? (
              <div className="h-14 px-4 border-2 border-gray-300 rounded-lg text-2xl flex items-center text-gray-400 bg-gray-50">
                Loading...
              </div>
            ) : citiesError ? (
              <div className="h-14 px-4 border-2 border-red-500 rounded-lg text-xl flex items-center text-red-500">
                Error loading cities
              </div>
            ) : (
              <select
                className="h-14 px-4 border-2 border-gray-300 rounded-lg text-2xl outline-none focus:border-blue-600"
                disabled={cities.length === 0}
              >
                <option value="">
                  {cities.length === 0 ? "No cities found" : "Select a city..."}
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
