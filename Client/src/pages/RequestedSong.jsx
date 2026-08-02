import { useEffect, useState } from "react";
import {
  FiSearch,
  FiThumbsUp,
  FiUser,
  FiMusic,
} from "react-icons/fi";
import Swal from "sweetalert2";
import {
  getRequests,
  voteRequest,
} from "../services/requestService";

const RequestedSongs = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getRequests();
      setRequests(data.requests);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id) => {
    try {
      await voteRequest(id);
      loadRequests();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err.response?.data?.message ||
          "Unable to vote",
      });
    }
  };

  const filtered = requests.filter(
    (request) =>
      request.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      request.artist
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-16 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-black text-gray-900">
            Song Requests
          </h1>

          <p className="text-gray-500 mt-3">
            Vote for the arrangements you'd love to see.
          </p>

        </div>

        {/* Search */}

        <div className="relative max-w-xl mx-auto mb-10">

          <FiSearch className="absolute left-4 top-4 text-orange-500" />

          <input
            type="text"
            placeholder="Search songs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-white rounded-xl border border-gray-200 pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-orange-300"
          />

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-2 gap-6">

          {filtered.length ? (
            filtered.map((request) => (

              <div
                key={request._id}
                className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6 hover:shadow-2xl transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold flex items-center gap-2">

                      <FiMusic className="text-orange-500" />

                      {request.title}

                    </h2>

                    <p className="text-gray-500 mt-2">
                      {request.artist}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      request.status === "Fulfilled"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {request.status}
                  </span>

                </div>

                <div className="mt-6 space-y-3">

                  <p>
                    <strong>Genre:</strong>{" "}
                    {request.genre || "N/A"}
                  </p>

                  <p>
                    <strong>Difficulty:</strong>{" "}
                    {request.difficulty}
                  </p>

                  <p className="text-gray-600">
                    {request.description}
                  </p>

                  <div className="flex items-center gap-2 text-gray-500">

                    <FiUser />

                    {request.requestedBy?.name}

                  </div>

                </div>

                <div className="mt-6 flex justify-between items-center">

                  <span className="font-bold text-orange-600">
                    👍 {request.votes.length} Votes
                  </span>

                  <button
                    onClick={() =>
                      handleVote(request._id)
                    }
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition"
                  >

                    <FiThumbsUp />

                    Vote

                  </button>

                </div>

              </div>

            ))
          ) : (

            <div className="col-span-full text-center py-16">

              <h2 className="text-3xl font-bold">
                No Requests Found
              </h2>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default RequestedSongs;