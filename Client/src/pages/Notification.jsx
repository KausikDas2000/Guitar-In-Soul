import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaBell,
    FaMusic,
    FaArrowRight,
    FaCheckDouble,
} from "react-icons/fa";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../services/notificationService";


const Notifications = () => {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);


    const loadNotifications = async () => {

        try {

            const data = await getNotifications();

            setNotifications(data.notifications || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadNotifications();
    }, []);



    const handleRead = async (id) => {

        try {

            await markNotificationAsRead(id);

            setNotifications(prev =>
                prev.map(item =>
                    item._id === id
                        ? {
                            ...item,
                            isRead: true
                        }
                        :
                        item
                )
            );


        } catch (error) {

            console.log(error);

        }

    };



    const handleMarkAll = async () => {

        try {

            await markAllNotificationsAsRead();

            setNotifications(prev =>
                prev.map(item => ({
                    ...item,
                    isRead: true
                }))
            );


        } catch (error) {

            console.log(error);

        }

    };



    const unread =
        notifications.filter(
            item => !item.isRead
        ).length;



    return (

        <div className="
            min-h-screen
            bg-gradient-to-br
            from-black
            via-zinc-950
            to-orange-950/30
            text-white
            px-6
            py-12
        ">


            <div className="
                max-w-5xl
                mx-auto
            ">


                {/* Header */}

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-10
                ">


                    <div className="flex items-center gap-4">

                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-orange-500/20
                            flex
                            items-center
                            justify-center
                        ">

                            <FaBell
                                className="
                                text-orange-400
                                text-2xl
                                "
                            />

                        </div>


                        <div>

                            <h1 className="
                                text-3xl
                                font-bold
                            ">
                                Notifications
                            </h1>


                            <p className="
                                text-gray-400
                                text-sm
                            ">
                                Latest guitar arrangements and updates
                            </p>


                        </div>


                    </div>



                    {
                        unread > 0 && (

                            <button
                                onClick={handleMarkAll}
                                className="
                                flex
                                items-center
                                gap-2
                                bg-orange-500
                                hover:bg-orange-600
                                px-5
                                py-3
                                rounded-full
                                font-semibold
                                transition
                                "
                            >

                                <FaCheckDouble />

                                Mark all read

                            </button>

                        )
                    }


                </div>




                {/* Content */}


                {

                    loading ? (

                        <div className="
                            text-center
                            py-20
                            text-gray-400
                        ">
                            Loading notifications...
                        </div>


                    )

                        :

                        notifications.length === 0 ? (


                            <div className="
                            rounded-3xl
                            bg-zinc-900/70
                            border
                            border-white/10
                            p-16
                            text-center
                        ">


                                <FaMusic
                                    className="
                                mx-auto
                                text-orange-400
                                text-5xl
                                mb-5
                                "
                                />


                                <h2 className="
                                text-2xl
                                font-bold
                            ">
                                    No Notifications
                                </h2>


                                <p className="
                                text-gray-400
                                mt-2
                            ">
                                    New guitar arrangements will appear here.
                                </p>


                            </div>


                        )


                            :


                            (

                                <div className="
                        space-y-5
                    ">


                                    {
                                        notifications.map(notification => (


                                            <Link

                                                key={notification._id}

                                                to={
                                                    `/song/${notification.arrangement?._id}`
                                                }

                                                onClick={() =>
                                                    handleRead(notification._id)
                                                }


                                                className={`
                            
                            block
                            group
                            rounded-3xl
                            p-5
                            border
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-2xl

                            ${notification.isRead

                                                        ?

                                                        "bg-zinc-900/50 border-white/10"

                                                        :

                                                        "bg-orange-500/10 border-orange-500/40"

                                                    }

                            `}
                                            >



                                                <div className="
                                    flex
                                    gap-5
                                    items-center
                                ">


                                                    {/* Cover */}

                                                    <img

                                                        src={
                                                            notification.arrangement
                                                                ?.coverImage?.url
                                                            ||
                                                            "/placeholder.jpg"
                                                        }

                                                        className="
                                    w-24
                                    h-24
                                    rounded-2xl
                                    object-cover
                                    shadow-xl
                                    group-hover:scale-105
                                    transition
                                    "

                                                    />



                                                    {/* Text */}


                                                    <div className="
                                        flex-1
                                    ">


                                                        <div className="
                                            flex
                                            justify-between
                                        ">


                                                            <h2 className="
                                                text-xl
                                                font-bold
                                                group-hover:text-orange-400
                                                transition
                                            ">

                                                                {
                                                                    notification.arrangement?.title
                                                                }

                                                            </h2>



                                                            <span className="
                                                text-xs
                                                text-gray-500
                                            ">

                                                                {
                                                                    new Date(
                                                                        notification.createdAt
                                                                    )
                                                                        .toLocaleDateString()
                                                                }

                                                            </span>


                                                        </div>



                                                        <p className="
                                            text-gray-400
                                            mt-2
                                        ">

                                                            {
                                                                notification.message
                                                            }

                                                        </p>



                                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                            text-orange-400
                                            mt-4
                                            text-sm
                                            font-semibold
                                        ">

                                                            Open Arrangement

                                                            <FaArrowRight />


                                                        </div>



                                                    </div>



                                                </div>


                                            </Link>


                                        ))
                                    }


                                </div>

                            )

                }



            </div>


        </div>

    );
};


export default Notifications;