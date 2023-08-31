"use client";
import React, { useState } from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Card from '../components/card'
import { DataSource } from '../components/table';
import Footer from '../components/footer';

function Dashboard() {
    const [selectedDataSource, setSelectedDataSource] = useState<DataSource>(DataSource.Users);

    const handleDataSourceChange = (dataSource: DataSource) => {
        setSelectedDataSource(dataSource);
      };
  return (
    <div>
        <Navbar />
        

      <div className=" flex justify-evenly mt-10 ">
      <Sidebar onDataSourceChange={handleDataSourceChange} /> 
        <div className=" grid w-3/4 max-h-[700px] min-h-[650px]">
       <Header  />
          <Card  selectedDataSource={selectedDataSource}/>
        </div>
      </div>
      <div className='className="bottom-0 fixed"'>
        
        <Footer />
      </div>
        
    </div>
  )
}

export default Dashboard
