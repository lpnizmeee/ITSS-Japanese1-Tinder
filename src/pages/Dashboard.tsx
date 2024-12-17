import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRightIcon } from "@heroicons/react/solid";
import favicon from "../assets/icons/favicon.ico";

export const Dashboard = () => {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0); // Track the current user index

  useEffect(() => {
    const fetchMatchingUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/api/users/getMatchingUsers",
          { withCredentials: true },
        );
        setMatchingUsers(response.data.users); // Set the matching users data
      } catch (err) {
        console.error(err);
      }
    };

    fetchMatchingUsers();
  }, []);

  // Handle like action
  const handleLike = async () => {
    const targetUserID = matchingUsers[currentUserIndex].userID; // Get the target user's ID
    const action = 1; // 1 for like

    try {
      const response = await axios.post(
        "http://localhost:8888/api/users/action", // Replace with the correct API endpoint
        { targetUserID, action },
        { withCredentials: true },
      );

      if (response.status === 200) {
        console.log("Liked user:", matchingUsers[currentUserIndex].name);
      } else {
        console.error("Error liking user:", response.data.message);
      }
    } catch (err) {
      console.error("Error sending like action:", err);
    }

    // Move to the next user after liking
    if (currentUserIndex < matchingUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1); // Move to next user
    } else {
      setCurrentUserIndex(matchingUsers.length); // Ensure the index exceeds array length
    }
  };

  // Handle dislike action (when Next is clicked)
  const handleNext = async () => {
    const targetUserID = matchingUsers[currentUserIndex].userID; // Get the target user's ID
    const action = 0; // 0 for dislike

    try {
      const response = await axios.post(
        "http://localhost:8888/api/users/action", // Replace with the correct API endpoint
        { targetUserID, action },
        { withCredentials: true },
      );

      if (response.status === 200) {
        console.log("Disliked user:", matchingUsers[currentUserIndex].name);
      } else {
        console.error("Error disliking user:", response.data.message);
      }
    } catch (err) {
      console.error("Error sending dislike action:", err);
    }

    // Move to the next user after disliking
    if (currentUserIndex < matchingUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1); // Move to next user
    } else {
      setCurrentUserIndex(matchingUsers.length); // Ensure the index exceeds array length
    }
  };

  // If there are no matching users, show loading or a message
  const renderContent = () => {
    if (matchingUsers.length === 0 || currentUserIndex >= matchingUsers.length) {
      return (
        <div className="flex flex-col flex-grow items-center justify-center bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-500">No users found</h2>
          <p className="text-sm text-gray-400">Please try again later.</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-grow items-center justify-center bg-gray-100">
          <ProfileCard user={matchingUsers[currentUserIndex]} />
        </div>
      );
    }
  };

  const Header = () => {
    return (
      <div className="flex items-center justify-between bg-white p-4 shadow">
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <img
              src={favicon}
              alt="Logo"
              className="h-full w-full"
            />
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <span role="img" aria-label="Notification">
              🔔
            </span>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <span role="img" aria-label="Event">
              📅
            </span>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <span role="img" aria-label="Settings">
              ⚙️
            </span>
          </button>
        </div>
        <button className="flex items-center gap-2">
          <img
            src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg"
            alt="Avatar"
            className="h-8 w-8 rounded-full"
          />
          <span>メッセージ</span>
        </button>
      </div>
    );
  };

  const ProfileCard = ({ user }) => {
    return (
      <div className="flex h-[300px] w-full max-w-[95%] rounded-lg bg-white p-6 shadow">
        {/* Left Column: Buttons */}
        <div className="flex w-1/4 flex-col items-center justify-center gap-4">
          <button
            className="flex items-center justify-center rounded-full bg-yellow-100 p-3"
            onClick={handleLike}
          >
            <span role="img" aria-label="Like" className="text-3xl">
              👍
            </span>
          </button>
          <button
            className="flex items-center justify-center rounded-full bg-gray-200 p-3"
            onClick={handleNext}
          >
            <ArrowRightIcon className="h-8 w-8 text-black" aria-label="Next" />
          </button>
        </div>

        {/* Right Column: Profile */}
        <div className="flex w-3/4 flex-col items-center justify-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
            <img
              src={user.avatar}
              alt="Avatar"
              className="h-full w-full rounded-full"
            />
          </div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">
            {user.role == 0 ? "Teacher" : "Student"}
          </p>
          <div className="flex space-x-4 text-sm text-gray-500">
            {user.favorites.map((fav, index) => (
              <span key={index} className="flex items-center">
                {fav}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="w-full">
        <Header />
      </div>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
};
