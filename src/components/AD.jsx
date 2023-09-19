import { useGlobalState, setGlobalState, setAlert } from "../store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAccount, useNetwork } from "wagmi";
import { parseUnits } from "ethers/lib/utils.js";
import { IoLogoGithub } from "react-icons/io5";
import { useInterval } from "ahooks";
import {
  Approve,
  getADFee,
  getAllowance,
  getClipsTokenBalance,
  setPop,
} from "../Blockchain.Services";

const AD = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [modal] = useGlobalState("modal");
  const [message, setMessage] = useState("");
  const [ADFee, setADFee] = useState(0);
  const [needApprove, setNeedApprove] = useState(true);
  const [ClipsTokenBalance, setClipsTokenBalance] = useState(0);
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
    getAllowance(address).then((res) => {
      if (parseInt(res) < parseInt(ADFee)) {
        setNeedApprove(true);
      } else {
        setNeedApprove(false);
      }
    });
  }, 1000);
  useInterval(() => {
    if (address === undefined) {
      return;
    }
    if (chain.id !== 42161) {
      return;
    }
    getClipsTokenBalance(address).then((res) => {
      setClipsTokenBalance(res);
    });
  }, 1000);



  const handleAD = async () => {
    if (needApprove) {
      setGlobalState("loading", {
        show: true,
        msg: "APPROVE...",
      });
      try {
        await Approve(address, ADFee);
        setAlert("Approve Success!", "green");
      } catch (error) {
        setAlert("Approve Cancelled", "red");
      }
    } else {
      if (message.length == 0) {
        setAlert("Message can noe be Null!", "red");
      } else {
        setGlobalState("showModal", "scale-0");
        setGlobalState("loading", {
          show: true,
          msg: "SetPop...",
        });
        try {
          await setPop(address, message);
          setAlert("SetPop Success!", "green");
          window.location.reload();
        } catch (error) {
          setAlert("SetPop Cancelled", "red");
        }
      }
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 ${modal}`}
    >
      <div className="bg-[#394150]  rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 ">
        <div className="flex flex-row justify-end items-center">
          <button
            type="button"
            onClick={() => setGlobalState("modal", "scale-0")}
            className="border-0 bg-transparent  focus:outline-none"
          >
            <FaTimes className="text-gray-400" />
          </button>
        </div>

        <p className=" text-3xl font-black text-center text-white mb-6 ">
          TAKEOVER THE POP
        </p>
        <p className="text-white text-xl mb-8">
          Takeover the POP by setting the homepage message. If nobody else
          takes it from you, you can claim the prizepool in 3 days...
          <br />
          <br />
          If you already own the POP, you can change the message as many times
          as you want for free, and it won't reset the countdown.
        </p>

        <div className=" bg-gray-800 rounded-xl mt-5">
          <input
            className="block w-full text-lg pl-6 h-[50px] 
                  bg-transparent border-0 
                   focus:outline-none focus:ring-0 text-white"
            placeholder="Enter YOUR MESSAGE"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="text-white text-xl">
          Character Count: {message.length} / 26
        </div>

        <button
        disabled={parseInt(ClipsTokenBalance)<parseInt(ADFee)}
          onClick={handleAD}
          className="btn-primary w-full mt-[20px] cursor-pointer text-white"
        >
          {needApprove ?parseInt(ClipsTokenBalance)<parseInt(ADFee)?"Insufficient POP Balance": "APPROVE" : "LAUNCH"}
        </button>
      </div>
    </div>
  );
};

export default AD;
