import React, { useState, useEffect } from "react";
import NavbarProfile from "./navBarprofile";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ReactSession } from 'react-client-session';

function Profile() {
  const username = ReactSession.get("username");
  const [profile, setProfile] = useState();
  const [useremail, setEmail] = useState();
  const [flag, setFlag] = useState(false);
  const [tel, setTel] = useState("");
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  
  useEffect(() => {
    // แทน email ด้วยค่า email ของผู้ใช้ที่คุณต้องการดึง
    // const userEmail = "tharakhon.r@ku.th";
    // const userEmail = "earth0981234@gmail.com";
    console.log(username);
    Axios.get(`http://localhost:5000/user/${username}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data[0].email);
        const userData = response.data;

        // กำหนดค่าให้กับ profile state
        setUserImage(response.data[0].image);
        setProfile(response.data[0].fullname);
        setEmail(response.data[0].email);
        setTel(response.data[0].tel);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      });
  }, [username]);
  
  console.log(profile)
  console.log(username)
  const handleBack = () => {
    navigate(`/main`);
  }

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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={userImage} style={{ width: '30ch', height: '25ch', marginBottom: 10 }} />
          </div>
          <TextField
            id="outlined-required"
            label="ชื่อ-นามสกุลจริง"
            variant="outlined"
            sx={{ margin: 1 }}
            value={profile} // ใช้ value แทน defaultValue
            onChange={(event) => setProfile(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            disabled
            id="outlined-disabled"
            label="Email"
            variant="outlined"
            sx={{ margin: 1 }}
            value={useremail} // ใช้ value แทน defaultValue
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="outlined-basic"
            label="Tel"
            variant="outlined"
            sx={{ margin: 1 }}
            value={tel} // ใช้ค่าของ state tel
            onChange={(event) => setTel(event.target.value)} // อัปเดต state เมื่อมีการเปลี่ยนแปลง
          />

          {/* ในส่วนของเบอร์โทร คุณอาจต้องสร้าง state และใช้ value ใน TextField เช่นเดียวกัน */}
        </div>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'space-around'}}>
        <Button variant="contained" color='error' sx={{}} onClick={handleBack}>ย้อนกลับ</Button>
        <Button variant="contained" color='success' sx={{ backgroundColor: '#07C27F'}} onClick={handleBack}>เสร็จสิ้น</Button>
      </div>
    </div>
  );
}

export default Profile;