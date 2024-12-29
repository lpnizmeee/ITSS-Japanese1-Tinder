import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRightIcon } from "@heroicons/react/solid";
import favicon from "../assets/icons/favicon.ico";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatchingUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/api/users/getMatchingUsers",
          { withCredentials: true },
        );
        setMatchingUsers(response.data.users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMatchingUsers();
  }, []);

  const handleLike = async () => {
    const targetUserID = matchingUsers[currentUserIndex].userID;
    const action = 1;

    try {
      const response = await axios.post(
        "http://localhost:8888/api/users/action",
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

    if (currentUserIndex < matchingUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      setCurrentUserIndex(matchingUsers.length);
    }
  };

  const handleNext = async () => {
    const targetUserID = matchingUsers[currentUserIndex].userID;
    const action = 0;

    try {
      const response = await axios.post(
        "http://localhost:8888/api/users/action",
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

    if (currentUserIndex < matchingUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      setCurrentUserIndex(matchingUsers.length);
    }
  };

  const renderContent = () => {
    if (
      matchingUsers.length === 0 ||
      currentUserIndex >= matchingUsers.length
    ) {
      return (
        <div className="flex flex-grow flex-col items-center justify-center bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-500">
            No users found
          </h2>
          <p className="text-sm text-gray-400">Please try again later.</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-grow items-center justify-center bg-gradient-to-r from-darkPink to-coralRed">
          <ProfileCard user={matchingUsers[currentUserIndex]} />
        </div>
      );
    }
  };

  const Header = () => (
    <div className="flex items-center justify-between bg-white p-4 shadow">
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
          <img src={favicon} alt="Logo" className="h-full w-full" />
        </div>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
          <span role="img" aria-label="Notification">
            🔔
          </span>
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
          <span onClick={() => navigate('/eventlist')} role="img" aria-label="Event">
            📅
          </span>
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
          <span onClick={() => navigate('/settings')} role="img" aria-label="Settings">
            ⚙️
          </span>
        </button>
      </div>
      <button className="flex items-center gap-2">
        <img
          src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg"
          alt="Avatar"
          className="h-8 w-8 rounded-full"
          onClick={() => navigate('/profile')}
        />
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-red-200">
          <span onClick={() => navigate('/matchinglist')} role="img" aria-label="Message">
            💌
          </span>
        </button>
        {/* <span  className="cursor-pointer p-4 bg-red-500 rounded-lg">メッセージ</span> */}
      </button>
    </div>
  );

  const ProfileCard = ({ user }) => (
    <div
      className="relative flex h-full w-full max-w-[100%] flex-col shadow"
      style={{
        backgroundImage: `url(${user.avatar})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* User Info */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-end">
        {/* Overlay for better readability */}
        <h1 className="text-3xl font-bold text-white">{user.name}</h1>
        <span className="rounded-full bg-gray-800 bg-opacity-75 px-2 py-1 text-sm text-white">
          {user.role === 0 ? "👨‍🏫 Teacher" : "🎓 Student"}
        </span>
        <div className="mt-2 flex max-w-[90%] flex-wrap items-center justify-center gap-2">
          {user.favorites.map((fav, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-800 bg-opacity-75 px-2 py-1 text-sm text-white"
            >
              {fav}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex items-center justify-evenly rounded-b-lg bg-gray-800 bg-opacity-60 py-4">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow hover:bg-blue-600"
          onClick={handleLike}
        >
          <span className="text-4xl">👍</span>
        </button>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
          onClick={handleNext}
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-grow">{renderContent()}</div>
    </div>
  );
};
