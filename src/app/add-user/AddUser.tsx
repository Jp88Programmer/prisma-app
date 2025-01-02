"use client";
import React, { useEffect, useState } from "react";

interface IUser {
  id: string;
  email: string;
  name: string;
  posts: string;
  bio: string;
}

const AddUser = () => {
  const [formData, setFormData] = React.useState({
    id: "",
    email: "",
    name: "",
    posts: "",
    bio: "",
  });
  const [users, setUsers] = useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          email: formData.email,
          name: formData.name,
          posts: formData.posts,
          bio: formData.bio,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      // Reset form after successful submission
      setFormData({
        id: "",
        email: "",
        name: "",
        posts: "",
        bio: "",
      });
      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  function formatDate(timestamp: string) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/get-users");
      const data = await response.json();
      console.log("🚀 ~ getUsers ~ data:", data);
      setUsers(data.allUsers);
    };
    if (formData.id == "") getUsers();
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            User Management
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Add New User
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-700"
                      placeholder="user@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="posts"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Posts
                    </label>
                    <input
                      type="text"
                      id="posts"
                      name="posts"
                      value={formData.posts}
                      onChange={handleChange}
                      className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Number of posts"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Biography
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Add User
                </button>
              </form>
            </div>

            {/* Users List Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Current Users
              </h2>
              <div className="space-y-4">
                {users.length > 0 &&
                  users.map((user: IUser) => (
                    <div
                      key={user.id}
                      className="bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-5 mb-2">
                        <div className="h-10 w-12 max-w-full rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="w-full">
                          <h3 className="text-lg font-medium text-gray-900">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <div className="w-full flex items-center space-x-2 justify-end">
                            <span className="text-sm text-gray-500">
                              {formatDate(user.posts[0].createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Posts:</span>{" "}
                          {user.posts[0].title}
                        </p>
                        <p className="mt-1">
                          <span className="font-medium">Bio:</span>{" "}
                          {user.profile.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                {users.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No users found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
