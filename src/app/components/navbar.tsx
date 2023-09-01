

import React from "react";
import { useSession } from "next-auth/react";
import logo from "public/assets/logo/logo.png";
import saasden from "public/assets/logo/SaasDen.png";
import Image from "next/image";
import MessageIcon from "./icons/message";
import BellIcon from "./icons/bell";
import SearchIcon from "./icons/search";
import { GiHamburgerMenu } from "react-icons/gi";
type Props = {
  showSidebar: any;
  setShowSidebar: any;
};
function Navbar({ setShowSidebar, showSidebar }: Props) {
  const { data: session } = useSession();
  return (
    <div className=" flex justify-between mb-2 p-2 bg-[#fcfcfc]">
      <div className=" flex items-center gap-1">
        <Image src={logo} alt="" />
        <Image src={saasden} alt="" />
      </div>
      <div className=" hidden lg:flex items-center border-slate-300 p-1 border-2 lg:w-4/6 w-1/5 rounded-xl hover:border-slate-400">
        <SearchIcon />
        <input
          type="text"
          placeholder="Type to search"
          className=" outline-none border-none p-1 lg:w-full w-1/6 text-gray-800 placeholder-gray-700"
        />
      </div>
      <div className=" flex items-center justify-between gap-3">
        <MessageIcon />
        <BellIcon />
        {session && session.user && (
          <Image
            src={session.user.image as any}
            width={10}
            height={10}
            className=" w-10 h-10 rounded-full "
            alt=""
          />
        )}
      </div>
      <button
        className="lg:hidden  p-2 z-10"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <GiHamburgerMenu />
      </button>
    </div>
  );
}

export default Navbar;
