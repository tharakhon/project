import React, { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import { db } from "../firebase-config";
import {
    collection,
    onSnapshot,
} from "firebase/firestore";

import Search from "../components/Search";
import Chat from "./Chat";

const Sidebar = () => {
    const username = ReactSession.get("username");
    const bank_name = ReactSession.get("bank_name");
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                messages.push({ ...data, id: doc.id });
            });
            setMessages(messages);
        });

        return () => unsubscribe();
    }, [messagesRef]);

    return (
        <div className="sidebar">
            <Search />
            <Chat/>
        </div>
    );
};

export default Sidebar;



