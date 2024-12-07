"use client";

import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { Stores } from "@/data/stores";

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
      const updatedUnlockedActs = { ...unlockedActs };
      delete updatedUnlockedActs[act];
      setUnlockedActs(updatedUnlockedActs);
      localStorage.setItem("unlockedActs", JSON.stringify(updatedUnlockedActs));
    } else {
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
              {Stores.map((store, index) => (
                <button
                  key={store.actNumber}
                  className={`btn btn-outline ${
                    isUnlocked(`act${store.actNumber}`) ? "btn-success" : "btn-warning"
                  } font-wow font-normal`}
                  onClick={() => handleToggleLock(`act${store.actNumber}`)}
                >
                  {isUnlocked(`act${store.actNumber}`)
                    ? `Unlocked ACT ${store.actNumber}`
                    : `Lock ACT ${store.actNumber} Map`}
                </button>
              ))}
              <button className="btn btn-outline btn-info">Accuse</button>
            </div>
          </div>

          {/* Render Act Content */}
          {Stores.map((store) => (
            <div
              key={store.actNumber}
              className={`grid lg:grid-cols-2 gap-10 mb-20 ${
                isUnlocked(`act${store.actNumber}`) ? "block" : "hidden"
              }`}
            >
              <div>
                <h3 className="text-[32px] font-medium">{`ACT ${store.actNumber}:`}</h3>
                <h5 className="text-[18px] font-semibold mt-4">{store.name}</h5>
                <p className="my-2 text-justify">{store.story}</p>
                <h5 className="text-[18px] font-semibold mt-4">Objective:</h5>
                <p className="my-2 text-justify">{store.objective}</p>
                <h5 className="text-[18px] font-semibold mt-4">Newspaper:</h5>
                <p className="my-2">
                  <strong>{store.newspaper.name}</strong> -{" "}
                  <em>{store.newspaper.publishDate}</em>
                </p>
                <p className="my-2">{store.newspaper.description.tittle}</p>
              </div>
              <Image
                src={store.imageUrl}
                alt={`ACT ${store.actNumber}`}
                width={500}
                height={500}
                className="shadow-md rounded lg:-mt-4 w-full"
              />
            </div>
          ))}
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
