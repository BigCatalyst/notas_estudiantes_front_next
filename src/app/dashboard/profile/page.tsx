/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Buttom from "@/components/ui/buttom/Buttom";
import { State } from "@/redux/features/authSlice";
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

function Profile() {
  const { user }: State = useSelector((state: any) => state.auth);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        {/* <button
          className="btn"
          onClick={() => redirect("/dashboard/profile/update")}
        >
          <FaUserEdit className="w-5.5 h-5.5" />
          Edit Profile
        </button> */}

        <Buttom
          title="Edit Profile"
          className="btn1"
          icon={FaUserEdit}
          to="/dashboard/profile/update"
        />
      </div>

      {/* Contenido principal */}
      <div className="grid md:grid-cols-2 gap-6 container-neo">
        {/* Sección de Información Personal */}
        <div className="bg-white p-6 rounded-xl shadow-sm shadow-neo container-neo">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Personal Information
          </h2>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">First Name</label>
                <p className="font-medium text-gray-900">{user?.first_name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Last Name</label>
                <p className="font-medium text-gray-900">{user?.last_name}</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Username</label>
              <p className="font-medium text-gray-900">{user?.username}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">User ID</label>
              <p className="font-medium text-gray-900">#{user?.id}</p>
            </div>
          </div>
        </div>

        {/* Sección de Roles */}
        <div className="bg-white p-6 rounded-xl shadow-sm shadow-neo container-neo">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Roles</h2>
          <div className="flex flex-wrap gap-2">
            {user?.roles.map((role) => (
              <span
                key={role}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  role === "admin"
                    ? "bg-red-100 text-red-800"
                    : role === "user"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
