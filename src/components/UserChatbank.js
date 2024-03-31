import React, { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import "../styles/Chat4.css";
import SearchBank from "../components/SearchBank";
import ChatBank from "../components/ChatBank";

export const UserChatbank = () => {
    const username = ReactSession.get("username");
    const [searchedBank, setSearchedBank] = useState(""); // State เพื่อเก็บข้อมูลที่ค้นหา
    useEffect(() => {
        // ในที่นี้คุณสามารถใช้ฟังก์ชันหรือเรียก API เพื่ออัพเดตข้อมูลหรือข้อมูลที่คุณต้องการที่นี่
        // เมื่อมีการเปลี่ยนแปลงข้อมูลที่ค้นหา คุณสามารถอัพเดตข้อมูลที่ต้องการแสดงใน Chat component ได้ที่นี่
        // เช่น การดึงข้อมูลจาก API หรือฐานข้อมูล Firebase
    }, [searchedBank]);

    const handleSelectBank = (item) => {
        setSearchedBank(item); // กำหนดผู้ใช้ที่ถูกเลือกให้กับ state selectedUser
        console.log(item);
      };

    return (
        <div className="full-screen">
            <div className='header'>
                <h1>{username}</h1>
            </div>
            <div className='container'>
                {/* ส่งค่าข้อมูลที่ค้นหาและฟังก์ชันเพื่ออัพเดตข้อมูลไปยัง Search component */}
                <SearchBank handleSelectBank={handleSelectBank}/>
                {/* ส่งข้อมูลที่คุณต้องการแสดงใน Chat component ผ่าน props */}
                <ChatBank  searchedBank={searchedBank}/>
            </div>
        </div>
    );
};
