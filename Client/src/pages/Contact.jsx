import { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { FiUser, FiMail } from "react-icons/fi";
import { sendMessage } from "../services/contactService";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const data = await sendMessage(form);

      setStatus(data.message);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setStatus(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-20 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900">
            Contact Us
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            We'd love to hear from you. Send us a message and
            we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-10">

            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Get In Touch
            </h2>

            <div className="space-y-8">

              <div className="flex items-center gap-5">
                <div className="bg-orange-500 text-white p-4 rounded-2xl">
                  <FaEnvelope size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Email
                  </h3>

                  <p className="text-gray-600">
                    support@guitarinsoul.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-orange-500 text-white p-4 rounded-2xl">
                  <FaPhoneAlt size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Phone
                  </h3>

                  <p className="text-gray-600">
                    +91 9123830509
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-orange-500 text-white p-4 rounded-2xl">
                  <FaMapMarkerAlt size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Address
                  </h3>

                  <p className="text-gray-600">
                    Kolkata, West Bengal, India
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-12 rounded-2xl bg-orange-50 border border-orange-100 p-6">

              <h3 className="font-bold text-xl text-orange-600">
                Guitar In Soul
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                Guitar In Soul is a platform dedicated to guitar
                enthusiasts. Discover rare arrangements, upload
                your own creations, and connect with musicians
                from around the world.
              </p>

            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-10">

            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Send Message
            </h2>

            {status && (
              <div className="mb-6 bg-orange-100 text-orange-700 rounded-xl p-4 text-center">
                {status}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div className="relative">
                <FiUser className="absolute left-4 top-4 text-orange-500" />

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div className="relative">
                <FiMail className="absolute left-4 top-4 text-orange-500" />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;