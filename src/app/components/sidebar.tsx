"use client";
import React from "react";
import HomeIcon from "./icons/home";
import BarIcon from "./icons/bar";
import PeopleIcon from "./icons/people";
import PeoplesIcon from "./icons/peoples";
import UsersIcons from "./icons/users";
import { DataSource } from "./table";

import LogoutIcon from './icons/logout'
import { signOut } from 'next-auth/react'
function Sidebar({ onDataSourceChange , showSidebar}:{onDataSourceChange:any , showSidebar:any}) {

const handleDataSourceClick = (dataSource:any) => {
  onDataSourceChange(dataSource);
};
  return (
    <div className={` lg:grid place-content-between lg:z-0 lg:bg-none lg:p-0 p-5 z-20 lg:h-0   ${showSidebar ? "" : "hidden"}`}>


    
    <div className=" grid  gap-5">
      <button className=" flex items-center gap-2" >
        <HomeIcon />
        <h1>dashboard</h1>
      </button>
      <h1 className=" mb-3 mt-3 text-slate-400">ANALYTICS</h1>
      <button className=" flex items-center gap-2" onClick={() => handleDataSourceClick(DataSource.Posts)}>
        <BarIcon />
        <h1>Posts</h1>
      </button>
      <button className=" flex items-center gap-2" onClick={() => handleDataSourceClick(DataSource.Comments)}>
        <PeopleIcon />
        <h1>Comments</h1>
      </button>
      <button className=" flex items-center gap-2" onClick={() => handleDataSourceClick(DataSource.Albums)}>
        <PeoplesIcon />
        <h1>Albums</h1>
      </button>
      <button className=" flex items-center gap-2" onClick={() => handleDataSourceClick(DataSource.Photos)}>
        <UsersIcons />
        <h1>Photo</h1>
      </button>
      <button className=" flex items-center gap-2" onClick={() => handleDataSourceClick(DataSource.Users)}>
        <UsersIcons />
        <h1>Users</h1>
      </button>
      <button className=" xl:hidden flex items-center gap-2" onClick={() => signOut()}>
        <LogoutIcon />
        <h1>Logout</h1>

      </button>
    </div>
  
  </div>
  );
}

export default Sidebar;
