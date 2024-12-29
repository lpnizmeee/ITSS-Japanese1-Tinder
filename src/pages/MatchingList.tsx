import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../components";

type User = {
    userID: number;
    email: string;
    name: string;
    imageURL?: string;
    matchingID: number;
};

type UserInfo = {
    userID: number;
    email: string;
    name: string;
    role: number;
    gender: number;
    dob: string;
    imageURL?: string;
    firstFavourite?: string;
    secondFavourite?: string;
    thirdFavourite?: string;
    fourthFavourite?: string;
    fifthFavourite?: string;
};

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white p-4 shadow z-10 min-w-screen">
            <div className="flex items-center gap-4">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <span onClick={() => navigate('/dashboard')} role="img" aria-label="matchinglist">
                        🏠︎
                    </span>
                </button>
            </div>
        </div>
    );
};

export const MatchingList = () => {
    const [matchingUsers, setMatchingUsers] = useState<User[]>([]);
    const matchingIDs = matchingUsers.map((user) => user.matchingID);
    const navigate = useNavigate();
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchProfileAndMatchingUsers = async () => {
            try {
                // Fetch user profile
                const profileResponse = await axios.get<{ user: UserInfo }>(
                    "http://localhost:8888/api/users/profile", // API lấy thông tin từ session
                    { withCredentials: true }
                );
                const userId = profileResponse.data.user.userID;
                setUserId(userId);

                // Fetch matching users
                const matchingResponse = await axios.post("http://localhost:8888/api/users/matching", { userId });
                setMatchingUsers(matchingResponse.data.matchingUsers);
            } catch (err: any) {
                console.error("Error fetching data:", err);
            }
        };

        fetchProfileAndMatchingUsers();
    }, []);

    const handleChat = (matchingID: number) => {
        if (matchingID) {
            navigate(`/chatbox/${matchingID}`);
        } else {
            console.error("matchingID is undefined");
        }
    };

    return (
        <div>
            <Header />
            <div className="flex mt-5 min-h-screen items-center justify-center bg-gray-100 bg-gradient-to-r from-darkPink to-coralRed">
                <div className="w-full min-h-screen mt-2 mb-2 max-w-md rounded-lg bg-white p-8 shadow-md">
                    <PageTitle title="メッセージ" />
                    <ul className="space-y-4">
                        {matchingUsers.map((user) => (
                            <li
                                key={user.userID}
                                onClick={() => handleChat(user.matchingID)}
                                className="flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
                            >
                                <img
                                    src={user.imageURL || "/default-avatar.png"}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{user.name}</h3>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MatchingList;