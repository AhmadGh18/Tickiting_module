"use client";  
import { useDispatch, useSelector } from "react-redux";
import { openManageStatuses } from "../../../../redux/slices/statusSlice";
import { useState, useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import FilterDrawer from "./FilterDrawer";
import ManageStatusesModal from "./ManageStatuses"; 
import Tickitingform from "./Tickitingform";
import { RootState } from "../../../../redux/store";

const Header = () => {
  const dispatch = useDispatch();
const isManageStatusesOpen = useSelector((state: RootState) => state.status.isManageStatusesOpen);

  const [isFormOpen, setIsFormOpen] = useState(false);


  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<Menu | null>(null); 

  const menuItems = [
    {
      label: "Create Ticket",
      icon: "pi pi-plus",
      command: () => setIsFormOpen(true),
    },
    {
      label: "Manage Statuses",
      icon: "pi pi-cog",
      command: () => dispatch(openManageStatuses()), 
    },
  ];
  const startContent = (
    <div className="relative">
      <Menu model={menuItems} popup ref={menuRef} style={{ minWidth: "12rem", backgroundColor: "#FFFFFF", gap: "0.5rem" }} />
      <Button
        icon="pi pi-plus"
        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-4 transition-all duration-300"
        onClick={(event) => menuRef.current?.toggle(event)} 
      />
    </div>
  );

  const centerContent = (
    <div className="relative flex items-center w-full md:w-auto">
      <input
        type="text"
        placeholder="Search"
        className="w-full md:w-64 p-2 pl-10 border-2 border-gray-300 rounded-full transition-all 
          outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <i className="pi pi-search absolute left-3 text-gray-400"></i>
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
        model={[{ label: "Update", icon: "pi pi-refresh" }, { label: "Delete", icon: "pi pi-times" }]}
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

      {isFormOpen && <Tickitingform setIsOpen={setIsFormOpen} />}

      {isManageStatusesOpen && <ManageStatusesModal  />} 

      <FilterDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} onApply={() => setIsOpen(false)} />
    </div>
  );
};

export default Header;
