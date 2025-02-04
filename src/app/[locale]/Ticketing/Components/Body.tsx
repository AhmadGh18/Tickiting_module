"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu } from "primereact/menu";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Image from "next/image";
import EditTicket from "./EditTicket";
import ViewTicket from "./ViewTicket";

// ----- Data Types and Tickets Source -----
type Ticket = {
  id: number;
  title: string;
  assignedTo: string;
  assignee: string;
  priority: string;
  dueDate: string;
  color: string;
  image: string;
};

type Tickets = {
  [key: string]: Ticket[];
};

const tickets: Tickets = {
  opened: [
    {
      id: 1,
      title: "Frontend",
      assignedTo: "Ali Khalife",
      assignee: "Riham2 Khafeja",
      priority: "urgent",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
    {
      id: 7,
      title: "UI/UX",
      assignedTo: "Ali Khalife",
      assignee: "Riham2 Khafeja",
      priority: "urgent",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
    {
      id: 4,
      title: "Security",
      assignedTo: "Ali Khalife",
      assignee: "Riham2 Khafeja",
      priority: "medium",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
    {
      id: 2,
      title: "Backend",
      assignedTo: "Ali Khalife",
      assignee: "Mhmd Hashem",
      priority: "high",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
  ],
  closed: [
    {
      id: 3,
      title: "Database",
      assignedTo: "Ali Khalife",
      assignee: "Ali Moussa",
      priority: "urgent",
      dueDate: "Dec 17, 2024",
      color: "border-green-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
  ],
  progress: [
    {
      id: 9,
      title: "MobileApp",
      assignedTo: "Ali Khalife",
      assignee: "Ali Moussa",
      priority: "low",
      dueDate: "Dec 17, 2024",
      color: "border-blue-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
  ],
  archived: [
    {
      id: 10,
      title: "C++",
      assignedTo: "Ali Khalife",
      assignee: "Ali Moussa",
      priority: "medium",
      dueDate: "Dec 17, 2024",
      color: "border-gray-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
  ],
  opxxened: [
    {
      id: 1,
      title: "Frontend",
      assignedTo: "Ali Khalife",
      assignee: "Riham2 Khafeja",
      priority: "urgent",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
    {
      id: 7,
      title: "UI/UX",
      assignedTo: "Ali Khalife",
      assignee: "Riham2 Khafeja",
      priority: "urgent",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
    {
      id: 4,
      title: "Security",
      assignedTo: "Ali Khalife",
      assignee: "Riham2 Khafeja",
      priority: "medium",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
    {
      id: 2,
      title: "Backend",
      assignedTo: "Ali Khalife",
      assignee: "Mhmd Hashem",
      priority: "high",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
  ],
  clocsed: [
    {
      id: 3,
      title: "Database",
      assignedTo: "Ali Khalife",
      assignee: "Ali Moussa",
      priority: "urgent",
      dueDate: "Dec 17, 2024",
      color: "border-green-500",
      image: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
  ],
  
};

// ----- Styling Constants for Carousel -----
const CARD_GAP = 16; // gap-4 ≈ 16px
const DESKTOP_VISIBLE_COUNT = 4; // Desired number of cards on desktop

// Status colors mapping
const statusColors: { [key: string]: string } = {
  opened: "bg-yellow-500",
  closed: "bg-green-500",
  progress: "bg-blue-500",
  archived: "bg-gray-500",
};

// Priority colors mapping
const priorityColors: { [key: string]: string } = {
  urgent: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

// ----- Main Component -----
const Body = () => {
  const menu = useRef<Menu | null>(null);
  const desktopContainerRef = useRef<HTMLDivElement | null>(null);
  const [visibleDialog, setVisibleDialog] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Automatically extract statuses from the tickets object.
  const ticketEntries = Object.entries(tickets);
  const totalCards = ticketEntries.length;

  // Carousel state: starting index, visible count, and dynamic card width.
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(
    Math.min(DESKTOP_VISIBLE_COUNT, totalCards)
  );
  const [cardWidth, setCardWidth] = useState(300); // dummy initial value

  // Calculate how many cards can fit & update card width so that exactly visibleCount fill the container.
  const updateVisibleCount = () => {
    if (desktopContainerRef.current) {
      const containerWidth = desktopContainerRef.current.clientWidth;
      // Use the fixed desired count (or less if not enough cards)
      const count = Math.min(DESKTOP_VISIBLE_COUNT, totalCards);
      setVisibleCount(count);
      // Calculate new card width so that cards and gaps fill the container exactly.
      const newWidth = (containerWidth - (count - 1) * CARD_GAP) / count;
      setCardWidth(newWidth);
      // Ensure startIndex is within bounds.
      if (startIndex > totalCards - count) {
        setStartIndex(Math.max(totalCards - count, 0));
      }
    }
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [startIndex, totalCards]);

  // Navigation functions for carousel.
  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setStartIndex((prev) => Math.min(prev + 1, totalCards - visibleCount));

  // Menu items for ticket options.
  const ticketMenuItems = (id: string) => [
    { label: "View Ticket", icon: "pi pi-eye", command: () => setVisibleDialog("view") },
    { label: "Edit Ticket", icon: "pi pi-pencil", command: () => setIsFormOpen(true) },
  ];

  return (
    <div className="relative p-4 font-sans">
      {/* Desktop Layout: Animated Carousel */}
      <div className="hidden sm:block">
        <div className="relative" ref={desktopContainerRef}>
          {startIndex > 0 && (
            <Button
              className="absolute top-1/2 left-0 z-10 ml-2 bg-gray-800 text-white rounded-lg p-3 -translate-y-1/2"
              icon="pi pi-chevron-left"
              onClick={handlePrev}
            />
          )}
          {startIndex + visibleCount < totalCards && (
            <Button
              className="absolute top-1/2 right-0 z-10 mr-2 bg-gray-800 text-white rounded-lg p-3 -translate-y-1/2"
              icon="pi pi-chevron-right"
              onClick={handleNext}
            />
          )}

          {/* Overflow hidden wrapper */}
          <div
            className="overflow-hidden"
            style={{ height: "calc(100vh - 155px)" }}
          >
            {/* Animated flex container for all cards */}
            <div
              className="flex gap-4 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * (cardWidth + CARD_GAP)}px)`,
              }}
            >
              {ticketEntries.map(([status, ticketList]) => (
                <div
                  key={status}
                  className="flex flex-col bg-white shadow-lg rounded-lg p-4 flex-shrink-0"
                  style={{ width: `${cardWidth}px`, height: "calc(100vh - 155px)" }}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full ${statusColors[status]}`} />
                      <h3 className="text-lg font-semibold capitalize">{status}</h3>
                    </div>
                    <Badge
                      value={ticketList.length}
                      className="ml-2 bg-gray-400 text-white rounded-lg px-3 py-1 text-sm"
                    />
                  </div>
                  <div className="overflow-y-auto pr-3">
                    {ticketList.map((ticket) => (
                      <Card
                        key={ticket.id}
                        className={`mb-4 shadow-md border-l-4 ${ticket.color} bg-gray-200 rounded-xl p-3 flex flex-col`}
                      >
                        <div className="flex justify-between items-center">
                          <h1 className="font-bold text-lg">{ticket.title}</h1>
                          <Button
                            icon="pi pi-ellipsis-v"
                            className="p-button-text"
                            onClick={(e) => menu.current?.toggle(e)}
                          />
                          <Menu
                            model={ticketMenuItems(ticket.id.toString())}
                            popup
                            ref={menu}
                            className="bg-white shadow-lg border-none rounded-lg"
                          />
                        </div>
                        <div className="flex justify-between items-center mt-3 mb-3 text-gray-800">
                          <div className="flex items-center gap-1">
                            <i className="pi pi-user text-blue-500" style={{ fontSize: "0.8rem" }}></i>
                            <Image
                              src={ticket.image}
                              width={20}
                              height={20}
                              className="rounded-full"
                              alt=""
                            />
                            <span className="text-sm font-medium">{ticket.assignedTo}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <i className="pi pi-user-edit text-purple-500" style={{ fontSize: "0.8rem" }}></i>
                            <Image
                              src={ticket.image}
                              width={20}
                              height={20}
                              className="rounded-full"
                              alt=""
                            />
                            <span className="text-sm font-medium">{ticket.assignee}</span>
                          </div>
                        </div>
                        <div className="flex justify-end items-center gap-2 mt-auto">
                          <Badge
                            value={ticket.priority}
                            className={`py-1 px-2 rounded-full text-white ${priorityColors[ticket.priority]}`}
                          />
                          <div className="flex items-center gap-2 bg-white py-1 px-2 rounded-full">
                            <i className="pi pi-calendar text-gray-600"></i>
                            <span className="text-sm text-gray-600 font-medium">
                              {ticket.dueDate}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout: Vertical stacking */}
      <div className="block sm:hidden transform-scale-90">
        {ticketEntries.map(([status, ticketList]) => (
          <div key={status} className="mb-6 bg-white p-3 rounded-md">
            <div className="flex items-center mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full ${statusColors[status]}`} />
                <h3 className="text-lg font-semibold capitalize">{status}</h3>
              </div>
              <Badge
                value={ticketList.length}
                className="ml-2 bg-gray-400 text-white rounded-lg px-3 py-1 text-sm"
              />
            </div>
            {ticketList.map((ticket) => (
              <Card
                key={ticket.id}
                className={`mb-4 shadow-md border-l-4 ${ticket.color} bg-gray-200 rounded-xl p-3 flex flex-col`}
              >
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">{ticket.title}</h1>
                  <Button
                    icon="pi pi-ellipsis-v"
                    className="p-button-text"
                    onClick={(e) => menu.current?.toggle(e)}
                  />
                  <Menu
                    model={ticketMenuItems(ticket.id.toString())}
                    popup
                    ref={menu}
                    className="bg-white shadow-lg border-none rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center mt-3 mb-3 text-gray-800">
                  <div className="flex items-center gap-1">
                    <i className="pi pi-user text-blue-500" style={{ fontSize: "0.8rem" }}></i>
                    <Image
                      src={ticket.image}
                      width={20}
                      height={20}
                      className="rounded-full"
                      alt=""
                    />
                    <span className="text-sm font-medium">{ticket.assignedTo}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="pi pi-user-edit text-purple-500" style={{ fontSize: "0.8rem" }}></i>
                    <Image
                      src={ticket.image}
                      width={20}
                      height={20}
                      className="rounded-full"
                      alt=""
                    />
                    <span className="text-sm font-medium">{ticket.assignee}</span>
                  </div>
                </div>
                <div className="flex justify-end items-center gap-2 mt-auto">
                  <Badge
                    value={ticket.priority}
                    className={`py-1 px-2 rounded-full text-white ${priorityColors[ticket.priority]}`}
                  />
                  <div className="flex items-center gap-2 bg-white py-1 px-2 rounded-full">
                    <i className="pi pi-calendar text-gray-600"></i>
                    <span className="text-sm text-gray-600 font-medium">
                      {ticket.dueDate}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>

      {/* Dummy dialog for ticket view/edit */}
      <Dialog
        className="bg-slate-400 p-6 rounded-md"
        visible={visibleDialog !== null}
        onHide={() => setVisibleDialog(null)}
        header={visibleDialog === "view" ? "View Ticket" : "Edit Ticket"}
      >
        <p>Ticket add/edit component goes here. This is a dummy component.</p>
      </Dialog>

      {/* Uncomment below to render EditTicket when needed */}
      {/* {isFormOpen && <EditTicket setIsOpen={setIsFormOpen} />} */}
      {/* <ViewTicket /> can be rendered similarly if needed */}
    </div>
  );
};

export default Body;
