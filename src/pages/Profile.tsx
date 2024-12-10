import { PageTitle } from "../components";
import background from "../assets/img/background.webp";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Nav } from "../components";

type User = {
    id: number;
    email: string;
    name: string;
    role: number;
    gender: number;
    dob: string;
    image?: string;
    imageURL?: string;
    firstFavourite?: string;
    secondFavourite?: string;
    thirdFavourite?: string;
    fourthFavourite?: string;
    fifthFavourite?: string
};

export const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get<{ user: User }>(
                    "http://localhost:8888/api/users/profile",
                    { withCredentials: true }
                );
                setUser(response.data.user);
            } catch (err: any) {
                setError(err.response?.data?.message || "Unauthorized");
            }
        };

        fetchProfile();
    }, []);

    const navigate = useNavigate();

    const onEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/editprofile");
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
            <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                    <PageTitle />
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
                                <span>{user.gender == 0 ? "男性" : user.gender == 1 ? "女性" : "他"}</span>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="birthday">誕生日</label>
                                <span>{user.dob}</span>
                            </div>

                            <div className="flex justify-between mb-2">
                                <span className="font-bold">趣味:</span>
                                <span>{user.fifthFavourite}</span>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">役割:</span>
                                <span>{user.role == 0 ? "教師" : "学生"}</span>
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
