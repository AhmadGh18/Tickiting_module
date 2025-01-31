"use client";  // Required for Next.js

import React, { useState } from "react";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import FilterDrawer from "./FilterDrawer";
import Tickitingform from "./Tickitingform";
import ViewTicket from "./ViewTicket";
const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [filters, setFilters] = useState({});

  const items = [
    { label: "Update", icon: "pi pi-refresh", command: () => {} },
    { label: "Delete", icon: "pi pi-times", command: () => {} },
  ];

  const startContent = (
    <div className="flex flex-wrap gap-2 md:gap-4">
      <Button
        label="Create Ticket"
        icon="pi pi-plus"
        iconPos="right"
        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-4 transition-all duration-300"
        onClick={() => setIsFormOpen(true)} 
      />
      <Button
        label="Create Status"
        icon="pi pi-plus"
        iconPos="right"
        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-4 transition-all duration-300"
      />
    </div>
  );

  const centerContent = (
    <div className="relative flex items-center w-full md:w-auto">
      <input
        type="text"
        placeholder="Search"
        className={`w-full md:w-64 p-2 pl-10 border-2 border-gray-300 rounded-full transition-all 
          outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]`}
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
    <div className="flex flex-wrap gap-2 md:gap-4">
      <Button
        label="Show Logs"
        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-4 transition-all duration-300"
        icon="pi pi-arrow-up-right" 
        iconPos="right"
      />
      <SplitButton
        label="Projects"
        model={items}
        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-4 transition-all duration-300"
      />
    </div>
  );
  return (
    <div className="bg-white rounded shadow-md p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <div className="w-full md:w-auto flex justify-center md:justify-start">{startContent}</div>
        <div className="w-full md:w-auto flex justify-center">{centerContent}</div>
        <div className="w-full md:w-auto flex justify-center md:justify-end">{endContent}</div>
      </div>
        {/* Ticket Form Modal */}
        {isFormOpen && <Tickitingform setIsOpen={setIsFormOpen} />}
  
      <FilterDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} onApply={(formData) => {
          setFilters(formData);
          setIsOpen(false);
        }} />
    </div>
  );
};

export default Header;
