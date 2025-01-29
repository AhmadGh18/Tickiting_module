// "use client"
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '@/redux/store';
// import { fetchAnnouncements } from '@/redux/slices/announcementSlice';
// import { Announcement } from '@/types/AnnouncementTypes';
// import Image from 'next/image';
// import dayjs from 'dayjs';
// import { FaWindowClose } from 'react-icons/fa';
// import EditDeleteAnnouncement from './EditDeleteAnnouncement';
// import defaultProfile from "../../../public/defaultprof.png";

// const Skeleton = () => (
//   <div className="animate-pulse flex space-x-4">
//     <div className="bg-gray-300 rounded-lg w-[160px] h-[150px]"></div>
//   </div>
// );

// const Modal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   announcement: {
//     image: string;
//     description: string;
//     profile: string;
//     name: string;
//     date: string;
//   } | null;
// }> = ({ isOpen, onClose, announcement }) => {
//   if (!isOpen || !announcement) return null;

//   return (
//     <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
//       <div className="relative flex justify-end flex-col items-end bg-white p-4 rounded-md w-[80%] max-w-[600px]">
//         <FaWindowClose onClick={onClose} className="absolute top-0 my-2 right-1 text-2xl cursor-pointer" />
//         <div className="flex flex-col items-center">
//           <Image
//             src={announcement.image}
//             alt="Announcement Image"
//             width={600}
//             height={400}
//             className="w-full rounded-lg mt-4 h-auto"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const AnnouncementComponent: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { announcements, status, error } = useSelector((state: RootState) => state.announcements);
//   const [getAll, setGetAll] = useState<boolean>(true);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState<{
//     image: string;
//     description: string;
//     profile: string;
//     name: string;
//     date: string;
//   } | null>(null);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchAnnouncements(getAll));
//     }
//   }, [dispatch, status]);

//   const openModal = (announcement: Announcement) => {
//     setSelectedAnnouncement({
//       image: announcement.image,
//       description: announcement.description,
//       profile: announcement.announcer.image,
//       name: `${announcement.announcer.firstName.charAt(0)}. ${announcement.announcer.lastName}`,
//       date: dayjs(announcement.createdDate).format('MMM, DD, YYYY hh:mmA'),
//     });
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedAnnouncement(null);
//   };

//   const handleEdit = (announcement: Announcement) => {
//     setSelectedAnnouncement({
//       image: announcement.image,
//       description: announcement.description,
//       profile: announcement.announcer.image,
//       name: `${announcement.announcer.firstName.charAt(0)}. ${announcement.announcer.lastName}`,
//       date: dayjs(announcement.createdDate).format('MMM, DD, YYYY hh:mmA'),
//     });
//     // Open edit modal via EditDeleteAnnouncement component
//   };

//   const handleDelete = (id: number) => {
//     // Open delete modal via EditDeleteAnnouncement component
//   };

//   return (
//     <section className="mx-4 xl:mx-10 lg:mx-10 mt-5">
//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5  pb-16">
//         {status === 'loading' ? (
//           Array.from({ length: 9 }).map((_, index) => (
//             <div key={index} className="bg-gray-300 p-2 rounded-md">
//               <Skeleton />
//             </div>
//           ))
//         ) : status === 'failed' ? (
//           <div className="text-red-500">Failed to fetch announcements: {error}</div>
//         ) : Array.isArray(announcements) ? (
//           announcements.map((announcement) => (
//             <div
//               key={announcement.id}
//               className="relative flex flex-col bg-[#FDC90E] h-auto w-full rounded-md text-black p-2 mb-2"
//             >
//               <div className="flex">
//                 {announcement.image && (
//                   <Image
//                     src={announcement.image}
//                     alt={`announcement-image-${announcement.id}`}
//                     width={160}
//                     height={150}
//                     className="w-[160px] rounded-lg h-[150px] mx-2 cursor-pointer"
//                     onClick={() => openModal(announcement)}
//                   />
//                 )}
//                 <div className="flex flex-col flex-grow justify-between">
//                 <div
//   className="flex-grow font-medium text-[13px] py-2 mr-5"
//   dangerouslySetInnerHTML={{ __html: announcement.description || "No description available" }}
// ></div>

//                   <div className="flex justify-between items-center mt-2">
//                     <div className="flex items-center">
//                       <Image
//                         src={announcement.announcer?.image || defaultProfile}
//                         alt="Profile"
//                         width={24}
//                         height={24}
//                       />
//                       <p className="ml-2 text-[13px]">
//                         {announcement.announcer?.firstName.charAt(0)}. {announcement.announcer?.lastName}
//                       </p>
//                     </div>
//                     <div className="text-[12px] text-[#404040]">
//                       {dayjs(announcement.createdDate).format('MMM, DD, YYYY hh:mmA')}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute right-2 top-2">
//                 <EditDeleteAnnouncement
//                   announcement={announcement}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                 />
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-red-500">Data is not an array</div>
//         )}
//       </div>
//       <Modal isOpen={isModalOpen} onClose={closeModal} announcement={selectedAnnouncement} />
//     </section>
//   );
// };

// export default AnnouncementComponent;

