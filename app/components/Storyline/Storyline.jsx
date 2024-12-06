"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import storyImg from "../../asset/characters/storyImg1.webp";
import storyImg2 from "../../asset/characters/storyImg2.webp";
import storyImg3 from "../../asset/characters/storyImg3.webp";

const Storyline = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAct, setCurrentAct] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [unlockedActs, setUnlockedActs] = useState({});

  const PASSWORDS = {
    act1: "qwerty",
    act2: "qwerty",
    act3: "qwerty",
  };

  useEffect(() => {
    // Load unlocked acts from localStorage
    const storedData = JSON.parse(localStorage.getItem("unlockedActs")) || {};
    setUnlockedActs(storedData);
  }, []);

  const handleOpenModal = (act) => {
    setCurrentAct(act);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPassword("");
    setErrorMessage("");
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (password === PASSWORDS[currentAct]) {
      const updatedUnlockedActs = { ...unlockedActs, [currentAct]: true };
      setUnlockedActs(updatedUnlockedActs);
      localStorage.setItem("unlockedActs", JSON.stringify(updatedUnlockedActs));
      handleCloseModal();
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  const handleToggleLock = (act) => {
    if (unlockedActs[act]) {
      // Lock the act
      const updatedUnlockedActs = { ...unlockedActs };
      delete updatedUnlockedActs[act];
      setUnlockedActs(updatedUnlockedActs);
      localStorage.setItem("unlockedActs", JSON.stringify(updatedUnlockedActs));
    } else {
      // Unlocking requires modal
      handleOpenModal(act);
    }
  };

  const isUnlocked = (act) => unlockedActs[act];

  return (
    <div className="my-[50px]">
      <div className="px-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 2xl:px-8 relative z-10">
        <span className="absolute top-[60px] -left-[70px] -rotate-90 text-[18px] font-mono lg:block hidden text-orange-500 z-10">
          First Edition
        </span>
        <div>
          <div className="md:flex justify-between items-center">
            <h2 className="text-[44px] md:text-[52px] font-normal leading-tight uppercase mb-10 font-wow">
              First <span className="md:block">Edition</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-6 mb-10 md:mb-0">
              {["act1", "act2", "act3"].map((act, index) => (
                <button
                  key={act}
                  className={`btn btn-outline ${
                    isUnlocked(act) ? "btn-success" : "btn-warning"
                  } font-wow font-normal`}
                  onClick={() => handleToggleLock(act)}
                >
                  {isUnlocked(act) ? `Unlocked ACT ${index + 1}` : `Lock ACT ${index + 1} Map`}
                </button>
              ))}
            </div>
          </div>
          {/* Act Content */}
          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            {isUnlocked("act1") && (
              <>
                <div>
                  <h3 className="text-[32px] font-medium">ACT I:</h3>
                  <h5 className="text-[18px] font-semibold mt-4">
                    Shadows at Night
                  </h5>
                  <p className="my-2 text-justify">
                    The bustling streets of Galveston are alight with festive cheer...
                  </p>
                </div>
                <Image
                  src={storyImg}
                  alt="ACT I"
                  width={500}
                  height={500}
                  className="shadow-md rounded lg:-mt-4 w-full"
                />
              </>
            )}
          </div>
          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            {isUnlocked("act2") && (
              <>
                <Image
                  src={storyImg2}
                  alt="ACT II"
                  width={500}
                  height={500}
                  className="shadow-md rounded lg:-mt-4 w-full"
                />
                <div>
                  <h3 className="text-[32px] font-medium">ACT II:</h3>
                  <h5 className="text-[18px] font-semibold mt-4">
                    Galveston’s Night of Secrets
                  </h5>
                  <p className="my-2 text-justify">
                    Galveston’s dark alleys hold more than just shadows...
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            {isUnlocked("act3") && (
              <>
                <div>
                  <h3 className="text-[32px] font-medium">ACT III:</h3>
                  <h5 className="text-[18px] font-semibold mt-4">
                    The Ripper’s Return?
                  </h5>
                  <p className="my-2 text-justify">
                    The body of Abigail Marsh lies in Poe Alley, her lifeless form arranged...
                  </p>
                </div>
                <Image
                  src={storyImg3}
                  alt="ACT III"
                  width={500}
                  height={500}
                  className="shadow-md rounded lg:-mt-4 w-full"
                />
              </>
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 z-50">
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
};

export default Storyline;
