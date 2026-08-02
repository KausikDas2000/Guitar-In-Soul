import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaTrash,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import {
  getMessages,
  deleteMessage,
} from "../../services/adminService";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data.messages || []);
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Failed to load messages",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Message?",
      text: "This message will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const data = await deleteMessage(id);

      setMessages((prev) =>
        prev.filter((msg) => msg._id !== id)
      );

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: data.message,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Failed to delete message",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black">
          Contact Messages
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage messages submitted from the contact page.
        </p>
      </div>

      {/* Empty State */}
      {messages.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl py-20 text-center">

          <FaEnvelope className="mx-auto text-6xl text-zinc-700 mb-5" />

          <h2 className="text-2xl font-bold">
            No Messages Yet
          </h2>

          <p className="text-zinc-500 mt-3">
            When visitors contact you, their messages will appear here.
          </p>

        </div>
      ) : (
        <div className="space-y-6">

          {messages.map((message) => (

            <div
              key={message._id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500 transition-all duration-300"
            >

              <div className="flex flex-col lg:flex-row justify-between gap-6">

                {/* Left */}
                <div className="flex-1">

                  <div className="flex items-center gap-3 mb-3">

                    <FaUser className="text-orange-500" />

                    <h2 className="text-2xl font-bold">
                      {message.name}
                    </h2>

                  </div>

                  <div className="flex items-center gap-3 text-zinc-400 mb-4">

                    <FaEnvelope className="text-orange-500" />

                    <span>{message.email}</span>

                  </div>

                  <div className="mb-4">

                    <span className="text-orange-500 font-semibold">
                      Subject:
                    </span>

                    <p className="text-white mt-1">
                      {message.subject}
                    </p>

                  </div>

                  <div>

                    <span className="text-orange-500 font-semibold">
                      Message:
                    </span>

                    <p className="text-zinc-300 leading-7 mt-2 whitespace-pre-wrap">
                      {message.message}
                    </p>

                  </div>

                  <div className="flex items-center gap-2 mt-6 text-zinc-500">

                    <FaCalendarAlt />

                    <span>
                      {new Date(
                        message.createdAt
                      ).toLocaleString()}
                    </span>

                  </div>

                </div>

                {/* Right */}
                <div className="flex lg:flex-col justify-end">

                  <button
                    onClick={() =>
                      handleDelete(message._id)
                    }
                    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 font-semibold"
                  >

                    <FaTrash />

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default Messages;