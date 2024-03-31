import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  onSnapshot,
} from "@firebase/firestore";
import { ReactSession } from 'react-client-session';
import "../styles/Chat4.css";

const Search = ({ handleSelectUser }) => {
  const username = ReactSession.get("username");
  const bank_name = ReactSession.get("bank_name");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      const latestMessages = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.bank_name === bank_name && data.from !== username) {
          latestMessages[data.name] = { ...data, id: doc.id };
        }
      });
      setUsers(Object.values(latestMessages));
    });
    return () => unsubscribe();
  }, [username, bank_name]);

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
        <button>Search</button>
      </div>
      <div className="userChatContainer">
        {users.map((user) => (
          <div
            key={user.id}
            className="userChat"
            onClick={() => handleSelectUser(user)}
          >
            <img src={user.image} alt="" />
            <div className="userChatInfo">
              <span>{user.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

