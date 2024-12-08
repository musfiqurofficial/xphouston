import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";

import enemies from "../../asset/boxing-gloves.png";
import history from "../../asset/parchment.png";
import alibi from "../../asset/clock.png";
import friend from "../../asset/laugh.png";
import History from "./History";
import Alibi from "./Alibi";
import Enemies from "./Enemies";
import Friend from "./Friend";
import { FaBackspace } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

const CharacterModal = ({ isOpen, closeModal, character }) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const passwordInputRef = useRef(null); 
  const [scrambledLetters, setScrambledLetters] = useState([]);
const [letterStatuses, setLetterStatuses] = useState([]);

useEffect(() => {
  if (isPasswordModalOpen) {
    const password = "QWERT"; // Set your password here
    const letters = password.split("");
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const allLetters = [...letters];

    // Add random letters to fill up the grid
    while (allLetters.length < 12) {
      allLetters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }

    // Shuffle the letters randomly
    setScrambledLetters(allLetters.sort(() => Math.random() - 0.5));
    setLetterStatuses(new Array(allLetters.length).fill("unused"));
  }
}, [isPasswordModalOpen]);

const handleLetterClick = (letter, idx) => {
  const newPassword = password + letter;
  setPassword(newPassword);

  const passwordToMatch = "QWERT";
  const isCorrect = passwordToMatch.startsWith(newPassword);

  const updatedStatuses = [...letterStatuses];
  updatedStatuses[idx] = isCorrect ? "correct" : "incorrect";
  setLetterStatuses(updatedStatuses);

  if (isCorrect && newPassword === passwordToMatch) {
    setIsAuthenticated(true);
  }
};

const getLetterColor = (status) => {
  switch (status) {
    case "correct":
      return "bg-green-500 text-white";
    case "incorrect":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-200 text-black";
  }
};


  const openPasswordModal = (option) => {
    setSelectedOption(option);
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPassword("");
    setIsAuthenticated(false);
  };

  const handlePasswordSubmit = () => {
    if (password === "qwert") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  // Focus on the password input when the modal opens
  useEffect(() => {
    if (isPasswordModalOpen && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [isPasswordModalOpen]);

  // Handle Enter key for form submission
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 backdrop-blur-lg bg-[black]/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full overflow-auto">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-[#ff3838] hover:text-gray-400"
          >
            X
          </button>
          {character && (
            <div className="text-center">
              <h2 className="text-[28px] font-wow text-gray-700 uppercase mb-4">
                {character.name}
              </h2>
              <center className="">
                <Image
                  src={character.img}
                  alt={character.name}
                  width={500}
                  height={500}
                  className="w-[160px] object-cover rounded-lg mb-4 border-[10px] border-x-yellow-300 shadow-lg"
                />
              </center>
              {/* <p className="text-gray-600 text-[22px] font-comback">
                {character.designation}
              </p> */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                {["History", "Alibi", "Friend", "Enemies"].map(
                  (option, index) => (
                    <div
                      key={option}
                      className="bg-[#EDEADE] py-3 rounded-xl shadow cursor-pointer hover:shadow-xl"
                      onClick={() => openPasswordModal(option)}
                    >
                      <center>
                        <Image
                          src={
                            option === "History"
                              ? history
                              : option === "Alibi"
                              ? alibi
                              : option === "Friend"
                              ? friend
                              : enemies
                          }
                          alt={option}
                          width={150}
                          height={150}
                          className="w-auto h-[35px]"
                        />
                      </center>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </DialogPanel>
      </div>

      {/* Password Modal */}
      <Dialog
        open={isPasswordModalOpen}
        onClose={closePasswordModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 backdrop-blur-md bg-[black]/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <button
              className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
              onClick={closePasswordModal}
            >
              <IoCloseOutline className="w-5 h-5" />
            </button>
            {!isAuthenticated ? (
              <div className="text-center">
                {/* add here word puzzle base on password. */}
                <h2 className="text-xl font-bold mb-4 text-black">Solve the Word Puzzle</h2>
  <div className="flex flex-wrap justify-center gap-2 mb-4">
    {scrambledLetters.map((letter, idx) => (
      <button
        key={idx}
        onClick={() => handleLetterClick(letter, idx)}
        className={`px-3 py-2 rounded text-lg ${getLetterColor(letterStatuses[idx])}`}
      >
        {letter}
      </button>
    ))}
  </div>
                <form 
                  className="flex justify-between items-center gap-4 mt-10"
                >
                  <div className="relative w-full h-[40px]">
                    <input
                      type="text"
                      placeholder="Password"
                      value={password}
                      readOnly
                      className="w-full h-full px-2 border rounded text-gray-700 bg-gray-100 cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setPassword((prev) => prev.slice(0, -1))}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2"
                    >
                      <FaBackspace className="w-5 h-5 text-[#444] hover:text-[#555]" />
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
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">{selectedOption}</h2>
                <p className="text-gray-600">
                  {selectedOption === "History" ? (
                    <History character={character} />
                  ) : selectedOption === "Alibi" ? (
                    <Alibi character={character} />
                  ) : selectedOption === "Friend" ? (
                    <Friend character={character} />
                  ) : selectedOption === "Enemies" ? (
                    <Enemies character={character} />
                  ) : (
                    "Invalid Option"
                  )}
                </p>

                <button
                  onClick={closePasswordModal}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </Dialog>
  );
};

export default CharacterModal;
