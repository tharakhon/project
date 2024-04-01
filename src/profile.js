import React, { useState, useEffect } from "react";
import NavbarProfile from "./navBarprofile";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import Swal from 'sweetalert2';

function Profile() {
  const username = localStorage.getItem('username');
  const [profile, setProfile] = useState();
  const [useremail, setEmail] = useState();
  const [tel, setTel] = useState("");
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:5000/user/${username}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data[0].email);
        const userData = response.data;

        setUserImage(response.data[0].image);
        setProfile(response.data[0].fullname);
        setEmail(response.data[0].email);
        setTel(response.data[0].tel);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      });
  }, [username]);

  const handleBack = () => {
    if (isEdited) {
      Swal.fire({
        icon: 'warning',
        title: 'ยังไม่ได้บันทึกการเปลี่ยนแปลง',
        text: 'คุณต้องการที่จะออกโดยที่ยังไม่ได้บันทึกการเปลี่ยนแปลงหรือไม่?',
        showCancelButton: true,
        confirmButtonText: 'ออกโดยที่ยังไม่บันทึก',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('username', username)
          navigate(-1);
        }
      });
    } else {
      localStorage.setItem('username', username)
      navigate(-1);
    }
  }

  const handleSubmit = () => {
    Axios.put(`http://localhost:5000/updateProfile/${useremail}`, {
      fullname: profile,
      tel: tel
    })
      .then((response) => {
        console.log("ข้อมูลถูกอัปเดต:", response.data);
        setIsEdited(false);
        Swal.fire({
          icon: 'success',
          title: 'อัปเดตข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถอัปเดตข้อมูลได้ กรุณาลองอีกครั้ง',
        });
      });
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
            value={profile}
            onChange={(event) => {
              if (event.target.value.length <= 30) {
                setProfile(event.target.value);
                setIsEdited(true);
              }
            }}
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
            value={useremail}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Tel"
            variant="outlined"
            sx={{ margin: 1 }}
            value={tel}
            onChange={(event) => {
              if (!isNaN(event.target.value)) {
                if (event.target.value.length <= 10) {
                  setTel(event.target.value);
                  setIsEdited(true);
                }
              }
            }}
            inputProps={{ pattern: "[0-9]*" }}
          />
        </div>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant="contained" color='error' sx={{}} onClick={handleBack}>ย้อนกลับ</Button>
        <Button variant="contained" color='success' sx={{ backgroundColor: '#07C27F' }} onClick={handleSubmit}>บันทึกข้อมูล</Button>
      </div>
    </div>
  );
}

export default Profile;
