import axios from "axios";

type User = {
    userID: number;
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

export const fetchProfile = async () => {
    try {
        const response = await axios.get<{ user: User }>(
            "http://localhost:8888/api/users/profile",
            { withCredentials: true }
        );
        return response.data.user;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Error fetching profile");
    }
};
