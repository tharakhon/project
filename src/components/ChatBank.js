import React, { useState, useEffect } from "react";
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

const ChatBank = ({ searchedBank }) => {
    const username = ReactSession.get("username");
    const bank_name = ReactSession.get("bank_name");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const [banks, setBanks] = useState([]);
    const [images, setImages] = useState([]);
    const [profile, setProfile] = useState([]);
    console.log(searchedBank)
    useEffect(() => {
        const unsubscribe = onSnapshot(query(messagesRef, orderBy("createdAt")), (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                messages.push({ ...data, id: doc.id });
            });
            setMessages(messages);
        });

        return () => unsubscribe();
    }, [messagesRef]);

    
    useEffect(() => {
        axios.get(`http://localhost:5000/readimage/${username}`)
            .then((response) => {
                setImages(response.data[0])
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/showbank/${bank_name}`)
            .then((response) => {
                setBanks(response.data[0].bank_image)
            })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/user1/${username}`)
            .then((response) => {
                setProfile(response.data[0])
            })
    }, [])


      const handleSend = async () => {
        // ตรวจสอบว่ามีข้อความถูกพิมพ์หรือไม่
        if (newMessage.trim() === "") {
            // ถ้าไม่มีข้อความถูกพิมพ์ ให้ย้อนกลับโดยไม่ทำอะไร
            return;
        }

        try {
            // ส่งข้อความเมื่อมีข้อความถูกพิมพ์
            await addDoc(messagesRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: username,
                bank_name: bank_name,
                image: images.image,
                name: profile.fullname,
                imagesbank: banks,
            });
            setNewMessage(""); // เคลียร์ข้อความใน input
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    return (
        <div className="chat">
            {searchedBank && (
                <div className="chatInfo">
                    <span>{searchedBank.bank_name}</span>
                    <div className="chatIcons"></div>
                </div>
            )}
            {searchedBank && (
                <div className="messages">
                    {messages.map((message) => {
                        if (message.bank_name === searchedBank.bank_name) {
                            const isOwnMessage = message.user === username;
                            const isCurrentMessageSender = message.user === username;

                            if (isOwnMessage || isCurrentMessageSender) {
                                return (
                                    <div
                                        key={message.id}
                                        className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}
                                    >
                                        <div className="message-content">
                                            {!isOwnMessage && <span className="user">{message.user}</span>}
                                            <span className="message-text">{message.text}</span>
                                            <span className="timestamp">{message.createdAt && new Date(message.createdAt.toDate()).toLocaleTimeString()}</span>
                                        </div>
                                    </div>
                                );
                            } else if (message.to === username) { // Check if message is addressed to the user
                                return (
                                    <div
                                        key={message.id}
                                        className="message bank-message" // Adding a specific class for bank messages
                                    >
                                        <div className="other-message">
                                            <span className="message-text">{message.bank_name} : {message.replytext}</span>
                                            <span className="timestamp">{message.createdAt && new Date(message.createdAt.toDate()).toLocaleTimeString()}</span>
                                        </div>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    })}
                    

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

export default ChatBank;