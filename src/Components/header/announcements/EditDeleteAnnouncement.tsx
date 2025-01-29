// import React, { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import DeleteModal from '../common/DeleteModal';
// import EditAnnouncementForm from '../../components/announcements/form/EditAnnouncementForm';

// interface EditDeleteAnnouncementProps {
//   announcement: any;
//   onEdit: (announcement: any) => void;
//   onDelete: (id: number) => void;
// }

// const EditDeleteAnnouncement: React.FC<EditDeleteAnnouncementProps> = ({ announcement, onEdit, onDelete }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleClickOutside = (event: MouseEvent) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const openEditModal = () => {
//     setEditModalOpen(true);
//     setIsOpen(false);
//   };

//   const closeEditModal = () => setEditModalOpen(false);

//   const openDeleteModal = () => {
//     setDeleteModalOpen(true);
//     setIsOpen(false);
//   };

//   const closeDeleteModal = () => setDeleteModalOpen(false);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={toggleDropdown}
//         className="flex items-center px-1 py-1 rounded-full hover:bg-gray-100 hover:rounded-full focus:outline-none z-30"
//         aria-expanded={isOpen}
//         aria-haspopup="true"
//       >
//         <BsThreeDotsVertical />
//       </button>
//       <div
//         className={`transition-all duration-300 ease-out absolute right-3 w-32 bg-white rounded-lg shadow-lg z-40
//           ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
//         style={{ transformOrigin: 'top' }}
//       >
//         <div
//           className="flex items-center p-2 cursor-pointer hover:rounded-t-lg hover:bg-gray-100 font-medium text-[15px] w-full"
//           onClick={openEditModal}
//         >
//           <Image src="/edit.svg" alt="Edit" width={16} height={16} />
//           <span className="pl-2">Edit</span>
//         </div>
//         <div
//           className="flex items-center p-2 cursor-pointer hover:rounded-b-lg hover:bg-gray-100 font-medium text-[15px] w-full"
//           onClick={openDeleteModal}
//         >
//           <Image src="/delete.svg" alt="Delete" width={16} height={16} />
//           <span className="pl-2">Delete</span>
//         </div>
//       </div>
//       {isDeleteModalOpen && (
//         <DeleteModal
//           isOpen={isDeleteModalOpen}
//           onClose={closeDeleteModal}
//           entityId={announcement.id}
//           entityType="announcement"
//         />
//       )}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
//           <EditAnnouncementForm
//             onClose={closeEditModal}
//             announcement={announcement}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditDeleteAnnouncement;
