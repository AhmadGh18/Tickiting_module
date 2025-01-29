"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Module } from "../../../../types/Module";
import { useAuth } from "../auth-provider/useAuth";
import defaultprojectimage from "../../../../../public/defaultproject.png";
import Loader from "@/common/loader/loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const Modules: React.FC<{ additionalModules?: Module[] }> = ({ additionalModules = [] }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [modulesData, setModulesData] = useState<Module[]>([]);
  const { accessToken } = useAuth();
  const [chunkSize, setChunkSize] = useState(10); // Default chunk size for large screens

  // Function to fetch modules
  const fetchModules = async () => {
    try {
      const response = await fetch("https://posnew.smcare.net/v0_0_1-modules/get-modules", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setModulesData(
          data.map((module: Module) => ({
            ...module,
            image: module.image || defaultprojectimage.src,
          }))
        );
      } else {
        console.error("Failed to fetch modules:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect for fetching modules and updating chunks
  useEffect(() => {
    if (accessToken) {
      fetchModules();
    }
  }, [accessToken]);

  // Create a function to slice the combinedModules into chunks of the specified size
  const chunkModules = (modules: Module[], size: number) => {
    const chunks: Module[][] = [];
    for (let i = 0; i < modules.length; i += size) {
      chunks.push(modules.slice(i, i + size));
    }
    return chunks;
  };

  // Determine chunk size based on screen width
  useEffect(() => {
    const updateChunkSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width >= 1100) {
        setChunkSize(10); // Large screens (lg)
      } else if (width >= 800) {
        setChunkSize(9); // Medium screens (md) 
      }
      else if (width >= 700) {
        setChunkSize(6); // Medium screens (md)
      } else if (width >= 400) {
        setChunkSize(4); // Medium screens (md)
      } else if ((width >= 300 && width <= 500) && height >= 800) {
        setChunkSize(4); // Small screens
      }
      else {
        setChunkSize(2); // Small screens (sm)
      }
      // if (height >= 1100) {
      //   setChunkSize(10); // Large screens (lg)
      // } else if (height >= 800 && width <= 400) {
      //   setChunkSize(4); // Small screens
      // } else if (height <= 800 && width >= 500) {
      //   setChunkSize(2); // Small screens
      // } else if (height >= 800) {
      //   setChunkSize(9); // Medium screens (md) 
      // } else if (height >= 700) {
      //   setChunkSize(6); // Medium screens (md)
      // } else if (height >= 400) {
      //   setChunkSize(4); // Medium screens (md)
      // } else if (height >= 300) {
      //   setChunkSize(4); // Small screens
      // } else {
      //   setChunkSize(2); // Small screens (sm)
      // }
    };

    updateChunkSize(); // Set initial chunk size
    window.addEventListener("resize", updateChunkSize); // Update on resize

    return () => {
      window.removeEventListener("resize", updateChunkSize); // Cleanup on unmount
    };
  }, []);

  // Combine modules and split into chunks inside the render
  const combinedModules = [...modulesData, ...additionalModules];
  const moduleChunks = chunkModules(combinedModules, chunkSize); // Split the modules into chunks based on screen size

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center pb-24">
      <ToastContainer />
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1} // Only 1 slide will be visible at a time
        pagination={{ clickable: true }}
        className="w-full justify-center"
      >
        {moduleChunks.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className="py-8 md:py-20 lg:py-32 xl:py-20 flex justify-center items-center">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-8 justify-center items-center max-w-full">
                {chunk.map((module: Module) => (
                  <Link
                    href={`${module.link}?token=${encodeURIComponent(accessToken || "")}`}
                    key={module.id}
                    passHref
                  >
                    <div className="bg-white w-[150px] md:w-[220px] relative flex flex-col items-center rounded-lg shadow-md text-black font-semibold cursor-pointer transition-transform transform hover:scale-105">
                      <Image
                        src={module.image?.path || defaultprojectimage.src}
                        alt={module.name}
                        className="rounded-t-lg w-full h-40 object-contain"
                        width={160}
                        height={160}
                      />
                      <h3 className="text-center mt-3 mb-2 text-lg">{module.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Modules;
