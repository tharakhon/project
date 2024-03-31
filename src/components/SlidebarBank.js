import React, { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import { db } from "../firebase-config";
import {
    collection,
    onSnapshot,
} from "firebase/firestore";
import SearchBank from "../components/SearchBank";
import ChatBank from "../components/ChatBank ";



const SlidebarBank = () => {
    /*const username = ReactSession.get("username");
    const bank_name = ReactSession.get("bank_name");
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(db, "messages");*/


    return (
        <div className="sidebar">
            <SearchBank />
            <ChatBank />
        </div>
    );
};

export default SlidebarBank;