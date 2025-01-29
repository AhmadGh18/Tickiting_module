import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers'; // Import the headers function

const supportedLocales = ['en', 'ar', 'fr']; // Supported locales

export default getRequestConfig(async () => {
  // Use the headers API to determine the locale
  const headersObject = await headers(); // Await the headers object
  const acceptLanguage = headersObject.get('accept-language') || 'en'; // Default to 'en' if header is missing

  // Match the accepted language to the supported locales
  const locale = supportedLocales.find((lang) => acceptLanguage.startsWith(lang)) || 'en';

  if (!supportedLocales.includes(locale)) {
    notFound(); // Trigger 404 if the locale is unsupported
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
