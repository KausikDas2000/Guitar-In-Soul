import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  getUsers,
  deleteUser,
  updateUserRole
} from "../../services/adminService";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const data = await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: data.message,
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err.response?.data?.message ||
          "Failed to delete user",
      });
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const data = await updateUserRole(id, role);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, role }
            : user
        )
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err.response?.data?.message ||
          "Failed to update role",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
          Users
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage all registered users
        </p>

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr>

              <th className="p-5 text-left">Avatar</th>
              <th className="p-5 text-left">Name</th>
              <th className="p-5 text-left">Email</th>
              <th className="p-5 text-left">Role</th>
              <th className="p-5 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-t border-zinc-800 hover:bg-zinc-800 transition"
              >

                <td className="p-5">

                  <img
                    src={
                      user.profileImage?.url ||
                      `https://ui-avatars.com/api/?name=${user.name}`
                    }
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                </td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>

                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                </td>

                <td className="text-center">

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-5">

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
          >

            <div className="flex items-center gap-4">

              <img
                src={
                  user.profileImage?.url ||
                  `https://ui-avatars.com/api/?name=${user.name}`
                }
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="flex-1">

                <h2 className="text-lg font-bold">
                  {user.name}
                </h2>

                <p className="text-zinc-400 text-sm break-all">
                  {user.email}
                </p>

              </div>

            </div>

            {/* Role Selector */}
            <div className="mt-5">

              <label className="text-sm text-zinc-400 mb-2 block">
                Role
              </label>

              <select
                value={user.role}
                onChange={(e) =>
                  handleRoleChange(user._id, e.target.value)
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

            </div>

            {/* Action Buttons */}
            <div className="mt-5 grid grid-cols-2 gap-3">

              <button
                onClick={() =>
                  handleRoleChange(
                    user._id,
                    user.role === "admin" ? "user" : "admin"
                  )
                }
                className={`py-3 rounded-xl font-semibold transition ${user.role === "admin"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {user.role === "admin"
                  ? "Make User"
                  : "Make Admin"}
              </button>

              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
              >
                <FaTrash />
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Users;