"use client";

import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { Stores } from "@/data/stores";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";

const Storyline = () => {
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAct, setCurrentAct] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [unlockedActs, setUnlockedActs] = useState({});
  const [killerModalOpen, setKillerModalOpen] = useState(false);
  const [killerName, setKillerName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [accuseLocked, setAccuseLocked] = useState(false);

  const PASSWORDS = {
    act1: "FESTIVAL",
    act2: "SERIAL",
    act3: "KILLER",
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("unlockedActs")) || {};
    const storedAccuseLocked =
      JSON.parse(localStorage.getItem("accuseLocked")) || false;

    setUnlockedActs(storedData);
    setAccuseLocked(storedAccuseLocked);
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
      toast.success(`Act ${currentAct} unlocked successfully!`);
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

  const handleKillerSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      setErrorMessage("You must be logged in to submit.");
      return;
    }

    try {
      const response = await fetch("/api/submit-killer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: killerName, email: user.email }),
      });

      if (response.ok) {
        setSuccessMessage("Your submission has been recorded!");
        setKillerName("");
        setAccuseLocked(true);
        localStorage.setItem("accuseLocked", true);
      } else {
        setErrorMessage("Error submitting your entry. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
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
                    isUnlocked(`act${store.actNumber}`)
                      ? "btn-success"
                      : "btn-warning"
                  } font-wow font-normal`}
                  onClick={() => handleToggleLock(`act${store.actNumber}`)}
                >
                  {isUnlocked(`act${store.actNumber}`)
                    ? `Unlocked ACT ${store.actNumber}`
                    : `Lock ACT ${store.actNumber} Map`}
                </button>
              ))}
              <button
                className={`btn btn-outline ${
                  accuseLocked ? "btn-disabled" : "btn-info"
                }`}
                onClick={() => !accuseLocked && setKillerModalOpen(true)}
                disabled={accuseLocked}
              >
                {accuseLocked ? "Accuse (Locked)" : "Accuse"}
              </button>
            </div>
          </div>

          {killerModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-[#444]">
              <div className="relative bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Submit Killer Name
                </h3>
                <form onSubmit={handleKillerSubmit}>
                  <input
                    type="text"
                    placeholder="Enter killer's name..."
                    value={killerName}
                    onChange={(e) => setKillerName(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                  />
                  {successMessage && (
                    <p className="text-green-500 mb-2">{successMessage}</p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500 mb-2">{errorMessage}</p>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                  >
                    Submit
                  </button>
                </form>
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
                  onClick={() => setKillerModalOpen(false)}
                >
                  <IoCloseOutline className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Render Act Content */}
          {Stores.map((store) => (
            <div
              key={store.actNumber}
              className={`space-y-6 mb-20 ${
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

                {store.newspaper && (
                  <div className="mt-6 p-4 bg-gray-100 rounded">
                    <h4 className="text-[18px] font-semibold text-gray-800 mb-2">
                      {store.newspaper.name} - {store.newspaper.publishDate}
                    </h4>
                    <h5 className="font-bold text-gray-600">
                      {store.newspaper.description.tittle}
                    </h5>
                    <p className="text-sm text-gray-700 mb-2">
                      {store.newspaper.description.column1}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      {store.newspaper.description.column2}
                    </p>
                    {store.newspaper.breakingNews && (
                      <div className="p-2 bg-red-100 border-l-4 border-red-500 text-red-800">
                        Breaking News: {store.newspaper.description.column3}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pb-4">
                <a href="/festival-map" className="underline text-blue-400">
                  Go to {`ACT ${store.actNumber}:`} Map
                </a>
              </div>
              <div>
                <a href="/festival-map">
                  <Image
                    src={store.imageUrl}
                    alt={`ACT ${store.actNumber}`}
                    width={500}
                    height={500}
                    className="shadow-md rounded lg:-mt-4 w-full"
                  />
                </a>
              </div>
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
