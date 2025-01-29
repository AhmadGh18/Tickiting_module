import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { FaWindowClose } from "react-icons/fa";
import notificationIcon from '../../public/images/Frame 2052.png'
import Link from 'next/link';
import useLocale from '@/hooks/useLocale';
import Loader from './loader/loader';
import { getNotifications } from '@/services/notifications/GetNotificationsApi';

// Define a string literal type for notification types
type NotificationType = 'notification' | 'task' | 'ticket' | 'comment' | 'quote' | 'clockin' | 'report' | 'notes' | 'projects';

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
    task: { color: "#27A99F", icon: notificationIcon },
    ticket: { color: "#F9781D", icon: notificationIcon },
    comment: { color: "#64BEF2", icon: notificationIcon },
    quote: { color: "#BB6CF9", icon: notificationIcon },
    clockin: { color: "#19B600", icon: notificationIcon },
    report: { color: "#000000", icon: notificationIcon },
    notes: { color: "#D00000", icon: notificationIcon },
    projects: { color: "#0052FE", icon: notificationIcon },
};

const NotificationsDropDown: React.FC<NotificationsDropDownProps> = ({ isVisible, onClose }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getNotifications(1); // Fetch notifications from an API
                setNotifications(data.notifications);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
                setLoading(false);
            }
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
                <Link href={`/${locale}/notifications`} passHref>
                    <button
                        className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-4"
                        onClick={onClose}>
                        View All</button>
                </Link>
            </div>

            {/* Body */}
            <div className="max-h-screen md:max-h-[550px] overflow-y-auto px-[15px] py-[5px] md:px-[30px] md:py-[20px]">
                {loading ? (
                    <Loader />
                ) : notifications.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <Image
                            src={notificationIcon}
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
