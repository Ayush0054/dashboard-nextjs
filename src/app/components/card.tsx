"use client";

import { DataSource, dataSourceTableColumns } from "./table";

import React, { useState } from "react";
import Table from "./table";
import SearchIcon from "./icons/search";


function Card({ selectedDataSource }: { selectedDataSource: any }) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); 
  };
  return (
    <div className="bg-[#fcfcfc] p-4 lg:p-8 rounded-xl border border-gray-300 text-xs lg:text-base overflow-x-auto lg:min-h-0 lg:max-h-[700px] min-h-[700px]">
      <h1 className="font-bold mb-2">Sample data</h1>
      <div className="lg:flex justify-between gap-5">
        <div className="flex items-center border-slate-300 p-1 border-2 w-4/5 rounded-xl hover:border-slate-400">
          <SearchIcon />
          <input
            type="text"
            placeholder="Type to search"
            className="outline-none border-none p-1 w-full text-gray-300 placeholder-gray-700"
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
        </div>
        <select
          value={sortColumn as any}
          onChange={(e) => setSortColumn(e.target.value)}
          className="rounded-lg border bg-white border-gray-300  hover:bg-gray-200 p-2 pl-3 pr-3 flex items-center justify-center "
        >
          <option value="">Sort by..</option>

          {dataSourceTableColumns[selectedDataSource as DataSource].map(
            (column) => (
              <option key={column.key} value={column.key}>
                {column.label}
              </option>
            )
          )}
        </select>

        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value as any)}
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
        searchQuery={searchQuery} 
      />
    </div>
  );
}

export default Card;
