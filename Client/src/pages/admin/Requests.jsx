import { useEffect, useState } from "react";
import {
  getRequests,
  updateRequestStatus,
  deleteRequest,
} from "../../services/requestService";
import {
  FaSearch,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaThumbsUp,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getRequests();
      setRequests(data.requests);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateRequestStatus(id, status);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Request status updated",
        timer: 1500,
        showConfirmButton: false,
      });

      loadRequests();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message,
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteRequest(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      loadRequests();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message,
      });
    }
  };

  const filtered = requests.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex flex-col lg:flex-row justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-black">
            Song Requests
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage requested arrangements
          </p>
        </div>

        <div className="relative w-full lg:w-80">

          <FaSearch className="absolute left-4 top-4 text-zinc-500" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-orange-500"
          />

        </div>

      </div>

      <div className="space-y-5">

        {filtered.map((request) => (

          <div
            key={request._id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              <div className="flex-1">

                <h2 className="text-2xl font-bold">
                  {request.title}
                </h2>

                <p className="text-zinc-400 mt-1">
                  {request.artist}
                </p>

                <p className="text-zinc-500 mt-3">
                  {request.description}
                </p>

                <div className="flex flex-wrap gap-6 mt-5 text-sm">

                  <span>
                    👤 {request.requestedBy?.name}
                  </span>

                  <span>
                    👍 {request.votes.length}
                  </span>

                  <span>
                    🎸 {request.difficulty}
                  </span>

                  <span>
                    🎵 {request.genre}
                  </span>

                </div>

              </div>

              <div className="flex flex-col gap-3 w-full lg:w-60">

                <select
                  value={request.status}
                  onChange={(e) =>
                    handleStatus(
                      request._id,
                      e.target.value
                    )
                  }
                  className="bg-zinc-800 rounded-xl p-3 border border-zinc-700"
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Fulfilled">
                    Fulfilled
                  </option>

                </select>

                <div
                  className={`rounded-xl py-3 text-center font-semibold ${
                    request.status === "Fulfilled"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {request.status === "Fulfilled" ? (
                    <span className="flex justify-center items-center gap-2">
                      <FaCheckCircle />
                      Fulfilled
                    </span>
                  ) : (
                    <span className="flex justify-center items-center gap-2">
                      <FaClock />
                      Pending
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    handleDelete(request._id)
                  }
                  className="bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold flex justify-center items-center gap-2 transition"
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Requests;