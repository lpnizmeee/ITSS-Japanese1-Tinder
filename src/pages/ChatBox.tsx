import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8888"); // Địa chỉ backend

export const ChatBox = ({ userId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        // Tham gia room riêng
        socket.emit("joinRoom", userId);

        // Nhận tin nhắn từ server
        socket.on("receiveMessage", (data) => {
            if (data.sender === receiverId) {
                setMessages((prev) => [...prev, data]);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, receiverId]);

    const handleSend = (e) => {
        e.preventDefault();
        const message = { sender: userId, receiver: receiverId, content };
        setMessages((prev) => [...prev, message]);
        socket.emit("sendMessage", message); // Gửi tin nhắn qua server
        setContent("");
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <p key={index} className={msg.sender === userId ? "self" : "other"}>
                        {msg.content}
                    </p>
                ))}
            </div>
            <form onSubmit={handleSend}>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};
