import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await axios.get<{ message: string; user: User }>(
                    "http://localhost:8888/api/users/checkLogin",
                    { withCredentials: true }
                );
                setUser(response.data.user);
            } catch (err: any) {
                setError(err.response?.data?.message || "Unauthorized");
                navigate("/login");
            }
        };

        checkLogin();
    }, [navigate]);

    return { user, error, setUser };
};
