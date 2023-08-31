"use client";
import React from "react";
import HomeIcon from "./icons/home";
import BarIcon from "./icons/bar";
import PeopleIcon from "./icons/people";
import PeoplesIcon from "./icons/peoples";
import UsersIcons from "./icons/users";
import SettingsIcon from "./icons/settings";
import LogoutIcon from "./icons/logout";
import { DataSource } from "./table";

function Sidebar({ onDataSourceChange }:{onDataSourceChange:any}) {

const handleDataSourceClick = (dataSource:any) => {
  onDataSourceChange(dataSource);
};
  return (
    <div className=" grid place-content-between ">
    <div className=" grid  gap-5">
      <button className=" flex items-center gap-2" onClick={() => handleDataSourceClick("dashboard")}>
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
    </div>
  
  </div>
  );
}

export default Sidebar;
