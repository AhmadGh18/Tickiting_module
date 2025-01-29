// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaWindowClose } from 'react-icons/fa';
// import ImageAttachment from '@/components/common/ImageAttachement';
// import { editAnnouncementThunk } from '@/redux/slices/announcementSlice'; // Adjust the import based on your file structure
// import Swal from 'sweetalert2';
// import Loader from '../../common/loader/loader';
// import { RootState, AppDispatch } from '@/redux/store'; 
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// // Import AppDispatch for correct typing

// interface EditAnnouncementFormProps {
//   onClose: () => void;
//   announcement: {
//     id: number; // Assuming id is a number
//     description: string;
//     startDate: string;
//     endDate: string;
//     image: string | null; // Assuming image is a URL or null
//   } | null;
// }

// const EditAnnouncementForm: React.FC<EditAnnouncementFormProps> = ({ onClose, announcement }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const descriptionRef = useRef<HTMLInputElement>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [description, setDescription] = useState<string>('');
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);
//   const [existingImage, setExistingImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (descriptionRef.current) {
//       descriptionRef.current.focus();
//     }
//     if (announcement) {
//       setDescription(announcement.description);
//       setStartDate(announcement.startDate);
//       setEndDate(announcement.endDate);
//       setExistingImage(announcement.image? announcement.image : null);
      
//     }
//   }, [announcement]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('id', announcement?.id.toString() ?? ''); // Convert id to string
//     formData.append('body', description);
//     formData.append('startDate', startDate);
//     formData.append('endDate', endDate);
//     formData.append('isImageRemoved', 'false');

//     if (selectedImages.length > 0) {
//       formData.append('file', selectedImages[0]);
//     } 
    

//     try {
//       setLoading(true);

//       await dispatch(editAnnouncementThunk(formData)).unwrap();
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Announcement edited successfully!',
//         customClass: {
//           confirmButton: 'custom-ok-button',
//         },
//       });
//       onClose();
//     } catch (error: any) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.message || 'Failed to edit the announcement.',
//         customClass: {
//           confirmButton: 'custom-no-button',
//         },
//       });  
//     }
//     finally {
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
//         <div className="bg-[#F4F4F4] w-[650px] max-w-lg min-h-screen relative">
//           <div className='flex p-2 bg-white border-y border-y-[#E4E4E4] justify-between items-center'>
//             <FaWindowClose onClick={onClose} className='text-3xl cursor-pointer' />
//             <h2 className="text-center text-[20px] font-bold mt-1">Edit Announcement</h2>
//             <button 
//               className="bg-[#FDC90E] hover:bg-black mt-1 hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-10"
//               onClick={handleSubmit}
//             >
//               Save
//             </button>
//           </div>
//           <div className="mt-[30px] mx-[30px] flex flex-col space-y-7 overflow-y-auto custom-scrollbar h-[calc(100vh-80px)]">
//           <div>
//   <label className="block font-bold mb-1">Description</label>
//   <div className="w-full border rounded-md">
//     <CKEditor
//       editor={ClassicEditor}
//       data={description} // Initialize CKEditor with the current description value
//       onChange={(event, editor) => {
//         const data = editor.getData(); // Get updated content from CKEditor
//         setDescription(data); // Update the state with the new content
//       }}
//       config={{
//         toolbar: [
//           'bold', 'italic', 'underline', 'strikethrough',
//           'fontColor', 'fontBackgroundColor',
//           'fontSize', 'fontFamily',
//           'bulletedList', 'numberedList',
//           'alignment',
//           'undo', 'redo',
//         ],
//         placeholder: "Description", // Add placeholder text
//       }}
//     />
//   </div>
// </div>


//             <div>
//               <label className="block font-bold mb-1">Start Date</label>
//               <input
//                 type="datetime-local"
//                 className="w-full px-2 py-2 border rounded-md bg-white"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="block font-bold mb-1">End Date</label>
//               <input
//                 type="datetime-local"
//                 className="w-full px-2 py-2 border rounded-md bg-white"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </div>

//             <div>
//             <ImageAttachment 
//                 selectedImages={selectedImages} 
//                 setSelectedImages={setSelectedImages} 
//                 existingImage={existingImage}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EditAnnouncementForm;