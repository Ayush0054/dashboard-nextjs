"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { table } from 'console';

export enum DataSource {
  Users = 'users',
  Comments = 'comments',
  Photos = 'photos',
  Albums = 'albums',
  Posts = 'posts',
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
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Address', key: 'address.city' },
    { label: 'Website', key: 'website' },
    { label: 'Company Name', key: 'company.name' },
  ],
  [DataSource.Comments]: [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    {label:'Body',key:'body'}
  ],
  [DataSource.Photos]: [
    { label: 'ID', key: 'id' },
    { label: 'Title', key: 'title' },
    { label: 'URL', key: 'url' },
    
  ],
  [DataSource.Albums]: [
    { label: 'ID', key: 'id' },
    { label: 'Title', key: 'title' },
   
  ],
  [DataSource.Posts]: [
    { label: 'ID', key: 'id' },
    { label: 'Title', key: 'title' },
    { label: 'Body', key: 'body' },
  ],

};

function Table({ selectedDataSource ,sortDirection , sortColumn }:{selectedDataSource:any , sortDirection:any , sortColumn:any}) {
  // const [selectedDataSource, setSelectedDataSource] = useState<DataSource>(DataSource.Users);
  const [data, setData] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/${selectedDataSource}`);
        setData(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedDataSource]);

 

 const  tableColumns = dataSourceTableColumns[selectedDataSource as DataSource];

  console.log('selectedDataSource:', selectedDataSource);
  console.log('dataSourceTableColumns:', dataSourceTableColumns);
  console.log('tableColumns:', tableColumns);


  if (!tableColumns) {
    return <div>Loading...</div>; // Handle the case when tableColumns is undefined
  }

  const getNestedPropertyValue = (obj: any, key: string) => {
    const keys = key.split('.');
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
    if (typeof text !== 'string') {
      return text; 
    }
  
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  }
  return (
  
    <div className='mt-10 w-full max-h-[700px]'>  
     
       <table className="table-auto border-collapse w-full min-h-[300px] ">
        <thead>
        <tr className='border-b border-slate-300 bg-gray-100 '>
      <th> <input type="checkbox" ></input></th>
            {tableColumns.map(column => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>


<tbody>
  {data
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((item: any) => (
      <tr key={item.id} className='border-b border-slate-300'>
        <td> <input type="checkbox"></input></td>
        {tableColumns.map(column => (
          <td key={column.key} className='break-all'>
           {column.key.includes('.')
              ? getNestedPropertyValue(item, column.key)
              : limitWords(item[column.key], 6)} {/* Limit to 10 words */}
          </td>
        ))}
      </tr>
    ))}
</tbody>
      </table>
      <div className="flex justify-center mt-4 ">
    <button
      className="mr-2 px-2 py-1 border rounded hover:bg-gray-200"
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <button
      className="ml-2 px-2 py-1 border rounded hover:bg-gray-200"
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
