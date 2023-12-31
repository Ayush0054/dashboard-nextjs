"use client";
import React from "react";

function ToggleSwitch() {
  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" checked disabled />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4   rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white   after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

export default ToggleSwitch;
