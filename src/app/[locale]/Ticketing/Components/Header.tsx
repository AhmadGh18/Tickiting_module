"use client";  // Add this at the top of your file

import React, { useState } from "react"; // Now useState will work
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import FilterDrawer from "./FilterDrawer";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { label: "Update", icon: "pi pi-refresh", command: () => {} },
    { label: "Delete", icon: "pi pi-times", command: () => {} },
  ];

  const startContent = (
    <div className="flex gap-2">
      <Button
        label="Create Ticket"
        icon="pi pi-plus"
        iconPos="right"
        style={{ gap: "8px" }}
        className="bg-[#FACC15] hover:bg-[#edcd5a] text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
        onClick={() => console.log("Button clicked")}
      />
      <Button
        label="Create Status"
        icon="pi pi-plus"
        iconPos="right"
        style={{ gap: "8px" }}
        className="bg-[#FACC15] hover:bg-[#edcd5a] text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
        onClick={() => console.log("Button clicked")}
      />
    </div>
  );

  const centerContent = (
    <div className="relative flex items-center justify-center">
      <input
        type="text"
        placeholder="Search"
        className="w-64 p-2 pl-10 border-2 border-gray-300 rounded-full transition-all duration-300 outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15] ${inputValue ? 'placeholder:opacity-0' : 'placeholder:opacity-100'}"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <i className="pi pi-search absolute left-3 text-gray-400"></i>
      <button
        className="ml-2 text-gray-400 hover:text-gray-600"
        onClick={() => setIsOpen(true)}
      >
        <i className="pi pi-sliders-h"></i>
      </button>
    </div>
  );

  const endContent = (
    <div className="flex gap-2">
      <Button
        label="Show Logs"
        className="bg-[#FACC15] hover:bg-[#edcd5a] text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
        icon="pi pi-arrow-up-right" 
        iconPos="right"
        onClick={() => console.log("Button clicked")}
      />
      <SplitButton
        label="Projects"
        
        model={items}
        className="bg-[#FACC15] hover:bg-[#edcd5a] text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
      />
    </div>
  );

  return (
    <div className="bg-white rounded shadow-md p-4">
      <div className="grid grid-cols-3 gap-4 items-center w-full">
        <div className="flex justify-start">{startContent}</div>
        <div className="flex justify-center">{centerContent}</div>
        <div className="flex justify-end">{endContent}</div>
      </div>
      <FilterDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Header;
