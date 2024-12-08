import { useState } from "react";
import axios from "axios";  // Import axios
import { Loader, Nav } from "../components";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8888/api/users/register", formData);

      if (response.status === 201) {
        alert("Registration successful!");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Registration failed.");
      } else {
        setError("Error connecting to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Loader />
      <Nav />

      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 bg-gradient-to-r from-darkPink to-coralRed">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md mt-20">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select your gender</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
                <option value="2">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select your Role</option>
                <option value="0">Teacher</option>
                <option value="1">Student</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-500 py-2 text-white hover:bg-indigo-600"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
