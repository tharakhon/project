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

const ChatBank = ({ searchedBank }) => {
    const username = ReactSession.get("username");
    const bank_name = ReactSession.get("bank_name");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(""); 
    const messagesRef = collection(db, "messages");

    /*useEffect(() => {
        const unsubscribe = onSnapshot(query(messagesRef, orderBy("createdAt")), (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                messages.push({ ...data, id: doc.id });
            });
            setMessages(messages);
        });

        return () => unsubscribe();
    }, [messagesRef]);*/
    
    const handleSend = async () => {
        /*try {
            await addDoc(messagesRef, {
                replytext: newMessage,
                from: username,
                to: searchedUser.user,
                createdAt: serverTimestamp(),
                bank_name: bank_name, 
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message: ", error);
        }*/
    };

    return (
        <div className="chat">
            {searchedBank && (
                <div className="chatInfo">
                    <span>{searchedBank.bank_name}</span>
                    <div className="chatIcons"></div>
                </div>
            )}
            {searchedBank&& (
                <div className="messages">
                    <span className="other-message">{searchedBank.from}
                    </span>
                    <div className="input-wrapper">
                        <div className="input">
                            <input
                                type="text"
                                placeholder="พิมพ์ข้อความของคุณที่นี่..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
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