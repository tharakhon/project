import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase-config";
import { ReactSession } from 'react-client-session';
import {
    collection,
    addDoc,
    serverTimestamp,
    orderBy,
    query,
    onSnapshot,
} from "@firebase/firestore";
import axios from "axios";
import "../styles/Chat4.css";

const Chat = ({ searchedUser }) => {
    const username = ReactSession.get("username");
    const bank_name = ReactSession.get("bank_name");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const [images, setImages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/showbank/${bank_name}`)
            .then((response) => {
                setImages(response.data[0].bank_image)
            })
    }, [])

    useEffect(() => {
        const q = query(messagesRef, orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                messages.push({ ...data, id: doc.id, bank_name: data.bank_name });
            });
            setMessages(messages);
            scrollToBottom();
        });
    
        return () => unsubscribe();
    }, [searchedUser]); // เมื่อ searchedUser เปลี่ยนแปลง
    
    

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async () => {
        // ตรวจสอบว่ามีข้อความถูกพิมพ์หรือไม่
        if (newMessage.trim() === "") {
            // ถ้าไม่มีข้อความถูกพิมพ์ ให้ย้อนกลับโดยไม่ทำอะไร
            return;
        }

        try {
            // ส่งข้อความเมื่อมีข้อความถูกพิมพ์
            await addDoc(messagesRef, {
                replytext: newMessage,
                from: username,
                to: searchedUser.user,
                createdAt: serverTimestamp(),
                bank_name: bank_name,
                imagesbank: images,
            });
            setNewMessage(""); // เคลียร์ข้อความใน input
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    return (
        <div className="chat">
            {searchedUser && (
                <div className="chatInfo">
                    <span>{searchedUser.name}</span>
                    <div className="chatIcons"></div>
                </div>
            )}
            {searchedUser && (
                <div className="messages">
                    {messages
                        .map((message) => (
                            <div key={message.id} className="message">
                                <span className={message.from === username ? "ownn-message" : "other-message"}>
                                    {message.from === username ? message.replytext : message.text}
                                    <span className="timestampp">
                                        {message.createdAt && new Date(message.createdAt.toDate()).toLocaleTimeString()}
                                    </span>
                                </span>
                            </div>
                        ))}
                    <div className="input-wrapper">
                        <div className="input">
                            <input
                                type="text"
                                placeholder="พิมพ์ข้อความของคุณที่นี่..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSend();
                                    }
                                }}
                            />
                            <div className="send">
                                <button onClick={handleSend}>ส่ง</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
