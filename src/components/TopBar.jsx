import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInterval } from "ahooks";
import { useAccount, useNetwork } from "wagmi";
import { getClipsTokenBalance } from "../Blockchain.Services";
import menu from "../assets/menu.svg";
import logo from "../assets/logo.png";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatUnits } from "ethers/lib/utils.js";

const navlinks = [
  {
    name: "how-to-play",
    link: "/how-to-play",
  },
];

const Icon = ({ styles, name, isActive, disabled, handleClick }) => (
  <p className=" text-[20px] text-white  cursor-pointer" onClick={handleClick}>
    {name}
  </p>
);
const TopBar = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [ClipsTokenBalance, setClipsTokenBalance] = useState(0);

  const navigate = useNavigate();
  const [toggleDrawer, setToggleDrawer] = useState(false);
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
  return (
    <div className="flex  md:flex-row flex-col justify-between px-8 pt-4 ">
      <img
        src={logo}
        alt="logo"
        className="w-[64px] md:flex hidden cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="md:flex hidden items-center gap-6 ml-[30px] ">
        {navlinks.map((link) => (
          <Icon
            key={link.name}
            {...link}
            // isActive={isActive}
            handleClick={() => {
              // setIsActive(link.name);
              navigate(link.link);
            }}
          />
        ))}
        <div className=" text-[20px] text-white cursor-pointer  ">
            {ClipsTokenBalance===undefined?"0.0":formatUnits(ClipsTokenBalance)} $POP</div>
        <ConnectButton />
      </div>

      {/* 手机 */}
      <div className="md:hidden flex justify-between items-center relative">
        <img
          src={logo}
          alt="logo"
          className="w-[48px] cursor-pointer"
          onClick={() => navigate("/")}
        />

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary  ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700  rounded-xl  `}
        >
          <ul className="mb-4 font-rajdhani font-bold text-white text-lg">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4  `}
                onClick={() => {
                  // setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] cursor-pointer`}
                >
                  {link.name}
                </p>
              </li>
            ))}
            <p
              className={`p-4 ml-[20px] font-epilogue font-semibold text-[14px] cursor-pointer`}
            >
             {ClipsTokenBalance===undefined?"0.0":formatUnits(ClipsTokenBalance)} $POP
            </p>
          </ul>

          <div className="flex mx-4 mb-6">
            {/* 登录按钮 */}
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
