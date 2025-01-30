"use client";  
import React, { useEffect, useRef, useState } from 'react';
import "primeicons/primeicons.css";
import { Editor } from "primereact/editor";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Tickitingform = () => {
  const [showForm, setShowForm] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Opened",
    assignedTo: "",
    files: [],
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quillInstance = new Quill(quillRef.current, {
        modules: {
          toolbar: "#toolbar",
        },
        placeholder: "Enter Description ...",
        theme: "snow",
      });

      quillInstance.on("text-change", () => {
        setTicketInfo((prev) => ({
          ...prev,
          description: quillInstance.root.innerHTML, 
        }));
      });
    }
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setTicketInfo((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle file selection via browse
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setTicketInfo((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };
  const handlesubmit=(e)=>{
    e.preventDefault();
    console.log(ticketInfo)
    }
  return (
    <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className='bg-black p-1 flex justify-center items-center rounded-md'>
          <button className="pi pi-times text-xl text-white font-extrabold hover:text-red-500 transition-all"></button>
        </div>
        <h2 className="text-xl font-bold">New Ticket</h2>
        <button className="bg-yellow-400 px-4 py-2 text-black font-semibold rounded-lg " onClick={handlesubmit}>Save</button>
      </div>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={ticketInfo.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Title"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <div id="toolbar">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-list" value="bullet"></button>
          <button className="ql-align" value=""></button>
          <button className="ql-align" value="right"></button>
        </div>
        <div ref={quillRef} className="h-[200px] overflow-auto bg-white border rounded-md p-2" />
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Priority</label>
        <div className="flex gap-2">
          {["Urgent", "High", "Medium", "Low"].map((priority) => (
            <button
              key={priority}
              onClick={() => setTicketInfo({ ...ticketInfo, priority })}
              className={`font-bold px-3 py-1 rounded-full text-xs ${
                ticketInfo.priority === priority ? "bg-gray-300" : ""
              }`}
            >
              {priority === "Urgent" ? "🔴" : priority === "High" ? "🟠" : priority === "Medium" ? "🔵" : "🟡"} {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Status</label>
        <div className="flex gap-2">
          {["Opened", "Closed"].map((status) => (
            <button
              key={status}
              onClick={() => setTicketInfo({ ...ticketInfo, status })}
              className={`font-bold px-3 py-1 rounded-full text-xs ${
                ticketInfo.status === status ? "bg-gray-300" : ""
              }`}
            >
              {status === "Opened" ? "🟡" : "🟢"} {status}
            </button>
          ))}
        </div>
      </div>

      {/* Assigned To */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          Assigned to <span className="text-red-500">*</span>
        </label>
        <select
          name="assignedTo"
          value={ticketInfo.assignedTo}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Select Member</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
        </select>
      </div>

      {/* Attach Files with Drag & Drop or Browse */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Attach Files</label>
        <div className="flex gap-2 mb-2">
          <button className="bg-green-300 text-green-900 p-2 rounded-full pi-image pi"></button>
          <button className="text-gray-800 p-2 rounded-full pi-paperclip pi"></button>
          <button className="rounded-lg p-2 text-xl text-blue-600 pi-microphone pi"></button>
        </div>
        <div
          className="border-dashed border-2 p-4 text-center text-gray-500 rounded-md"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input type="file" multiple onChange={handleFileSelect} className="hidden" id="fileUpload" />
          <label htmlFor="fileUpload" className="cursor-pointer bg-gray-300 px-4 py-2 rounded-md">Browse...</label>
          <p className="text-xs mt-1">Or drop files here</p>
        </div>

        {/* Display Uploaded Files */}
        {ticketInfo.files.length > 0 && (
          <div className="mt-2">
            <h3 className="text-sm font-semibold mb-1">Uploaded Files:</h3>
            <ul className="text-xs text-gray-700">
              {ticketInfo.files.map((file, index) => (
                <li key={index} className="flex items-center gap-2">
                  📄 {file.name} <span className="text-gray-500 text-xs">({(file.size / 1024).toFixed(2)} KB)</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickitingform;
