import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { PageTitle } from "../components";
import { format, addHours } from 'date-fns';

const socket = io("http://localhost:8888", {
    withCredentials: true,
    transports: ["websocket", "polling"],
}); // Địa chỉ backend

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

type Message = {
    matchingID: number;
    from: number;
    context: string;
    time: Date;
};

export const ChatBox = () => {
    const { matchingID } = useParams<{ matchingID: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState<number | null>(null);

    console.log(matchingID);
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

        socket.emit("joinRoom", userId);

        socket.on("receiveMessage", (data) => {
            if (matchingID && data.matchingID === parseInt(matchingID)) {
                setMessages((prev) => [...prev, data]);
            }
        });

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/api/users/messages/${matchingID}`);
                setMessages(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };
        fetchMessages();

        return () => {
            // Rời phòng cũ thay vì ngắt kết nối socket hoàn toàn
            socket.emit("leaveRoom", userId);
        };
    }, [userId, matchingID]);

    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentTime = format(addHours(new Date(), 0), 'yyyy-MM-dd HH:mm:ss'); // Chuyển đổi thời gian sang định dạng MySQL và múi giờ UTC+7
        const message = { matchingID: matchingID ? parseInt(matchingID) : 0, from: userId ?? 0, context: content, time: currentTime };
        setMessages((prev) => [...prev, message]);
        socket.emit("sendMessage", { ...message, receiver: matchingID ? parseInt(matchingID) : 0 }); // Gửi tin nhắn qua server
        setContent("");
    };

    return (
        <div>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 bg-gradient-to-r from-darkPink to-coralRed">
                <div className="w-full min-h-screen mt-2 mb-2 max-w-md rounded-lg bg-white p-8 shadow-md">
                    <PageTitle title="メッセージ" />
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.from === userId ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`message p-2 my-2 rounded-lg max-w-xs ${msg.from === userId ? "bg-blue-500 text-white" : "bg-rose-500 text-white"}`}>
                                    <div className="message-content">
                                        {msg.context}
                                    </div>
                                    <div className="message-time text-xs text-white">
                                        {format(new Date(msg.time), 'yyyy-MM-dd HH:mm:ss')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSend} className="mt-4 flex">
                        <input
                            className="flex-grow text-black p-2 rounded-lg border border-gray-300 mr-2"
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button className="text-white bg-blue-500 p-3 rounded-lg" type="submit">➜</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;