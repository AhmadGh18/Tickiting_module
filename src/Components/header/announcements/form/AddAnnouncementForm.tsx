// import React, { useState, useEffect, useRef } from 'react';
// import { FaWindowClose } from 'react-icons/fa';
// import ImageAttachment from '@/components/common/ImageAttachement';
// import { useDispatch } from 'react-redux';
// import { addAnnouncementThunk } from '@/redux/slices/announcementSlice';
// import Swal from 'sweetalert2';
// import Loader from '../../common/loader/loader';
// import { AnnouncementPayload } from '@/types/AnnouncementTypes';
// import { AppDispatch } from '@/redux/store';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


// interface AddAnnouncementFormProps {
//   onClose: () => void;
// }

// const AddAnnouncementForm: React.FC<AddAnnouncementFormProps> = ({ onClose }) => {
//   const descriptionRef = useRef<HTMLInputElement>(null);
  
//   useEffect(() => {
//     descriptionRef.current?.focus();
//   }, []);

//   const [description, setDescription] = useState<string>('');
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
  
//   const dispatch = useDispatch<AppDispatch>();

//   const handleFormSubmit = async () => {
//     if (!description || !startDate || !endDate || selectedImages.length === 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Validation Error',
//         text: 'Please fill in all fields and select an image.',
//         customClass: {
//           confirmButton: 'custom-no-button',
//         },
//       });
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       const payload: AnnouncementPayload = {
//         body: description,
//         startDate,
//         endDate,
//         file: selectedImages[0],
//       };
  
//       await dispatch(addAnnouncementThunk(payload)).unwrap();
  
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Announcement added successfully!',
//         customClass: {
//           confirmButton: 'custom-ok-button',
//         },
//       });
  
//       onClose();
//     } catch (error: any) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.message || 'Failed to add the announcement.',
//         customClass: {
//           confirmButton: 'custom-no-button',
//         },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section>
//       <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
//       <div className="fixed inset-0 top-0 left-0 min-h-screen flex items-end justify-end z-50">
//         {loading && (
//           <div className="absolute inset-0 flex justify-center items-center z-10">
//             <Loader />
//           </div>
//         )}
//     <div className="bg-[#F4F4F4] w-[650px] max-w-lg min-h-screen relative">
//     <div className='flex p-2 bg-white border-y border-y-[#E4E4E4] justify-between items-center'>
//             <FaWindowClose onClick={onClose} className='text-3xl cursor-pointer' />
//             <h2 className="text-center text-[20px] font-bold mt-1">Announcement</h2>
//             <button 
//               className="bg-[#FDC90E] mt-1 hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1
//               px-10"
//               onClick={handleFormSubmit}
//             >
//               Save
//             </button>
//           </div>
//           {/* Form content */}
//           <div className="mt-[30px] mx-[30px] flex flex-col space-y-7 overflow-y-auto custom-scrollbar h-[calc(100vh-80px)]">
//           <div>
//   <label className="block font-bold mb-1">Description</label>
//   <div className="w-full border rounded-md">
//     <CKEditor
//       editor={ClassicEditor}
//       data={description} // Initialize with the current description state
//       onChange={(event, editor) => {
//         const data = editor.getData(); // Get the updated content from CKEditor
//         setDescription(data); // Update the description state with the new value
//       }}
//       config={{
//         toolbar: [
//           'bold', 'italic', 'underline', 'strikethrough',
//           'fontColor', 'fontBackgroundColor',
//           'fontSize', 'fontFamily',
//           'bulletedList', 'numberedList',
//           'alignment',
//           'undo', 'redo'
//         ],
//         placeholder: "Description", // Placeholder text
//       }}
//     />
//   </div>
// </div>

//             <div>
//               <label className="block font-bold mb-1">Start Date</label>
//               <div className="flex items-center">
//                 <input
//                   type="datetime-local"
//                   className="w-full px-2 py-2 border rounded-md bg-white"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block font-bold mb-1">End Date</label>
//               <div className="flex items-center">
//                 <input
//                   type="datetime-local"
//                   className="w-full px-2 py-2 border rounded-md bg-white"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </div>
//             </div>
//             <label className="block font-semibold">Attach Image</label>
//             <ImageAttachment selectedImages={selectedImages} setSelectedImages={setSelectedImages} existingImage={null} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddAnnouncementForm;
