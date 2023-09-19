import React, { useState } from "react";
import { useInterval, useMount } from "ahooks";
import {
  MintClips,
  getADFee,
  getLastMintTime,
  getPop,
  getlastPopUpdate,
  getpopOwner,
} from "../Blockchain.Services";
import { useAccount, useNetwork } from "wagmi";
import { setAlert, setGlobalState } from "../store";
import { formatUnits } from "ethers/lib/utils.js";

function format(time) {
  let day = Math.floor(time / (60 * 60 * 24));
  let hours = Math.floor((time / (60 * 60)) % 24);
  let minutes = Math.floor((time / 60) % 60);
  let seconds = Math.floor(time % 60);
  return day + " D " + hours + " H " + minutes + " M " + seconds + " S ";
}
// 42161
const Home = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [countdown, setCountdown] = useState(0);
  const [isfirst, setIsFirt] = useState(false);
  const [ADFee, setADFee] = useState(0);
  const [canMint, setcanMint] = useState(false);
  const [AD, setAD] = useState("FUCK POP");
  const [POPOwner, setPOPOwner] = useState(
    "0x0000000000000000000000000000000000000000"
  );

  //   1683860400
  useInterval(() => {
    if (address === undefined) {
      return;
    }
    if (chain.id !== 42161) {
      setIsFirt(true);
      return;
    }
    getlastPopUpdate().then((res) => {
     
      if (parseInt(res) == 0||res===undefined) {
        
        setIsFirt(true);
      } else {
        setIsFirt(false);
      }

      setCountdown(
        parseInt(res) + 604800 - parseInt(Date.parse(new Date()) / 1000)
      );
    });
  }, 1000);

  useInterval(() => {
    if (address === undefined) {
      return;
    }
    if (chain.id !== 42161) {
      return;
    }
    getADFee(address).then((res) => {
      setADFee(res);
    });
  }, 1000);
  useInterval(() => {
    if (address === undefined) {
      return;
    }
    if (chain.id !== 42161) {
      return;
    }
    getLastMintTime(address).then((res) => {
      if (res === "0") {
        setcanMint(true);
      } else if (
        parseInt(Date.parse(new Date()) / 1000) - 86400 >
        parseInt(res)
      ) {
        setcanMint(true);
      } else {
        setcanMint(false);
      }
    });
  }, 1000);

  useInterval(() => {
    if (chain.id !== 42161) {
      return;
    }
    getPop(address).then((res) => {
      setAD(res);
    });
  }, 1000);
  useInterval(() => {
    if (chain.id !== 42161) {
      return;
    }
    getpopOwner(address).then((res) => {
      setPOPOwner(res);
    });
  }, 1000);

  const handleMintClips = async () => {
    if (address === undefined) {
      setAlert("Connect Wallet", "red");
      return;
    }
    if (chain.id !== 42161) {
      setAlert("Switch the Network", "red");
      return;
    }
    if (!canMint) {
      setAlert("TimeLocked", "red");
      return;
    }
    setGlobalState("loading", {
      show: true,
      msg: "MintPopular...",
    });
    try {
      await MintClips(address);
      setAlert("MintPopular Success!", "green");
      window.location.reload();
    } catch (error) {
      setAlert("MintPopular Cancelled!", "red");
    }
  };
  const handleAD = () => {
    if (address === undefined) {
      setAlert("Connect Wallet", "red");
      return;
    }
    if (chain.id !== 42161) {
      setAlert("Switch the Network", "red");
      return;
    }
    setGlobalState("modal", "scale-100");
  };
  return (
    <div className="flex flex-col items-center p-10 mt-[60px] md:mt-[20px]">
      <div className="text-lg md:text-2xl text-white font-black text-center ">
        PRIZEPOOL: 50,000,000,000 $POP
      </div>
      <div className="text-white font-black text-center text-lg md:text-2xl">
        POPULAR OWNER 👇: {POPOwner?.slice(0, 4)}...{POPOwner?.slice(38, 42)}
      </div>
      <div className="text-transparent bg-gradient-to-r from-[#00ffa0] via-[#69b6ff] to-[#cd14ff] bg-clip-text font-black text-6xl md:text-12xl lg:text-9xl text-center my-12 uppercase break-words max-w-[90vw] md:max-w-[90vw]">
        {AD==="FUCK POP"?"Team without reservation":AD}
      </div>
      <div className="">
        <p className="text-white text-center text-xl mb-2 ">
          OWNER CAN CLAIM PRIZEPOOL IN:
        </p>
        <p className="text-white text-center text-6xl font-black  mb-2 ">
          {countdown <= 0 ? (isfirst ? "Please Launch" : "Unlocked") : format(countdown)}
        </p>
      </div>
      <button
      disabled
        className="btn-gradient mt-4 self-center w-full md:w-auto cursor-pointer text-white"
        onClick={handleMintClips}
      >
        Free MINT 5,000,000 $POP
      </button>
      <button
      disabled
        className="btn-gradient mt-4 self-center w-full md:w-auto text-white"
        onClick={handleAD}
      >
        TAKEOVER POPULAR for {ADFee === undefined ? "0.0" : formatUnits(ADFee)}{" "}
        $POP
      </button>
    </div>
  );
};

export default Home;
