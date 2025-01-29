import { useState, useEffect } from 'react';
import { parse } from 'cookie';

const useLocale = () => {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookies = parse(document.cookie); // Parse cookies from document.cookie
      const locale = cookies['NEXT_LOCALE'] || 'en'; // Fallback to 'en' if NEXT_LOCALE is not set
      setLocale(locale);
    }
  }, []);

  return locale;
};

export default useLocale;
