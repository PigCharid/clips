import React from "react";
import { LightSpeed, Bounce, Fade, Flip } from "react-reveal";

const Play = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen py-8 max-w-2xl mx-auto px-[10px] text-white">
      <Bounce>
        <h1 className="text-2xl md:text-4xl font-black uppercase mb-4 text-transparent bg-gradient-to-r from-[#00ffa0] via-[#69b6ff] to-[#cd14ff] bg-clip-text ">
          How to play
        </h1>
      </Bounce>

      <p className="mt-3 text-base md:text-2xl text-left">
        💸 Total supply of
        <span className="font-black text-[#9869ff]"> $POP </span>
        is 220b
      </p>
      <p class="mt-3 text-base md:text-2xl text-left">
        💸 50b in the PRIZEPOOL up for grabs
      </p>
      <p class="mt-3 text-base md:text-2xl text-left">
        💸 150b in the contract to be minted free
      </p>
      <p class="mt-3 text-base md:text-2xl text-left">
        {" "}
        💸 20b for adding liquidity
      </p>
      <p class="mt-3 text-base md:text-2xl text-left ">
        {" "}
        💸 <span class="font-black text-[#cd14ff]">0 for team allocation</span>
       
      </p>
      <p class="mt-3 text-base md:text-2xl text-left">
        💸 You can mint<span class="font-black text-[#9869ff]"> $POP </span>
        for free, once every 24 hours
      </p>
      <p class="mt-3 text-base md:text-2xl">
        💸 The 1st mint gives you 5m
        <span class="font-black text-[#9869ff]"> $POP</span>, then 2.5m, etc{" "}
      </p>
      <p class="mt-3 text-base md:text-2xl">
        👉 The <span class="font-black text-[#cd14ff]">POPULAR</span> is the
        colorful message on the homepage
      </p>
      <p class="mt-3 text-base md:text-2xl">
        👉 The <span class="font-black text-[#cd14ff]">POPULAR</span> can be set by
        spending<span class="font-black text-[#9869ff]"> $POP</span>
      </p>
      <p class="mt-3 text-base md:text-2xl">
        👉 The cost of setting the first{" "}
        <span class="font-black text-[#cd14ff]">POPULAR</span> is 250k
        <span class="font-black text-[#9869ff]"> $POP </span>
      </p>
      <p class="mt-3 text-base md:text-2xl">
        👉 The cost of taking over the{" "}
        <span class="font-black text-[#cd14ff]">POPULAR</span> is the last cost +
        50%
      </p>
      <p class="mt-3 text-base md:text-2xl">
        👉 The current owner can overwrite the{" "}
        <span class="font-black text-[#cd14ff]">POPULAR</span> for free
      </p>
      <p class="mt-3 text-base md:text-2xl">
        🔥 The spent<span class="font-black text-[#9869ff]"> $POP </span>is
        BURNED
      </p>
      <p class="mt-3 text-base md:text-2xl">
        👉 After 7 days the <span class="font-black text-[#cd14ff]">POPULAR</span>{" "}
        owner can claim the PRIZEPOOL
      </p>
      <p class="mt-3 text-base md:text-2xl">
        👉 The countdown <span class="font-black">restarts</span> if anyone else
        takes over
      </p>
      <p class="mt-4">Happy popularizing.</p>
    </div>
  );
};

export default Play;
