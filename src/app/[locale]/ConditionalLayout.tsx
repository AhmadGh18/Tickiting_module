"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Header from "@/Components/header/Header";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  locale: string;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({
  children,
  locale: initialLocale,
}) => {
  const pathname = usePathname();
  const [locale, setLocale] = useState<string>(initialLocale);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleLocaleChange = (nextLocale: string) => {
    setLocale(nextLocale);

    const queryParams = searchParams.toString();
    const newPathname = `/${nextLocale}${pathname.replace(/^\/[a-z]{2}/, "")}`;
    const newUrl = `${newPathname}${queryParams ? `?${queryParams}` : ""}`;
    router.push(newUrl);
  };

  // Specify routes that shouldn't have the Header
  const noHeaderRoutes = ["/pos/[id]", "/", "/pospro/[id]"];

  // Match pathname against noHeaderRoutes dynamically
  const showHeader = !noHeaderRoutes.some((route) => {
    const regex = new RegExp(
      `^/${locale}${route.replace(/\[.*?\]/g, ".*").replace(/\/$/, "")}/?$`
    );
    return regex.test(pathname);
  });

  useEffect(() => {
    if (locale !== initialLocale) {
      setLocale(initialLocale); // Sync locale state if the parent passes a new initialLocale
    }
  }, [initialLocale]);

  return (
    <div className="h-screen" style={{ backgroundImage: 'url(/images/background-light.svg)', backgroundSize: 'cover',height:"auto" }}>
      {showHeader && (
        <Header onLocaleChange={handleLocaleChange} currentLocale={locale} />
      )}
      {children}
     
    </div>
  );
};

export default ConditionalLayout;
