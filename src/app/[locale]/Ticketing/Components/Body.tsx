"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu } from "primereact/menu";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Image from "next/image";

type Ticket = {
  id: string;
  title: string;
  assignedTo: string;
  assignee: string;
  priority: string;
  dueDate: string;
  color: string;
  image: string;
};

type TicketStatus = "opened" | "closed" | "progress" | "archived";

type Tickets = {
  [key in TicketStatus]: Ticket[];
};

const tickets: Tickets = {
  opened: [
    {
      id: "1",
      title: "Frontend",
      assignedTo: "Ali Khalife",
      assignee: "Riham2 Khafeja",
      priority: "urgent",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "",
    },
    {
      id: "7",
      title: "UI/UX",
      assignedTo: "Ali Khalife",
      assignee: "Riham2 Khafeja",
      priority: "urgent",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "",
    },
    {
      id: "4",
      title: "Security",
      assignedTo: "Ali Khalife",
      assignee: "Riham2 Khafeja",
      priority: "medium",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "",
    },
    {
      id: "2",
      title: "Backend",
      assignedTo: "Ali Khalife",
      assignee: "Mhmd Hashem",
      priority: "high",
      dueDate: "Dec 17, 2024",
      color: "border-yellow-500",
      image: "",
    },
  ],
  closed: [
    {
      id: "3",
      title: "Database",
      assignedTo: "Ali Khalife",
      assignee: "Ali Moussa",
      priority: "urgent",
      dueDate: "Dec 17, 2024",
      color: "border-green-500",
      image: "",
    },
  ],
  progress: [
    {
      id: "9",
      title: "MobileApp",
      assignedTo: "Ali Khalife",
      assignee: "Ali Moussa",
      priority: "low",
      dueDate: "Dec 17, 2024",
      color: "border-blue-500",
      image: "",
    },
  ],
  archived: [
    {
      id: "10",
      title: "C++",
      assignedTo: "Ali Khalife",
      assignee: "Ali Moussa",
      priority: "medium",
      dueDate: "Dec 17, 2024",
      color: "border-gray-500",
      image: "",
    },
  ],
};

const statusColors: Record<string, string> = {
  opened: "bg-yellow-500",
  closed: "bg-green-500",
  progress: "bg-blue-500",
  archived: "bg-gray-500",
};

const priorityColors: Record<string, string> = {
  urgent: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-blue-500",
  low: "bg-yellow-500",
};

const Body = () => {
  const menu = useRef<Menu | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [visibleDialog, setVisibleDialog] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

//   horizontal scroll functionality
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
    }
  };

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const handleResize = () => updateScrollButtons();

    if (scrollContainerRef.current) {
      updateScrollButtons();
      scrollContainerRef.current.addEventListener("scroll", updateScrollButtons);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      if (scrollContainerRef.current) scrollContainerRef.current.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

//   this is the menu items for the options menu (dummy dialog to be changed)
  const ticketMenuItems = (id: string) => [
    { label: "View Ticket", icon: "pi pi-eye", command: () => setVisibleDialog("view") },
    { label: "Edit Ticket", icon: "pi pi-pencil", command: () => setVisibleDialog("edit") },
  ];

  return (
    <div className="relative p-4 font-sans">
      {canScrollLeft && (
        <Button
          className="absolute top-1/2 left-0 z-10 ml-2 bg-gray-800 text-white rounded-full p-3 -translate-y-1/2"
          icon="pi pi-chevron-left"
          onClick={() => scroll("left")}
        />
      )}
      {canScrollRight && (
        <Button
          className="absolute top-1/2 right-0 z-10 mr-2 bg-gray-800 text-white rounded-full p-3 -translate-y-1/2"
          icon="pi pi-chevron-right"
          onClick={() => scroll("right")}
        />
      )}

      <div ref={scrollContainerRef} className="flex gap-4 overflow-x-hidden scrollbar-hide">
        {Object.entries(tickets).map(([status, ticketList]) => (
          <div key={status} className="flex flex-col bg-white shadow-lg rounded-lg p-4 w-96 flex-shrink-0" style={{ height: "calc(100vh - 100px)" }}>
            <div className="flex items-center mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full ${statusColors[status as keyof typeof statusColors]}`} />
                <h3 className="text-lg font-semibold capitalize">{status}</h3>
              </div>
              <Badge value={ticketList.length} className="ml-2 bg-gray-400 text-white rounded-lg px-3 py-1 text-sm" />
            </div>
            <div className="overflow-y-auto pr-3">
              {ticketList.map((ticket) => (
                <Card key={ticket.id} className={`mb-4 shadow-md border-l-4 ${ticket.color} bg-gray-200 rounded-xl p-3 flex flex-col`}>
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-lg">{ticket.title}</h1>
                    <Button icon="pi pi-ellipsis-v" className="p-button-text" onClick={(e) => menu.current?.toggle(e)} />
                    <Menu model={ticketMenuItems(ticket.id)} popup ref={menu} className="bg-white shadow-lg border-none rounded-lg" />
                  </div>
                  <div className="flex justify-between items-center mt-3 mb-3 text-gray-800">
                    <div className="flex items-center gap-1">
                      <i className="pi pi-user text-blue-500" style={{ fontSize: "0.8rem" }}></i>
                      <Image src={ticket.image} width={20} height={20} className="rounded-full" alt="" />
                      <span className="text-sm font-medium">{ticket.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="pi pi-user-edit text-purple-500" style={{ fontSize: "0.8rem" }}></i>
                      <Image src={ticket.image} width={20} height={20} className="rounded-full" alt="" />
                      <span className="text-sm font-medium">{ticket.assignee}</span>
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-2 mt-auto">
                    <Badge value={ticket.priority} className={`py-1 px-2 rounded-full text-white ${priorityColors[ticket.priority]}`} />
                    <div className="flex items-center gap-2 bg-white py-1 px-2 rounded-full">
                      <i className="pi pi-calendar text-gray-600"></i>
                      <span className="text-sm text-gray-600 font-medium">{ticket.dueDate}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* This is dummy dialog for options menu */}
      <Dialog className="bg-slate-400 p-6 rounded-md" visible={visibleDialog !== null} onHide={() => setVisibleDialog(null)} header={visibleDialog === "view" ? "View Ticket" : "Edit Ticket"}>
        <p>Ticket add/edit component goes here. this is dummy component</p>
      </Dialog>
    </div>
  );
};

export default Body;