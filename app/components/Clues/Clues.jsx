"use client";

import { clues } from "@/data/clues";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { FaBackspace } from "react-icons/fa";

const Clues = () => {
  const [currentClueIndex, setCurrentClueIndex] = useState(null);
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [letterStatuses, setLetterStatuses] = useState([]);
  const [unlockedClues, setUnlockedClues] = useState(() =>
    Array(clues.length).fill(false)
  );
  const [animatedClueIndex, setAnimatedClueIndex] = useState(null);
  const [isFullScreenImage, setIsFullScreenImage] = useState(false);

  const handleOpenModal = (index) => {
    setCurrentClueIndex(index);
    setPassword("");
    setIsPasswordCorrect(unlockedClues[index]);

    if (!unlockedClues[index]) {
      const letters = clues[index].password.toUpperCase().split("");
      const letterFrequency = {};

      letters.forEach((letter) => {
        letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
      });

      let limitedLetters = [];
      for (const [letter, count] of Object.entries(letterFrequency)) {
        limitedLetters = limitedLetters.concat(Array(count).fill(letter));
      }

      const totalLetters = 15;
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      while (limitedLetters.length < totalLetters) {
        const randomLetter =
          alphabet[Math.floor(Math.random() * alphabet.length)];
        limitedLetters.push(randomLetter);
      }

      const scrambled = limitedLetters.sort(() => Math.random() - 0.5);
      setScrambledLetters(scrambled);

      setLetterStatuses(new Array(scrambled.length).fill("unused"));
    }
  };

  const handleCloseModal = () => {
    setCurrentClueIndex(null);
    setPassword("");
    setIsPasswordCorrect(false);
    setScrambledLetters([]);
    setLetterStatuses([]);
  };

  const handleWordClick = (word, idx) => {
    const newPassword = password + word;
    const normalizedPassword = newPassword.toUpperCase();
    const correctPassword = clues[currentClueIndex].password.toUpperCase();

    setPassword(
      normalizedPassword.slice(0, clues[currentClueIndex].password.length)
    );

    const updatedStatuses = [...letterStatuses];
    updatedStatuses[idx] =
      normalizedPassword === correctPassword.slice(0, normalizedPassword.length)
        ? "correct"
        : "incorrect";

    setLetterStatuses(updatedStatuses);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    const normalizedPassword = password.toUpperCase();
    const correctPassword = clues[currentClueIndex].password.toUpperCase();

    if (normalizedPassword === correctPassword) {
      setIsPasswordCorrect(true);
      setUnlockedClues((prev) => {
        const updated = [...prev];
        updated[currentClueIndex] = true;
        return updated;
      });

      setAnimatedClueIndex(currentClueIndex);
      setTimeout(() => setAnimatedClueIndex(null), 1000);
    } else {
      alert("Incorrect password, please try again!");
      setPassword("");
    }
  };

  const getLetterColor = (letter, idx) => {
    if (letterStatuses[idx] === "correct") {
      return "text-white";
    } else if (letterStatuses[idx] === "incorrect") {
      return "text-black";
    }
    return "text-black";
  };

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <h2 className="text-[32px] text-center mb-6 font-wow">
        Clues
      </h2>
      <div className="md:flex justify-center items-center w-full">
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clues.map((clue, index) => (
            <div
              key={index}
              onClick={() => handleOpenModal(index)}
              className={`flex justify-center items-center rounded-lg w-full md:w-[200px] md:h-[200px] cursor-pointer hover:scale-105 transition-transform ${
                unlockedClues[index]
                  ? `bg-green-500 ${
                      index === animatedClueIndex ? "animate-unlock" : ""
                    }`
                  : clue.color
              }`}
              style={{
                backgroundColor: unlockedClues[index] ? "#4CAF50" : clue.color,
              }}
            >
              <span className="text-[100px] font-light font-wow">
                {unlockedClues[index] ? "✓" : "?"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {currentClueIndex !== null && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className={`bg-white p-6 rounded-[15px] shadow-lg relative w-[90%] md:w-[480px]`}>
            <button
              className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
              onClick={handleCloseModal}
            >
              <IoCloseOutline className="w-5 h-5" />
            </button>

            {!isPasswordCorrect ? (
              <div className="text-center text-gray-600">
                <h3 className="text-2xl font-semibold mb-4 font-comback">
                  Solve the Word Puzzle
                </h3>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {scrambledLetters.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleWordClick(word, idx)}
                      className={`px-3 py-1 rounded text-[20px] ${getLetterColor(
                        word,
                        idx
                      )} ${
                        letterStatuses[idx] === "correct"
                          ? "bg-green-500 text-white"
                          : letterStatuses[idx] === "incorrect"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {word}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={handleSubmitPassword}
                  className="flex justify-between items-center gap-4 mt-10"
                >
                  <div className="relative w-full h-[40px]">
                    <input
                      type="text"
                      placeholder="Password"
                      value={password}
                      readOnly
                      className="w-full h-full px-2 border rounded bg-gray-100 cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setPassword((prev) => prev.slice(0, -1))}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2"
                    >
                      <FaBackspace className="w-5 h-5 hover:text-[#777]" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-1 h-[40px] rounded w-[30%]"
                  >
                    Unlock
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div
                  className="flex justify-center mb-3 cursor-pointer"
                  onClick={() => setIsFullScreenImage(true)}
                >
                  <Image
                    width={500}
                    height={500}
                    src={clues[currentClueIndex].photo}
                    alt={clues[currentClueIndex].name}
                    className="mb-4 w-auto h-[45vh] rounded"
                  />
                </div>
                <h3 className="text-[32px] font-semibold mb-4 text-blue-500 font-mono">
                  {clues[currentClueIndex].name}
                </h3>
                <p className="text-[18px] text-justify">
                  {clues[currentClueIndex].item}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full-Screen Image */}
      {isFullScreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={() => setIsFullScreenImage(false)}
        >
          <Image
            width={800}
            height={800}
            src={clues[currentClueIndex]?.photo}
            alt={clues[currentClueIndex]?.name}
            className="w-auto h-auto max-w-full max-h-[80vh]"
          />
        </div>
      )}
    </div>
  );
};

export default Clues;
