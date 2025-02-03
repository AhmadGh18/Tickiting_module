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
  const [isMobileSearch, setIsMobileSearch] = useState(false);

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

  // ----- DESKTOP CONTENT -----
  const desktopStartContent = (
    <div className="relative w-28">
      <Menu
        model={menuItems}
        popup
        ref={menuRef}
        className="bg-[#f7f7f7] shadow-2xl border-none rounded-xl text-sm"
      />
      <Button
        icon="pi pi-plus"
        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg p-2 transition-all duration-300 w-full"
        onClick={(event) => menuRef.current?.toggle(event)}
      />
    </div>
  );

  const desktopCenterContent = (
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
      <Button
          icon="pi pi-filter"
          className="hover:text-[#FDC90E] text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={() => setIsOpen(true)}
        />
    </div>
  );

  const desktopEndContent = (
    <div className="flex flex-wrap gap-2 md:gap-4">
      <Button
        label="Show Logs"
        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-4 transition-all duration-300"
        icon="pi pi-arrow-up-right"
        iconPos="right"
      />
      <SplitButton
        label="Projects"
        model={[
          { label: "Update", icon: "pi pi-refresh" },
          { label: "Delete", icon: "pi pi-times" },
        ]}
        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-4 transition-all duration-300"
      />
    </div>
  );

  // ----- MOBILE CONTENT -----
  // Mobile normal view: shows the usual buttons with a search button in the middle.
  const mobileNormalView = (
    <div className="flex items-center justify-between gap-2 ml-2">
      {/* Left: Create Ticket button */}
      <div className="w-full">
        <div className="relative">
          <Menu
            model={menuItems}
            popup
            ref={menuRef}
            className="bg-[#f7f7f7] shadow-2xl border-none rounded-xl text-sm"
          />
          <Button
            icon="pi pi-plus"
            className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg p-2 transition-all duration-300 w-full"
            onClick={(event) => menuRef.current?.toggle(event)}
          />
        </div>
      </div>

      {/* Center: Search button */}
      <Button
        icon="pi pi-search"
        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black rounded-lg p-2 w-full"
        onClick={() => setIsMobileSearch(true)}
      />

      {/* Right: Other actions (Show Logs & Projects) */}
      <div className="flex items-center justify-between w-full">
        <Button
          icon="pi pi-arrow-up-right"
          tooltip="Show Logs"
          tooltipOptions={{
            position: "bottom",
            className:
              "bg-[#000000b8] text-white font-bold rounded-lg shadow-2xl p-2 mt-2",
          }}
          className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black rounded-lg mr-2 pt-2 pb-2 w-full"
        />
        <Button
          icon="pi pi-ellipsis-v"
          tooltip="Projects"
          tooltipOptions={{
            position: "bottom",
            className:
              "bg-[#000000b8] text-white text-sm font-bold rounded-lg shadow-2xl p-1 mt-2",
          }}
          className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black rounded-lg mr-2 pt-2 pb-2 w-full"
        />
      </div>
    </div>
  );

  // Mobile search view: shows an expanded search input, a filter button, and a back button.
  const mobileSearchView = (
    <div className="flex items-center gap-2">
      {/* Back/Close Button */}
      <Button
        icon="pi pi-arrow-left"
        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black rounded-lg p-2 m-2 w-14"
        onClick={() => setIsMobileSearch(false)}
      />
      {/* Expanded Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 pl-9 pr-9 border-2 border-gray-300 rounded-full transition-all 
            outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <i className="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <Button
          icon="pi pi-filter"
          className="hover:text-[#FDC90E] text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={() => setIsOpen(true)}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded shadow-md p-2">
      {/* Desktop Header */}
      <div className="hidden md:flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <div className="w-full md:w-auto flex justify-start">{desktopStartContent}</div>
        <div className="w-full md:w-auto flex justify-center">{desktopCenterContent}</div>
        <div className="w-full md:w-auto flex justify-end">{desktopEndContent}</div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden relative pb-4">
        {/* Mobile Normal View */}
        <div
          className={`
            pt-2
            transition-all duration-700 ease-in-out
            ${isMobileSearch ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"}
          `}
        >
          {mobileNormalView}
        </div>

        {/* Mobile Search View */}
        <div
          className={`
            transition-all duration-700 ease-in-out absolute top-0 left-0 right-0
            ${isMobileSearch ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
          `}
        >
          {mobileSearchView}
        </div>
      </div>

      {/* Modals / Drawers */}
      {isFormOpen && <Tickitingform setIsOpen={setIsFormOpen} />}
      {isManageStatusesOpen && <ManageStatusesModal />}
      <FilterDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} onApply={() => setIsOpen(false)} />
    </div>
  );
};

export default Header;
