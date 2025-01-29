import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import USFlag from '../../../public/US.svg';
import FRFlag from '../../../public/fr.svg';
import LEBFlag from '../../../public/leb.svg';
import { setCookie } from 'nookies';
import type { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import * as cookie from "cookie";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

// Define the type for locale options
type LocaleOptions = {
  [key: string]: {
    flag: StaticImageData;
    label: string;
  };
};

// Define the locale options
const localeOptions: LocaleOptions = {
  en: { flag: USFlag, label: 'English' },
  fr: { flag: FRFlag, label: 'French' },
  ar: { flag: LEBFlag, label: 'Arabic' },
};

const LanguageDropdown: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<string>('en');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations('header'); // Adjust translation key as necessary
  const isRTL = currentLocale === 'ar'; // Adjust this logic based on your application's requirements

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookies = cookie.parse(document.cookie);
      setCurrentLocale(cookies['NEXT_LOCALE'] || 'en');
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale);
    setCookie(null, 'NEXT_LOCALE', newLocale, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });
    router.push(`/${newLocale}`); // Adjust redirection if needed
    setDropdownVisible(false); // Close dropdown after selection
  };

  const currentOption = localeOptions[currentLocale as keyof LocaleOptions] || localeOptions['en'];

  return (
    <div className={`relative ${isRTL ? 'mr-0' : 'ml-0'} dropdown`} ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={`cursor-pointer  bg-white flex flex-row border border-[#C4C4C4] rounded-md group-hover:bg-white group-hover:bg-opacity-50 p-2 items-center`}
      >
        <Image src={currentOption.flag} alt={currentOption.label} width={15} height={15} className={`mr-2 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h1 className='text-sm font-semibold'>{currentOption.label}</h1>
        {dropdownVisible ? (
          <IoIosArrowUp className={`text-black ml-2 ${isRTL ? 'mr-2' : 'ml-2'}`} />
        ) : (
          <IoIosArrowDown className={`text-black ml-2 ${isRTL ? 'mr-2' : 'ml-2'}`} />
        )}
      </div>
      <div
        className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-1 w-full bg-white border border-[#C4C4C4]  rounded-md shadow-lg  z-50 transition-all duration-300 ease-in-out transform ${dropdownVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <ul>
          {Object.entries(localeOptions)
            .filter(([localeCode]) => localeCode !== currentLocale) // Exclude the current locale
            .map(([localeCode, { flag, label }]) => (
              <li
                key={localeCode}
                className={`flex items-center p-2 rounded-lg  cursor-pointer text-sm font-semibold ${isRTL ? 'text-right' : 'text-left'} `}
                onClick={() => handleLocaleChange(localeCode)}
              >
                <Image src={flag} alt={label} width={20} height={20} className={`mr-2 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {label}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageDropdown;
