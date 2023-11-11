import React from "react";
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBank1 from "./navbank1";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function RegisterBank() {
  const [profile, setProfile] = useState();
  const [email, setEmail] = useState();
  const [tel, setTel] = useState("");
  const [flag, setflag] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูลใน /user หรือไม่
    Axios.get("http://localhost:5000/user/:email")
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
  const handleSubmit = () => {

  }
  const handleBack = () => {
    navigate("/bank");
  }
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    }
  };
  const circularImageContainer = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    overflow: 'hidden',
  };
  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    document.getElementById("image-upload").click();
  };
  return (
    <div>
      <NavBank1 />
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
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            {imagePreview ? (
              <div style={circularImageContainer}>
                <img
                  src={imagePreview}
                  alt="Selected"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{ margin: 1 }}
                  >
                    Upload Image
                  </Button>
                </label>
              </div>
            )}
          </div>
          <TextField
            id="outlined-required"
            label="ชื่อธนาคาร"
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
            value={email} // ใช้ value แทน defaultValue
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
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
        <Button variant="contained" color='error' sx={{ top: 100 }} onClick={handleBack}>ย้อนกลับ</Button>
        <Button variant="contained" color='success' sx={{ backgroundColor: '#07C27F', top: 100 }} onClick={handleBack}>เสร็จสิ้น</Button>
      </div>
    </div>

  );
}
export default RegisterBank;