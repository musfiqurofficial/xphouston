"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";

import mapImg from "../../asset/Mechanic (1080 x 1920 px)/1.png";
import act1Map from "../../asset/Mechanic (1080 x 1920 px)/aCT 1.png";
import act2Map from "../../asset/Mechanic (1080 x 1920 px)/act 2.png";
import act3Map from "../../asset/Mechanic (1080 x 1920 px)/Act 3.png";

const styles = {
  locationCardVisible: {
    display: "block",
  },
};

export default function FestivalMap() {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [unlockedActs, setUnlockedActs] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("unlockedActs")) || {};
    setUnlockedActs(storedData);
  }, []);

  // Location Data
  const locations = {
    Henley: {
      name: "Henley Green - Editor's Office",
      description:
        "Henley Green is the editor's office, filled with old books and mystery novels. A perfect place to uncover clues!",
      password: "Henley",
    },
    Poe: {
      name: "Edgar Allan Poe Alley",
      description:
        "A dimly lit alley named after the famous writer, it hides secrets in its shadows.",
      password: "Poe",
    },
    Fezziwig: {
      name: "Fezziwig Pub",
      description:
        "A bustling pub with hearty laughter, live music, and the smell of roasted meat.",
      password: "Fezziwig",
    },
    Special: {
      name: "Center Square",
      description:
        "The heart of the festival, filled with performers, food stalls, and curious onlookers.",
      password: "Special",
    },
  };

  // Handle button click to show the password prompt
  const handleButtonClick = (locationKey) => {
    setSelectedLocation(locationKey);
    setShowPasswordPrompt(true);
  };

  // Handle password submission
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    if (password === locations[selectedLocation].password) {
      setShowPasswordPrompt(false);
      setLocationInfo(locations[selectedLocation]);
      setIsMapVisible(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect password, please try again.");
    }
    setPassword("");
  };

  const handleCloseModal = () => {
    setShowPasswordPrompt(false);
    setPassword("");
  };

  const handleBackToMap = () => {
    setLocationInfo(null);
    setIsMapVisible(true);
  };

  return (
    <div>
      {/* Main Container */}
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 pt-10">
        <h2 className="max-w-lg mb-4 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto text-center">
          Festival Map
        </h2>

        <center className="my-4">
          <Image
            src={mapImg}
            alt="Festival Map"
            width={800}
            height={800}
            className="w-auto h-[560px]"
          />
        </center>

        <div className=" text-center flex justify-center items-center gap-6 my-10">
          {unlockedActs.act1 && (
            <div>
              <h3 className="text-[24px] font-normal font-wow">ACT I - MAP</h3>
              <Image
                src={act1Map}
                alt="Act 1 Map"
                width={800}
                height={800}
                className="w-auto h-[560px] mx-auto"
              />
            </div>
          )}
          {unlockedActs.act2 && (
            <div>
              <h3 className="text-[24px] font-normal font-wow">ACT II - MAP</h3>
              <Image
                src={act2Map}
                alt="Act 2 Map"
                width={800}
                height={800}
                className="w-auto h-[560px] mx-auto"
              />
            </div>
          )}
          {unlockedActs.act3 && (
            <div>
              <h3 className="text-[24px] font-normal font-wow">
                ACT III - MAP
              </h3>
              <Image
                src={act3Map}
                alt="Act 3 Map"
                width={800}
                height={800}
                className="w-auto h-[560px] mx-auto"
              />
            </div>
          )}
          {!Object.keys(unlockedActs).length && (
            <p className="text-white">
              Unlock acts in the storyline to view maps!
            </p>
          )}
        </div>

        {/* Buttons */}
        {isMapVisible && (
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(locations).map((key) => (
              <button
                key={key}
                onClick={() => handleButtonClick(key)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-[18px] rounded-md py-2 px-4"
              >
                {locations[key].name.split(" - ")[0]}
              </button>
            ))}
          </div>
        )}

        {/* Location Information */}
        {!isMapVisible && locationInfo && (
          <div style={styles.locationCardVisible} className="text-center">
            <h2 className="text-xl text-white font-bold">
              {locationInfo.name}
            </h2>
            <p className="text-gray-100">{locationInfo.description}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleBackToMap}
            >
              Back to Map
            </button>
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <div className="bg-white p-6 rounded shadow-lg relative w-11/12 max-w-md">
            <button
              className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
              onClick={handleCloseModal}
            >
              <IoCloseOutline className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-black text-center">
              Password Protected
            </h3>
            <form onSubmit={handleSubmitPassword}>
              <input
                type="password"
                placeholder="Type Password ..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 p-2 border rounded text-black"
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
