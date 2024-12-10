import "../assets/Css/profile.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PageTitle } from "../components";
import { Nav } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    fifthFavourite?: string;
};

// Import and other components remain unchanged

export const EditProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [imageURL, setImageURL] = useState<string>("");

    const navigate = useNavigate();

    // Fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get<{ user: User }>(
                    "http://localhost:8888/api/users/profile",
                    { withCredentials: true }
                );
                const userData = response.data.user;
                setUser(userData);

                // Populate form fields with user data
                setName(userData.name || "");
                setEmail(userData.email || "");
                setGender(userData.gender.toString());
                setSelectedDate(userData.dob ? new Date(userData.dob) : null);
                setImageURL(userData.imageURL || "");
            } catch (err: any) {
                setError(err.response?.data?.message || "Unauthorized");
            }
        };

        fetchProfile();
    }, []);

    // Handle Date Change
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    // Handle Save (Update Profile)
    const handSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setError("User not loaded");
            return;
        }

        try {
            const updatedUser = {
                name,
                email,
                gender: parseInt(gender),
                dob: selectedDate?.toISOString().split("T")[0] || null,
                imageURL,
            };
            console.log(updatedUser);
            console.log(user.id);

            await axios.put(
                `http://localhost:8888/api/users/${user.id}`,
                updatedUser,
                { withCredentials: true }
            );

            navigate("/profile");
        } catch (err: any) {
            setError(err.response?.data?.message || "Error updating profile");
        }
    };

    return (
        <div>
            <Nav />
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                    <PageTitle />
                    <form onSubmit={handSave}>
                        <div className="profile-container max-w-xl mx-auto p-4">
                            <div className="profile-header flex flex-col items-center">
                                <img
                                    src={imageURL || "path_to_default_image.jpg"}
                                    alt="Profile"
                                    className="profile-pic w-64 h-auto mb-4"
                                />
                                <input
                                    type="text"
                                    placeholder="Paste image URL here"
                                    value={imageURL}
                                    onChange={(e) => setImageURL(e.target.value)}
                                    className="w-full p-2 border rounded text-gray-800"
                                />
                            </div>
                            <div className="profile-info ml-4 mt-4 space-y-2">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="name text-white bg-gray-800"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="name text-white bg-gray-800"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="gender">Gender</label>
                                    <div>
                                        <input
                                            type="radio"
                                            id="radio-male"
                                            name="gender"
                                            value="1"
                                            checked={gender === "1"}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        <label htmlFor="radio-male">Male</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="radio-female"
                                            name="gender"
                                            value="2"
                                            checked={gender === "2"}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        <label htmlFor="radio-female">Female</label>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="birthday">Birth day</label>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Select your date of birth"
                                        className="bg-gray-800 p-2 rounded text-white"
                                    />
                                </div>
                            </div>
                            <div className="profile-actions mt-6 flex justify-center">
                                <button
                                    type="submit"
                                    className="edit-button bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
