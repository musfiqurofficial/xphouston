"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import map from "../../asset/Mechanic (1080 x 1920 px)/1.png";
import act1Map from "../../asset/Mechanic (1080 x 1920 px)/aCT 1.png";
import act2Map from "../../asset/Mechanic (1080 x 1920 px)/act 2.png";
import act3Map from "../../asset/Mechanic (1080 x 1920 px)/Act 3.png";

const FestivalMap = () => {
  const [unlockedActs, setUnlockedActs] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("unlockedActs")) || {};
    setUnlockedActs(storedData);
  }, []);

  const renderActMap = () => {
    if (unlockedActs.act3) {
      return (
        <div>
          <h3 className="text-[24px] font-normal font-wow">ACT III - MAP</h3>
          <Image
            src={act3Map}
            alt="Act 3 Map"
            width={800}
            height={800}
            className="w-auto h-[560px] mx-auto"
          />
        </div>
      );
    }
    if (unlockedActs.act2) {
      return (
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
      );
    }
    if (unlockedActs.act1) {
      return (
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
      );
    }
    return (
      <p className="text-white">Unlock acts in the storyline to view maps!</p>
    );
  };

  return (
    <div>
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 pt-10">
        <h2 className="max-w-lg mb-4 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto text-center">
          Festival Map
        </h2>
        
        <div className="text-center my-10">{renderActMap()}</div>
      </div>
    </div>
  );
};

export default FestivalMap;
