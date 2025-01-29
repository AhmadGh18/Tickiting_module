// "use client"
// import React from 'react';
// import Image from 'next/image';
// import speaker from "../../../public/speaker.svg";
// import { LuPlus } from "react-icons/lu";
// import { useModalContext } from '@/context/ModalContext';

// const AnnouncementsHeader: React.FC = () => {
//   const { toggleAnnouncementModal } = useModalContext();

//   const handleAddAnnouncementClick = () => toggleAnnouncementModal();

//   return (
//     <div>
//       <div className='flex justify-between xl:justify-start lg:justify-start mt-[20px] border-b-[1px] border-[#C4C4C4] pb-[5px] mx-4 md:mx-10'>
//         <Image
//           src={speaker}
//           alt="projects"
//           width={45}
//           height={45}
//           className=" -mt-2"
//         />
//         <span className='font-semibold text-[20px]'>Announcements</span>
//         <div className='flex justify-between ml-12'>
//           <div
//             className='hidden md:flex justify-center items-center bg-[#FDC90E] rounded-md px-3 cursor-pointer hover:bg-black hover:text-[#FDC90E] sm:hidden'
//             onClick={handleAddAnnouncementClick}
//           >
//             <LuPlus className='-ml-1 mr-1 hover:text-[#FDC90E] font-semibold text-[20px]' />
//             <span className='font-semibold text-[15px]'>Add Announcement</span>
//           </div>

//           <div
//             className='flex md:hidden justify-center items-center bg-[#FDC90E] rounded-full w-[40px] h-[40px] cursor-pointer hover:bg-black hover:text-[#FDC90E]'
//             onClick={handleAddAnnouncementClick}
//           >
//             <LuPlus className='text-[20px] font-semibold' />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnnouncementsHeader;
