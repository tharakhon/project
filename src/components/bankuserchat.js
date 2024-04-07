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

import "../styles/Chat.css";

export const Bankuserchat = () => {
  const username = ReactSession.get("username");
  const bank_name = ReactSession.get("bank_name");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const messagesEndRef = useRef(null);
  const [images,setImages] = useState([]);
  const [profile,setProfile] = useState([]);
  const [banks,setBanks] = useState([]);



  useEffect ( () =>{
    axios.get(`http://localhost:5000/readimage/${username}`)
    .then ((response) => {
      setImages (response.data[0])
    } )
  },[])


  useEffect ( () =>{
    axios.get(`http://localhost:5000/showbank/${bank_name}`)
    .then ((response) => {
      setBanks (response.data[0].bank_image)
    } )
  },[])


  useEffect ( () =>{
    axios.get(`http://localhost:5000/user1/${username}`)
    .then ((response) => {
      setProfile (response.data[0])
    } )
  },[])

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
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: username,
      bank_name: bank_name,
      image: images.image,
      name: profile.fullname,
      imagesbank: banks,
    });

    setNewMessage("");
  };

  return (
    <div className="full-screen">
      <div className="header">
        <h1>Chat with {bank_name}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => {
          if (message.bank_name === bank_name) {
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
            } else if (message.to === username ) { // Check if message is addressed to the user
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
        <div ref={messagesEndRef}></div>
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="พิมพ์ข้อความของคุณที่นี้..."
        />
        <button type="submit" className="send-button">
          ส่งข้อความ
        </button>
      </form>
    </div>
  );
};
