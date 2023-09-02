"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { pieSocket,  subscribeToChannel } from "../piesocket/piesocket";
//  @ts-ignore

export enum DataSource {
  Users = "users",
  Comments = "comments",
  Photos = "photos",
  Albums = "albums",
  Posts = "posts",
}

interface DataItem {
  id: number;
  [key: string]: any;
}

interface TableColumn {
  label: string;
  key: keyof DataItem | string;
}

export const dataSourceTableColumns: Record<DataSource, TableColumn[]> = {
  [DataSource.Users]: [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address.city" },
    { label: "Website", key: "website" },
    { label: "Company Name", key: "company.name" },
  ],
  [DataSource.Comments]: [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Body", key: "body" },
  ],
  [DataSource.Photos]: [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "URL", key: "url" },
  ],
  [DataSource.Albums]: [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
  ],
  [DataSource.Posts]: [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Body", key: "body" },
  ],
};

function Table({
  selectedDataSource,
  sortDirection,
  sortColumn,
  searchQuery,
}: {
  selectedDataSource: any;
  sortDirection: any;
  sortColumn: any;
  searchQuery: string;
}) {

  const [data, setData] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/${selectedDataSource}`
        );
  
        setData(response.data);
        setCurrentPage(1);
        const filteredData = response.data.filter((item: DataItem) =>
        JSON.stringify(item)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) //  Filter data based on searchQuery
      );
      const channelName = `data-update-${selectedDataSource}`;
        const channel = await subscribeToChannel(channelName);
        channel.publish('message', {
          action: 'updateData',
          data: response.data,
        });
      setData(filteredData);
   
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();


const live = async() =>{

  const channelName = `data-update-${selectedDataSource}`;
  

  const channel = await subscribeToChannel(channelName);

  
 
channel.listen('message', (messageData: any) => {
  if (messageData.action === 'updateData') {
    let jsonData;
    
    // Check if data is already an object or needs parsing
    if(typeof messageData.data === "object") {
      jsonData = messageData.data;
    } else {
      try{
        jsonData = JSON.parse(messageData.data);
      } catch(error) {
        console.error("Error parsing message data:", error);
      }
    }
           console.log(jsonData);
           
    setData(jsonData);
  }
});
  return () => {

    channel.unsubscribe();
  };
}

live();
   
  }, [selectedDataSource ,searchQuery ]);

  const tableColumns = dataSourceTableColumns[selectedDataSource as DataSource];

  if (!tableColumns) {
    return <div>Loading...</div>;
  }

  const getNestedPropertyValue = (obj: any, key: string) => {
    const keys = key.split(".");
    let value = obj;
    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        break;
      }
    }
    return value;
  };

  //sorting
  useEffect(() => {
    if (sortColumn !== null && sortDirection !== null) {
      const sortedData = [...data].sort((a, b) => {
        const aValue = getNestedPropertyValue(a, sortColumn);
        const bValue = getNestedPropertyValue(b, sortColumn);
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
      setData(sortedData);
    }
  }, [sortColumn, sortDirection]);

  //limit words
  function limitWords(text: any, wordLimit: number) {
    if (typeof text !== "string") {
      return text;
    }

    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }
  return (
    <div className="lg:mt-10 lg:w-full xl:max-h-[700px] ">
      <div className="overflow-x-auto">
        <table className="md:table-auto md:border-collapse w-full">
          <thead>
            <tr className="border-b border-slate-300 bg-gray-100">
              <th>
                {" "}
                <input type="checkbox" />
              </th>
              {tableColumns.map((column) => (
                <th key={column.key} className="text-xs xl:text-base">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data ?data
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item: any) => (
                <tr key={item.id} className="border-b border-slate-300">
                  <td>
                    {" "}
                    <input type="checkbox" />
                  </td>
                  {tableColumns.map((column) => (
                    <td
                      key={column.key}
                      className="lg:break-all text-xs xl:text-base"
                    >
                      {
                      // @ts-ignore
                      column.key.includes(".")
                        ? getNestedPropertyValue(item, column.key as any)
                        : limitWords(item[column.key], 6)}{" "}
                    </td>
                  ))}
                </tr>
              )) : <div>loading...</div>}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="mr-2 px-2 py-1 border rounded hover:bg-gray-200 text-xs lg:text-base"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="ml-2 px-2 py-1 border rounded hover:bg-gray-200 text-xs lg:text-base"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
