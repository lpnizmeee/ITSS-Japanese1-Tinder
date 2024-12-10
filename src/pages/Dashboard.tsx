import React from "react";
import { ArrowRightIcon } from "@heroicons/react/solid";

export const Dashboard = ({ user }) => {
  const Header = () => {
    return (
      <div className="flex items-center justify-between bg-white p-4 shadow">
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <img
              src="logo-placeholder.png"
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
            src="user-avatar-placeholder.png"
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
          <button className="flex items-center justify-center rounded-full bg-yellow-100 p-3">
            <span role="img" aria-label="Like" className="text-3xl">
              👍
            </span>
          </button>
          <button className="flex items-center justify-center rounded-full bg-gray-200 p-3">
            <ArrowRightIcon className="h-8 w-8 text-black" aria-label="Skip" />
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
          <p className="text-sm text-gray-500">{user.role}</p>
          <p className="text-sm text-gray-500">{user.info}</p>
        </div>
      </div>      
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center bg-gray-100">
        <ProfileCard user={user} />
      </div>
    </div>
  );
};
