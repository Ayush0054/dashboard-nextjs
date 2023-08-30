import React from "react";
import Table from "./table";
import SearchIcon from "./icons/search";
import FilterIcon from "public/assets/icons/Filter.png";
import ArrowUpIcon from "public/assets/icons/Arrowup.png"
import Image from "next/image";
function Card() {
  return (
    <div className=" bg-[#fcfcfc] p-8 rounded-xl border border-gray-300">
      <h1 className=" font-bold mb-5">Sample data</h1>
      <div className=" flex justify-between">
        <div className=" flex items-center border-slate-300 p-1 border-2 w-4/6 rounded-xl hover:border-slate-400">
          <SearchIcon />
          <input
            type="text"
            placeholder="Type to search"
            className=" outline-none border-none p-1 w-full text-gray-300 placeholder-gray-700"
          />
        </div>
        <button className=" rounded-lg border border-gray-300 p-2 pl-3 pr-3 flex items-center gap-2">
          <Image src={FilterIcon} alt="filter icon" />
          Filter
        </button>
        <button className=" rounded-lg border border-gray-300 p-2 pl-3 pr-3 flex items-center gap-2">
        <Image src={ArrowUpIcon} alt="ArrowUp icon" />
           Export</button>
      </div>
      <Table />
    </div>
  );
}

export default Card;
