"use client";
import React, { useEffect, useRef, useState } from "react";
import "primeicons/primeicons.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";
const EditTicket = ({ setIsOpen }) => {
  const [ticketInfo, setTicketInfo] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Opened",
    assignedTo: "",
    files: [],
  });
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(timer);
  }, [setIsOpen]);
  const quillRef = useRef(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(timer);
  }, [setIsOpen]);

  useEffect(() => {
    if (!quillRef.current || quillInstanceRef.current) return;

    quillInstanceRef.current = new Quill(quillRef.current, {
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
        
        ],
      },
      placeholder: "Enter Description ...",
      theme: "snow",
    });

    quillInstanceRef.current.on("text-change", () => {
      setTicketInfo((prev) => ({
        ...prev,
        description: quillInstanceRef.current.root.innerHTML,
      }));
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicketInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setTicketInfo((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    setTicketInfo((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(ticketInfo);
  };

  return (
    <div className="max-w-lg mx-auto  bg-gray-100 md:mt-[-40px] p-6 rounded-lg shadow-md absolute md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full top-[30vh]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="pi pi-times text-xl text-white bg-black p-2 rounded-md hover:text-red-500 transition-all"
          onClick={() => setIsOpen(false)}
        ></button>
        <h2 className="text-xl font-bold">New Ticket</h2>
        <button
          className="bg-yellow-400 px-4 py-2 text-black font-semibold rounded-lg"
          onClick={handleSubmit}
        >
          edit
        </button>
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
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
          placeholder="Title"
          
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <div ref={quillRef} className="h-[200px] bg-white border rounded-md p-2"></div>
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
              {priority === "Urgent" ? "🔴" : priority === "High" ? "🟠" : priority === "Medium" ? "🔵" : "🟡"}{" "}
              {priority}
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
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Select Member</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
        </select>
      </div>

      {/* Attach Files */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Attach Files</label>
        <div className="flex gap-2 mb-2">
          <button className="bg-green-300 text-green-900 p-2 rounded-full pi-image pi"></button>
          <button className="text-gray-800 p-2 rounded-full pi-paperclip pi"></button>
          <button className="rounded-lg p-2 text-xl text-blue-600 pi-microphone pi"></button>
        </div>
        <div
          className="border-dashed border-2 p-4 text-center text-gray-500 rounded-md"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer bg-gray-300 px-4 py-2 rounded-md">
            Browse...
          </label>
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


export default EditTicket;