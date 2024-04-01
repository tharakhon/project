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

const Chat = ({ searchedUser }) => {
    const username = ReactSession.get("username");
    const bank_name = ReactSession.get("bank_name");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(""); 
    const messagesRef = collection(db, "messages");
    const [images,setImages] = useState([]);

    useEffect ( () =>{
        axios.get(`http://localhost:5000/showbank/${bank_name}`)
        .then ((response) => {
          setImages (response.data[0].bank_image)
        } )
    },[])
    
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

    const handleSend = async () => {
        try {
            await addDoc(messagesRef, {
                replytext: newMessage,
                from: username,
                to: searchedUser.user,
                createdAt: serverTimestamp(),
                bank_name: bank_name,
                imagesbank: images,
            });
            setNewMessage("");
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
                    <span className="other-message">{searchedUser.text}
                    </span>
                    {messages
                       .filter(message => 
                        (message.from === searchedUser.user && message.to === bank_name) || 
                        (message.from === username && message.to === searchedUser.user && message.bank_name === bank_name)
                    )
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
