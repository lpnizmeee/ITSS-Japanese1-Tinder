import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8888"); // Địa chỉ backend

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

export const ChatBox = ({ receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get<{ user: User }>(
                    "http://localhost:8888/api/users/profile", // API lấy thông tin từ session
                    { withCredentials: true }
                );
                setUserId(response.data.user.userID);
            } catch (err: any) {
                console.error("Error fetching profile:", err);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        if (!userId) return;

        // Tham gia room riêng
        socket.emit("joinRoom", userId);

        // Nhận tin nhắn từ server
        socket.on("receiveMessage", (data) => {
            if (data.sender === receiverId) {
                setMessages((prev) => [...prev, data]);
            }
        });

        // Fetch messages from API
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/users/messages/${userId}-${receiverId}`);
                setMessages(response.data.messages);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        fetchMessages();

        return () => {
            socket.disconnect();
        };
    }, [userId, receiverId]);

    const handleSend = async (e) => {
        e.preventDefault();
        const message = { sender: userId, receiver: receiverId, content };
        setMessages((prev) => [...prev, message]);
        socket.emit("sendMessage", message); // Gửi tin nhắn qua server

        try {
            await axios.post("/api/users/messages", message);
            setContent("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    return (
        <div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === userId ? "sent" : "received"}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend}>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};