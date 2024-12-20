import { PageTitle } from "../components";
import background from "../assets/img/background.webp";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Nav } from "../components";

type User = {
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

export const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get<{ user: User }>(
                    "http://localhost:8888/api/users/profile", // API lấy thông tin từ session
                    { withCredentials: true }
                );
                setUser(response.data.user);
            } catch (err: any) {
                setError(err.response?.data?.message || "Error fetching profile");
            }
        };
        fetchProfile();
    }, []);
    console.log(user);
    const onEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/editprofile"); // Điều hướng đến trang chỉnh sửa
    };

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!user) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
            <Nav />
            <div className="flex min-h-screen items-center justify-center bg-gray-100 bg-gradient-to-r from-darkPink to-coralRed">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                    <PageTitle title="プロフィール" />
                    <div className="profile-container max-w-xl mx-auto p-4">
                        <div className="profile-header flex flex-col items-center">
                            <img
                                src={user.imageURL || background}
                                alt="Profile"
                                className="profile-pic w-64 h-auto mb-4"
                            />
                            <h2 className="profile-name text-2xl font-semibold">{user.name}</h2>
                        </div>

                        <div className="profile-info ml-4 mt-4 space-y-2">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold">メール:</span>
                                <span>{user.email}</span>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">性別:</span>
                                <span>
                                    {user.gender === 0
                                        ? "男性"
                                        : user.gender === 1
                                            ? "女性"
                                            : "他"}
                                </span>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">誕生日</span>
                                <span>{user.dob}</span>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">役割:</span>
                                <span>{user.role === 0 ? "教師" : "学生"}</span>
                            </div>
                            <div className="flex flex-col items-center justify-between mb-2">
                                <div className="font-bold mb-2">趣味:</div>
                                <div className="flex items-center flex-wrap gap-2">
                                    {user.firstFavourite && (
                                        <span className="chip bg-gray-200 text-gray-800 py-1 px-3 rounded-full">
                                            {user.firstFavourite}
                                        </span>
                                    )}
                                    {user.secondFavourite && (
                                        <span className="chip bg-gray-200 text-gray-800 py-1 px-3 rounded-full">
                                            {user.secondFavourite}
                                        </span>
                                    )}
                                    {user.thirdFavourite && (
                                        <span className="chip bg-gray-200 text-gray-800 py-1 px-3 rounded-full">
                                            {user.thirdFavourite}
                                        </span>
                                    )}
                                    {user.fourthFavourite && (
                                        <span className="chip bg-gray-200 text-gray-800 py-1 px-3 rounded-full">
                                            {user.fourthFavourite}
                                        </span>
                                    )}
                                    {user.fifthFavourite && (
                                        <span className="chip bg-gray-200 text-gray-800 py-1 px-3 rounded-full">
                                            {user.fifthFavourite}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="profile-actions mt-6 flex justify-center">
                            <button
                                onClick={onEdit}
                                className="edit-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
