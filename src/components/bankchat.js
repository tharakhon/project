import React, { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import "../styles/Chat4.css";
import Chat from "../components/Chat";
import Search from "../components/Search";


export const BankChat = () => {
    const bank_name = ReactSession.get("bank_name");
    const [searchedUser, setSearchedUser] = useState(""); // State เพื่อเก็บข้อมูลที่ค้นหา
    useEffect(() => {
        // ในที่นี้คุณสามารถใช้ฟังก์ชันหรือเรียก API เพื่ออัพเดตข้อมูลหรือข้อมูลที่คุณต้องการที่นี่
        // เมื่อมีการเปลี่ยนแปลงข้อมูลที่ค้นหา คุณสามารถอัพเดตข้อมูลที่ต้องการแสดงใน Chat component ได้ที่นี่
        // เช่น การดึงข้อมูลจาก API หรือฐานข้อมูล Firebase
    }, [searchedUser]);

    const handleSelectUser = (item) => {
        setSearchedUser(item); // กำหนดผู้ใช้ที่ถูกเลือกให้กับ state selectedUser
        console.log(item);
      };

    return (
        <div className="full-screen">
            <div className='header'>
                <h1>{bank_name}</h1>
            </div>
            <div className='container'>
                {/* ส่งค่าข้อมูลที่ค้นหาและฟังก์ชันเพื่ออัพเดตข้อมูลไปยัง Search component */}
                <Search handleSelectUser={handleSelectUser} />
                {/* ส่งข้อมูลที่คุณต้องการแสดงใน Chat component ผ่าน props */}
                <Chat searchedUser={searchedUser}/>
            </div>
        </div>
    );
};









