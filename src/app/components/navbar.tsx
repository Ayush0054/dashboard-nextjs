"use client";

import React from "react";
import logo from "public/assets/logo/logo.png";
import saasden from "public/assets/logo/SaasDen.png";
import pfp from "public/assets/icons/pfp.png";
import Image from "next/image";
import MessageIcon from "./icons/message";
import BellIcon from "./icons/bell";
import SearchIcon from "./icons/search";
function Navbar() {
  return (
    <div className=" flex justify-between mb-2 p-2 bg-[#fcfcfc]">
      <div className=" flex items-center gap-1">
        <Image src={logo} alt="" />
        <Image src={saasden} alt="" />
      </div>
      <div className=" flex items-center border-slate-300 p-1 border-2 w-4/6 rounded-xl hover:border-slate-400">
        <SearchIcon />
        <input
          type="text"
          placeholder="Type to search"
          className=" outline-none border-none p-1 w-full text-gray-300 placeholder-gray-700"
        />
      </div>
      <div className=" flex items-center justify-between gap-3">
          <MessageIcon/>
             <BellIcon/>
        <Image src={pfp} alt=""/>
      </div>
    </div>
  );
}

export default Navbar;
