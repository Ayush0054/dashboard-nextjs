"use client";
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Card from '../components/card'
import { DataSource } from '../components/table';
import Footer from '../components/footer';
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import SigninButton from '../components/siginButton';
function Dashboard() {
  const { push } = useRouter();
  const { data: session } = useSession();
    const [selectedDataSource, setSelectedDataSource] = useState<DataSource>(DataSource.Users);
    const [showSidebar, setShowSidebar] = useState(true);

    // Add an event listener to detect screen width changes.
    useEffect(() => {
      function handleResize() {
        if (window.innerWidth < 1024) {
          setShowSidebar(false);
        } else {
          setShowSidebar(true);
        }
      }
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Initialize the state based on current screen width.
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    const handleDataSourceChange = (dataSource: DataSource) => {
        setSelectedDataSource(dataSource);
      };

  return (
    <div>
      { session ?
        <div>

        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar}  />
        

      <div className=" flex justify-evenly lg:mt-10 mt-2 ">
      <Sidebar onDataSourceChange={handleDataSourceChange} showSidebar={showSidebar} /> 
        <div className=" grid w-3/4 max-h-[700px] min-h-[650px]">
       <Header  />
          <Card  selectedDataSource={selectedDataSource}/>
        </div>
      </div>
      <div className='className="bottom-0 fixed"'>
        
        <Footer />
      </div>
        </div> :
        <div> <SigninButton/>  </div>
      }
        
    </div>
  )
}

export default Dashboard
