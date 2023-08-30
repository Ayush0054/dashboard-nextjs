import React from "react";
import HomeIcon from "./icons/home";
import BarIcon from "./icons/bar";
import PeopleIcon from "./icons/people";
import PeoplesIcon from "./icons/peoples";
import UsersIcons from "./icons/users";
import SettingsIcon from "./icons/settings";
import LogoutIcon from "./icons/logout";

function Sidebar() {
  return (
    <div className=" grid place-content-between ">
      <div className=" grid  gap-3">
        <a className=" flex items-center gap-2">
          <HomeIcon />
          <h1>dashboard</h1>
        </a>
        <div className=" flex items-center gap-2">
          <BarIcon />
          <h1>Posts</h1>
        </div>
        <div className=" flex items-center gap-2">
          <PeopleIcon />
          <h1>Comments</h1>
        </div>
        <div className=" flex items-center gap-2">
          <PeoplesIcon />
          <h1>Albums</h1>
        </div>
        <div className=" flex items-center gap-2">
          <UsersIcons />
          <h1>Photo</h1>
        </div>
        <div className=" flex items-center gap-2">
          <UsersIcons />
          <h1>Users</h1>
        </div>
      </div>
      <div>
        <div className=" flex items-center gap-2">
          <SettingsIcon />
          <h1>Settings</h1>
        </div>
        <div className=" flex items-center gap-2">
          <LogoutIcon />
          <h1>Logout</h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
