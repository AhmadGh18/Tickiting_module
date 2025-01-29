"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IoPerson, IoDownload } from "react-icons/io5";
import { BsBellFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import bell from "../../../public/Notifications.svg";
import speaker from "../../../public/Announcements.svg";
import defaultProf from "../../../public/defaultprof.png";
import { IoLogOutOutline } from "react-icons/io5";
import useLocale from "@/Hooks/useLocale";
import translation from "../../../public/translation.svg";
import USFlag from "../../../public/US.svg";
import FRFlag from "../../../public/fr.svg";
import LEBFlag from "../../../public/leb.svg";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import NotificationsDropDown from './NotificationsDropdown';

interface HeaderProps {
  onLocaleChange: (locale: string) => void;
  currentLocale: string;
}

const Header: React.FC<HeaderProps> = ({ onLocaleChange, currentLocale }) => {
  const locale = useLocale();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isRTL = currentLocale === "ar";
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const pathname = usePathname(); // Get the current path dynamically
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter(); // Initialize the router
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const isHomePage = pathname === `/${locale}/brainspace/home`;
  const isChooseStorePage = pathname === `/${locale}/chooseStore`;
  const isProductsPage = pathname === `/${locale}/products`;
  const isCategoriesPage = pathname === `/${locale}/products/categories`;
  const isBrandsPage = pathname === `/${locale}/products/brands`;
  const isUnitsPage = pathname === `/${locale}/products/units`;
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
    setIsMenuVisible(false);
  };
  const handleBackNavigation = () => {
    if (isProductsPage || isCategoriesPage || isBrandsPage || isUnitsPage) {
      router.push(`/${locale}/chooseStore`);
    } else if (isChooseStorePage) {
      router.push(`/${locale}/brainspace/home`);
    } else {
      router.push(`/${locale}/brainspace/home`);
    }
  };
  const isActive = (path: string) => pathname === path;
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    image: defaultProf.src, // Default profile image
  });
  const handleLogout = () => {
    localStorage.removeItem("ally-supports-cache");
    localStorage.removeItem("token");
    localStorage.removeItem("userState");
    sessionStorage.removeItem("accessToken");
    window.location.href = `/${locale}/`;
  };

  const toggleNotifications = () => {
    setNotificationsVisible(prev => !prev);
    setDropdownVisible(false);

  };

  const toggleUserMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    const storedUserState = localStorage.getItem("userState");
    if (storedUserState) {
      try {
        const parsedUser = JSON.parse(storedUserState);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing userState from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="bg-black h-[60px] w-full flex flex-row justify-between items-center relative px-10">
      <div className="flex items-center space-x-6 text-black">
      <div className="pl-10 relative group">
          <Image
            src={'/images/navbar/brainspace logo white 3.svg'}
            height={160}
            width={160}
            alt="brainspace"
          />
          {!isHomePage && (
            <Button
              onClick={handleBackNavigation}
              icon="pi pi-angle-left"
              className="p-button-text text-black bg-[#F4F4F4] rounded-full p-3 focus:outline-none w-8 h-8 flex justify-center items-center absolute top-1/2 -left-4 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300"
            />)}
        </div>

        <div className="text-white">
          {/* Navigation Links */}
          {pathname.startsWith(`/${locale}/products`) && (
            <div className="flex space-x-6">
              <Link href={`/${locale}/products`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/products`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Products
                </span>
              </Link>
              <Link href={`/${locale}/products/categories`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/products/categories`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Categories
                </span>
              </Link>
              <Link href={`/${locale}/products/brands`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/products/brands`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Brands
                </span>
              </Link>
              <Link href={`/${locale}/products/units`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/products/units`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Units
                </span>
              </Link>
              <Link href={`/${locale}/products/adjustments`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/products/adjustments`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Adjustments
                </span>
              </Link>
            </div>
          )}
          {pathname.startsWith(`/${locale}/accounting`) && (
            <div className="flex space-x-6">
              <Link href={`/${locale}/accounting`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/accounting`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Chart of Accounts
                </span>
              </Link>
              <Link href={`/${locale}/accounting/account-list`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/accounting/account-list`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Account List
                </span>
              </Link>
              <Link href={`/${locale}/accounting/trial-balance`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/accounting/trial-balance`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Trial Balance
                </span>
              </Link>
              <Link href={`/${locale}/accounting/balance-sheet`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/accounting/balance-sheet`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Balance Sheet
                </span>
              </Link>
              <Link href={`/${locale}/accounting/profit-and-loss`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/accounting/profit-and-loss`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Profit and Loss
                </span>
              </Link>
            </div>
          )}
          {pathname.startsWith(`/${locale}/invoices`) && (
            <div className="flex space-x-6">
              <Link href={`/${locale}/invoices`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/invoices`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Sales Invoices
                </span>
              </Link>
              <Link href={`/${locale}/invoices/purchase-invoices`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/invoices/purchase-invoices`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Purchase invoices
                </span>
              </Link>
             
              <Link href={`/${locale}/invoices/pos-invoices`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/invoices/pos-invoices`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  POS invoices
                </span>
              </Link>
              <Link href={`/${locale}/invoices/pop-invoices`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/invoices/pop-invoices`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  POP invoices
                </span>
              </Link>
              <Link href={`/${locale}/invoices/quotation`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/invoices/quotation`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Quotation
                </span>
              </Link>
              <Link href={`/${locale}/invoices/damaged-invoices`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/invoices/damaged-invoices`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                  Damaged invoices
                </span>
              </Link>
              <Link href={`/${locale}/invoices/transfers`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/invoices/transfers`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                 Transfers
                </span>
              </Link>
              <Link href={`/${locale}/invoices/returns`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/invoices/returns`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                 Returns
                </span>
              </Link>
              <Link href={`/${locale}/invoices/payments`} passHref>
                <span
                  className={`cursor-pointer hover:underline ${isActive(`/${locale}/invoices/payments`)
                    ? "text-blue-400 font-bold"
                    : "text-white"
                    }`}
                >
                 Payments
                </span>
              </Link>
            </div>
          )}
        </div>
      

      </div>

      {/* Right Section */}
      <div className="flex flex-row space-x-2 items-center">
        <div className="mr-3">
          <div onClick={toggleNotifications} className=' rounded-md group-hover:bg-white group-hover:bg-opacity-50 cursor-pointer'
            data-tooltip-id="notifications-tooltip"
            data-tooltip-content="Notifications">
            <Image
              src={bell}
              alt="Notifications"
              width={20}
              height={20}
            />
            <Tooltip id="notifications-tooltip" place="top" className='mt-[7px] z-10' />
          </div>
          <NotificationsDropDown
            isVisible={notificationsVisible}
            onClose={() => setNotificationsVisible(false)}
          />
        </div>


        <Link href={`/${locale}/announcements`} passHref>
          <div className="mr-3">
            <div
              className="bg-black rounded-md group-hover:bg-white group-hover:bg-opacity-50"
              data-tooltip-id="announcements-tooltip"
              data-tooltip-content="Announcements"
            >
              <Image
                src={speaker}
                alt="Announcements"
                className="w-[20px] -mt-1"
                width={1000}
                height={1000}
              />
              <Tooltip
                id="announcements-tooltip"
                place="top"
                className="z-10"
              />
            </div>
          </div>
        </Link>

        <div
          className={`relative ${isRTL ? "mr-0" : "ml-0"} dropdown`}
          ref={dropdownRef}
        >
          <div
            onClick={toggleDropdown}
            className="cursor-pointer rounded-md group-hover:bg-white group-hover:bg-opacity-50"
            data-tooltip-id="translation-tooltip"
            data-tooltip-content="Translation"
          >
            <Image
              src={translation}
              alt="Translation"
              width={20}
              height={20}
              className="mr-2"
            />
            <Tooltip
              id="translation-tooltip"
              place="top"
              className="mt-[6px] z-10"
            />
          </div>
          <div
            className={`absolute ${isRTL ? "left-0" : "right-0"
              } mt-3 w-[180px] bg-white border rounded-md shadow-lg py-2 px-3 z-50 transition-all duration-300 ease-in-out transform ${dropdownVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
          >
            <ul>
              <li
                className={`flex items-center p-2 rounded-lg hover:bg-[#E4E4E4] cursor-pointer font-medium text-[16px] ${isRTL ? "text-right" : "text-left"
                  }`}
                onClick={() => onLocaleChange("en")}
              >
                <Image
                  src={USFlag}
                  alt="English"
                  width={20}
                  height={20}
                  className={`mr-2 ${isRTL ? "ml-2" : "mr-2"}`}
                />
                English
              </li>
              <li
                className={`flex items-center p-2 rounded-lg hover:bg-[#E4E4E4] cursor-pointer font-medium text-[16px] ${isRTL ? "text-right" : "text-left"
                  }`}
                onClick={() => onLocaleChange("fr")}
              >
                <Image
                  src={FRFlag}
                  alt="French"
                  width={20}
                  height={20}
                  className={`mr-2 ${isRTL ? "ml-2" : "mr-2"}`}
                />
                French
              </li>
              <li
                className={`flex items-center p-2 rounded-lg hover:bg-[#E4E4E4] cursor-pointer font-medium text-[16px] ${isRTL ? "text-right" : "text-left"
                  }`}
                onClick={() => onLocaleChange("ar")}
              >
                <Image
                  src={LEBFlag}
                  alt="Arabic"
                  width={20}
                  height={20}
                  className={`mr-2 ${isRTL ? "ml-2" : "mr-2"}`}
                />
                Arabic
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`relative mr-10 h-10 w-10 ${isRTL ? "ml-2" : "mr-2"
            } rounded-full flex justify-center items-center font-semibold text-[20px] cursor-pointer`}
          onClick={toggleUserMenu}
          ref={userMenuRef}
        >
          <Image
            src={user.image}
            alt="User"
            width={1000}
            height={1000}
            className="rounded-full object-cover w-[40px] h-[40px]"
          />
          <div className="absolute top-7 right-0 h-3 w-3 bg-[#19B600] border-2 border-white rounded-full"></div>
          <div
            className={`absolute right-0 top-full mt-2 w-[320px] h-[280px] bg-white border rounded-md shadow-lg py-2 px-3 z-50 user-menu transition-all duration-300 ease-in-out transform ${isMenuVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
          >
            <div className="flex space-x-3 items-center p-3 border-b border-[#C4C4C4]">
              <div className=" relative w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 text-[#FDC90E]">
                <Image
                  src={user.image}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full w-[40px] h-[40px]"
                />
                <div className="absolute top-7 right-0 h-3 w-3 bg-[#19B600] border-2 border-white rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <div className="text-[16px] font-semibold">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-[#606060]">Online</div>
              </div>
            </div>

            <div className="mt-4">
              <Link href={`/${currentLocale}/profile`} passHref>
                <div className="flex items-center p-2 rounded-lg hover:bg-[#E4E4E4] cursor-pointer space-x-3">
                  <IoPerson size={20} />
                  <span className="font-medium text-[16px]">Profile</span>
                </div>
              </Link>
              <div className="flex items-center p-2 rounded-lg hover:bg-[#E4E4E4] cursor-pointer space-x-3">
                <BsBellFill size={20} />
                <span className="font-medium text-[16px]">
                  Notification settings
                </span>
              </div>
              <div className="flex items-center p-2 rounded-lg hover:bg-[#E4E4E4] cursor-pointer space-x-3">
                <IoDownload size={20} />
                <span className="font-medium text-[16px]">Download app</span>
              </div>
              <div
                onClick={handleLogout}
                className="flex items-center p-2 rounded-lg hover:bg-[#E4E4E4] cursor-pointer space-x-3"
              >
                <IoLogOutOutline size={20} />
                <span className="font-medium text-[16px]">Log out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
