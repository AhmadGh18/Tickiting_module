"use client";
import React, { useState, useEffect } from "react";

const quotesArray = [
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Do not watch the clock. Do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
];

const Quotes: React.FC = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });

  // Function to generate a random quote
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    setQuote(quotesArray[randomIndex]);
  };

  useEffect(() => {
    generateRandomQuote(); // Generate a quote when the component mounts
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center mt-5">
      {/* Horizontal black line */}
      {/* <div className="absolute w-full h-1 bg-black top-1/2 transform -translate-y-1/2"></div> */}
      {/* Quote box */}
      <div className="relative bg-blue-100 p-6 rounded-md shadow-md max-w-sm md:max-w-full mx-auto">
        <p className="text-lg italic text-gray-700">"{quote.text}"</p>
        <p className="text-right mt-4 text-sm text-gray-500">- {quote.author}</p>
      </div>
    </div>
  );
};

export default Quotes;
