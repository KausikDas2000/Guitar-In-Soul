import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaBell,
    FaMusic,
    FaArrowRight,
    FaCheckDouble,
} from "react-icons/fa";
import {
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../../services/notificationService";

const NotificationDropdown = ({
    notifications = [],
    setNotifications,
    loading,
    isOpen,
}) => {

    const [unreadCount, setUnreadCount] = useState(0);
    const handleNotificationClick = async (id) => {
        try {
            await markNotificationAsRead(id);

            setNotifications((prev) =>
                prev.map((notification) =>
                    notification._id === id
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        } catch (err) {
            console.error(err);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-14 w-[420px] bg-[#111111]/95 backdrop-blur-xl border border-orange-500/20 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.55)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-orange-500/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/15 flex items-center justify-center">
                        <FaBell className="text-orange-400 text-lg" />
                    </div>

                    <div>
                        <h2 className="text-white font-semibold text-lg">
                            Notifications
                        </h2>

                        <p className="text-xs text-gray-400">
                            Stay updated with new arrangements
                        </p>
                    </div>
                </div>

                <button
                    onClick={async () => {
                        try {
                            await markAllNotificationsAsRead();

                            setNotifications((prev) =>
                                prev.map((notification) => ({
                                    ...notification,
                                    isRead: true,
                                }))
                            );
                        } catch (err) {
                            console.error(err);
                        }
                    }}
                    className="text-xs text-orange-400 hover:text-orange-300 transition"
                >
                    <FaCheckDouble className="inline mr-1" />
                    Mark all
                </button>
            </div>

            {/* Body */}
            <div className="max-h-[520px] overflow-y-auto">

                {loading && (
                    <div className="py-12 text-center text-gray-400">
                        Loading notifications...
                    </div>
                )}

                {!loading && unreadCount === 0 && (
                    <div className="py-14 flex flex-col items-center">

                        <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                            <FaMusic className="text-orange-400 text-2xl" />
                        </div>

                        <h3 className="text-white font-semibold">
                            No Notifications
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            New uploads will appear here.
                        </p>

                    </div>
                )}

                {!loading &&
                    notifications.map((notification) => (
                        <Link
                            key={notification._id}
                            to={`/arrangement/${notification.arrangement?._id}`}
                            onClick={() => handleNotificationClick(notification._id)}
                            className={`group flex gap-4 p-4 border-b border-orange-500/5 transition-all duration-300 ${notification.isRead
                                ? "bg-transparent hover:bg-orange-500/5"
                                : "bg-orange-500/5 hover:bg-orange-500/10"
                                }`} >

                            {/* Unread Dot */}
                            <div className="mt-2">
                                <span className="block w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,.8)]"></span>
                            </div>

                            {/* Cover */}
                            <img
                                src={
                                    notification.arrangement?.coverImage?.url ||
                                    "/placeholder.jpg"
                                }
                                alt=""
                                className="w-16 h-16 rounded-xl object-cover shadow-md group-hover:scale-105 transition"
                            />

                            {/* Content */}
                            <div className="flex-1">

                                <div className="flex justify-between items-start">

                                    <div>
                                        <h3 className="text-white font-semibold group-hover:text-orange-300 transition">
                                            {notification.arrangement?.title}
                                        </h3>

                                        <p className="text-sm text-gray-400 mt-1">
                                            {notification.message}
                                        </p>
                                    </div>

                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                        {new Date(notification.createdAt).toLocaleDateString()}
                                    </span>

                                </div>

                                <div className="flex items-center justify-between mt-3">

                                    <span className="text-xs text-orange-400">
                                        New Upload
                                    </span>

                                    <span className="flex items-center gap-1 text-sm text-orange-400 group-hover:translate-x-1 transition">
                                        Open
                                        <FaArrowRight className="text-xs" />
                                    </span>

                                </div>

                            </div>

                        </Link>
                    ))}

            </div>

            {/* Footer */}
            <div className="border-t border-orange-500/10 bg-[#0c0c0c] p-4">

                <Link
                    to="/notifications"
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold transition"
                >
                    View All Notifications
                    <FaArrowRight className="text-sm" />
                </Link>

            </div>

        </div>
    );
};

export default NotificationDropdown;