import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  onSnapshot,
} from "@firebase/firestore";
import { ReactSession } from 'react-client-session';
import "../styles/Chat4.css";

const SearchBank = ({ handleSelectBank }) => {
  const username = ReactSession.get("username");
  const bank_name = ReactSession.get("bank_name");
  const [banks, setBanks] = useState([]);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      const latestMessages = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.bank_name === bank_name && data.from !== username) {
          latestMessages[data.bank_name] = { ...data, id: doc.id }; // เปลี่ยน data.name เป็น data.bank_name
        }
      });
      setBanks(Object.values(latestMessages));
    });
    return () => unsubscribe();
  }, [username, bank_name]);

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a bank" />
        <button>Search</button>
      </div>
      <div className="userChatContainer">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="userChat"
            onClick={() => handleSelectBank(bank)}
          >
            <img src={`http://localhost:5000/image/${bank.imagesbank}`} alt="" />
            <div className="userChatInfo">
              <span>{bank.bank_name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBank;
