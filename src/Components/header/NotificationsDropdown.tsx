"use client";
import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { FaWindowClose } from "react-icons/fa";
import notificationIcon from "../../../public/notification_icon.png";
import taskIcon from "../../../public/notification_task_icon.png";
import ticketIcon from "../../../public/notification_ticket_icon.png";
import commentIcon from "../../../public/notification_comments_icon.png";
import quoteIcon from "../../../public/notification_quotes_icon.png";
import clockinIcon from "../../../public/notification_clockin_icon.png";
import reportIcon from "../../../public/notification_reports_icon.png";
import notesIcon from "../../../public/notification_notes_icon.png";
import projectsIcon from "../../../public/notification_project_icon.png";
import nonotifications from "../../../public/notification_illustration.png";
import useLocale from '@/Hooks/useLocale';
import Link from 'next/link';

// Define a string literal type for notification types
type NotificationType = 'notification' | 'task' | 'ticket' | 'comment' | 'quote' | 'clockin' | 'report' | 'notes' | 'projects' | 'general';

// Define the interface for a notification
interface Notification {
  id: number;
  senderImage: string;
  type: NotificationType;
  description: string;
  sendDate: string;
  senderName: string;
}

interface NotificationsDropDownProps {
  isVisible: boolean;
  onClose: () => void;
}

const notificationTypes: Record<NotificationType, { color: string; icon: StaticImageData }> = {
  notification: { color: "#FFC700", icon: notificationIcon },
  task: { color: "#27A99F", icon: taskIcon },
  ticket: { color: "#F9781D", icon: ticketIcon },
  comment: { color: "#64BEF2", icon: commentIcon },
  quote: { color: "#BB6CF9", icon: quoteIcon },
  clockin: { color: "#19B600", icon: clockinIcon },
  report: { color: "#000000", icon: reportIcon },
  notes: { color: "#D00000", icon: notesIcon },
  projects: { color: "#0052FE", icon: projectsIcon },
  general: { color: "#FFC700", icon: notificationIcon },
};

const NotificationsDropDown: React.FC<NotificationsDropDownProps> = ({ isVisible, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      // Simulating an API call with dummy data
      const dummyData: Notification[] = [
        {
          id: 4193,
          description: "Someone logged in with this account",
          sendDate: "2025-01-02 09:06:33",
          senderName: "System Admin",
          senderImage: "",
          type: "general",
        },
        {
          id: 4194,
          description: "A new task has been assigned to you",
          sendDate: "2025-01-03 12:30:00",
          senderName: "Project Manager",
          senderImage: "",
          type: "task",
        },
        {
          id: 4195,
          description: "Your ticket has been updated",
          sendDate: "2025-01-04 14:45:10",
          senderName: "Support Team",
          senderImage: "",
          type: "ticket",
        },
        {
            id: 41935,
            description: "Someone logged in with this account",
            sendDate: "2025-01-02 09:06:33",
            senderName: "System Admin",
            senderImage: "",
            type: "general",
          },
          {
            id: 41946,
            description: "A new task has been assigned to you",
            sendDate: "2025-01-03 12:30:00",
            senderName: "Project Manager",
            senderImage: "",
            type: "task",
          },
          {
            id: 41957,
            description: "Your ticket has been updated",
            sendDate: "2025-01-04 14:45:10",
            senderName: "Support Team",
            senderImage: "",
            type: "ticket",
          },
      ];

      setTimeout(() => {
        setNotifications(dummyData);
        setLoading(false);
      }, 1000); // Simulate API delay
    };


    fetchNotifications();
  }, []);

  const locale = useLocale();

  return (
    <div className={`fixed top-0 md:top-14 right-0 md:right-2 mt-2 h-screen md:h-auto w-full sm:w-[90%] md:w-[650px] bg-white border
     rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out transform 
     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
      {/* Header */}
      <div className="p-3 flex items-center w-full shadow-md pb-2 mb-2">
        <button onClick={onClose}>
          <FaWindowClose size={25} />
        </button>
        <span className="font-bold text-[20px] mx-auto">Notifications</span>
       
      </div>

      {/* Body */}
      <div className="max-h-screen md:max-h-[550px] overflow-y-auto px-[15px] py-[5px] md:px-[30px] md:py-[20px]">
        {loading ? (
          <div>Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Image
              src={nonotifications}
              alt="No notifications"
              width={300} // Adjust size as needed
              height={300} // Adjust size as needed
            />
          </div>
        ) : (
          notifications.map((notification) => {
            const { color, icon } = notificationTypes[notification.type] || { color: '#FFC700', icon: notificationIcon };
            return (
              <div key={notification.id} className="bg-[#F4F4F4] w-full h-[100px] md:h-[115px] rounded-lg flex items-center my-2">
                <div style={{ backgroundColor: color }} className="h-full w-[10px] rounded-l-lg"></div>
                <div className="flex items-center ml-2 md:ml-4 w-full">
                  <div className='relative'>
                    <Image
                      src={notification.senderImage || "/defaultBee.png"}
                      alt="Sender"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="absolute -right-1 md:-right-2 bottom-0 rounded-full p-1">
                      <Image
                        src={icon}
                        alt="Notification Icon"
                        width={15}
                        height={15}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="ml-2 md:ml-4 flex-1 text-sm md:text-base">
                    <div className='font-medium text-[12px] md:text-[14px]'>{notification.senderName}</div>
                    <div className="text-[12px] md:text-[14px]" dangerouslySetInnerHTML={{ __html: notification.description }} />
                  </div>
                  <div className="text-xs md:text-sm text-[#606060] self-end mr-2 md:mr-4">{notification.sendDate}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsDropDown;
