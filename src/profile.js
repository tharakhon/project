import React from "react";
import NavbarProfile from "./navBarprofile";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Axios from "axios";
function Profile(){
    const [profile, setProfile] = useState([]);
    const [flag, setflag] = useState(false);
    const [fullname,setUsername] = useState("");
    const [tel,setTel] = useState("");
    const [email,setEmail] = useState("");
    useEffect(() => {
        // ตรวจสอบว่ามีข้อมูลใน /user หรือไม่
        Axios.get("http://localhost:5000/user/:email",{
        email: profile.email,
        fullname: profile.fullname ,
        tel: profile.tel,
    })
        .then((response) => {
          console.log("ข้อมูลที่ได้รับ:", response.data);
          const userEmails = response.data.map((user) => user.email);
          if (userEmails.includes(profile.email)) {
            setflag(true);
          } else {
            alert("ไม่พบข้อมูลผู้ใช้");
          }
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
        });
      }, []);
    return (
        <div>
            <NavbarProfile />
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 5,
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{ display: 'flex', flexDirection: 'column', width: '50ch' }}>
                    <TextField id="outlined-basic" label="ชื่อ-นามสกุลจริง" variant="outlined" sx={{ margin: 1 }} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ margin: 1 }}
                    defaultValue={profile.email}></TextField>
                    <TextField id="outlined-basic" label="เบอร์โทร" variant="outlined" sx={{ margin: 1 }} />
                </div>
            </Box>
            <div style={{display:'flex',justifyContent:'space-between',margin:10}}>
            <Button variant="contained" color='error' sx={{top:300}}>ย้อนกลับ</Button>
            <Button variant="contained" color='success' sx={{ backgroundColor: '#07C27F',top:300}}>เสร็จสิ้น</Button>
            </div>
        </div>
    );
}
export default Profile;