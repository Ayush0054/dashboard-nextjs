"use client";

import  { dataSourceTableColumns } from "./table";

import React, { useState } from "react";
import Table from "./table";
import SearchIcon from "./icons/search";
import ArrowUpIcon from "public/assets/icons/Arrowup.png";

import Image from "next/image";

function Card({ selectedDataSource }: { selectedDataSource: any }) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleColumnSort = (key: string) => {
    if (sortColumn === key) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(key);
      setSortDirection("asc"); // Reset direction when changing column
    }
  };

  return (
    <div className="bg-[#fcfcfc] p-8 rounded-xl border border-gray-300 max-h-[700px]">
      <h1 className="font-bold mb-5">Sample data</h1>
      <div className="flex justify-between gap-5">
        <div className="flex items-center border-slate-300 p-1 border-2 w-4/5 rounded-xl hover:border-slate-400">
          <SearchIcon />
          <input
            type="text"
            placeholder="Type to search"
            className="outline-none border-none p-1 w-full text-gray-300 placeholder-gray-700"
          />
        </div>
        <select
  value={sortColumn}
  onChange={(e) => setSortColumn(e.target.value)}
  className="rounded-lg border bg-white border-gray-300 hover:bg-gray-200 p-2 pl-3 pr-3 flex items-center justify-center gap-2"
>
  <option value="">Sort by...</option>
  {dataSourceTableColumns[selectedDataSource].map(column => (
    <option key={column.key} value={column.key}>
      {column.label}
    </option>
  ))}
</select>

<select
  value={sortDirection}
  onChange={(e) => setSortDirection(e.target.value)}
  className="rounded-lg border bg-white border-gray-300 hover:bg-gray-200 p-2 pl-3 pr-3 flex items-center justify-center gap-2"

>
  <option value="asc">Ascending</option>
  <option value="desc">Descending</option>
</select>

      </div>
      <Table
        selectedDataSource={selectedDataSource}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  );
}

export default Card;
