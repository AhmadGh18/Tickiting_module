'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import "./[locale]/globals.css";
import home from "../../public/blackhome.svg";
import notfound from "../../public/notfound.png";
import useLocale from '@/Hooks/useLocale';

// Load the Poppins font
const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export default function NotFound() {
  const locale = useLocale();
  return (
    <html className={poppins.className}>
      <body className='flex items-center justify-center min-h-screen bg-gray-50 text-center'>
        <div>
          <Image src={notfound}
            alt="404 Page Not Found"
            width={600}
            height={400} />
          <h1 className="text-2xl font-semibold mt-6">SORRY, PAGE NOT FOUND</h1>
          <p className="text-black font-semibold mt-2">The page you are looking for is not available</p>
          <Link href={`/${locale}/brainspace/home`}>
            <button className="not-button">
              Back to home
            </button>
          </Link>
        </div>
      </body>
    </html>
  );
}