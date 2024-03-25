import React from "react";
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBank1 from "./navbank1";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MapShow from "./mapShow";
import { Autocomplete, FormLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import Ribbon1 from "../src/image/ribbon1.png";
import Ribbon2 from "../src/image/ribbon2.png";
import Ribbon3 from "../src/image/ribbon3.png";
import Ribbon4 from "../src/image/ribbon4.png";
import { ReactSession } from 'react-client-session';
import Swal from 'sweetalert2';

function RegisterBank() {
  const username = ReactSession.get("username");
  const [profile, setProfile] = useState();
  const [tel, setTel] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [codename, setCodeName] = useState('');
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [medals, setMedals] = useState({
    bronze: '',
    silver: '',
    gold: '',
    phat: '',
  });
  console.log(medals)
  console.log(profile)


  console.log(address)
  console.log(tel)
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value)) {
      setMedals((prevMedals) => ({
        ...prevMedals,
        [name]: value,
      }));
    }

  };
  // const handleLocationChange = ({ lat, lng }) => {
  //   console.log('New location:', { lat, lng });

  //   setLatitude(lat, () => {
  //     console.log('Updated Latitude:', lat);
  //   });

  //   setLongitude(lng, () => {
  //     console.log('Updated Longitude:', lng);
  //   });
  // };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lon: longitude });

      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );
  }, []);
  useEffect(() => {

    console.log(username);

    Axios.get(`http://localhost:5000/user/${username}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data[0].email);
        // const userEmails = response.data.map((user) => user.email);
        // if (userEmails==email) {
        //   console.log("ข้อมูลที่ได้รับ: profile.email", profile);
        //   setflag(true);
        // } else {
        //   alert("ไม่พบข้อมูลผู้ใช้");
        // }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      });
  }, []);
  const handleSubmit = () => {
    // เช็คว่าข้อมูลครบถ้วนหรือไม่
    if (!codename || !username || !tel || !address || !profile || !currentPosition || !image || !medals) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
      });
      return;
    }

    // ถามให้แน่ใจก่อนจะดำเนินการต่อ
    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการสร้างบัญชีธนาคารหรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ฉันต้องการสร้างบัญชีธนาคาร',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        // ถ้ายืนยัน
        const formData = new FormData();
        formData.append("bank_codename", codename);
        formData.append("bank_email", username);
        formData.append("bank_telephone", tel);
        formData.append('bank_address', address);
        formData.append("bank_name", profile);
        formData.append("bank_latitude", currentPosition.lat);
        formData.append("bank_longitude", currentPosition.lon);
        formData.append('bank_image', image);
        formData.append('bank_bronze', medals.bronze);
        formData.append('bank_silver', medals.silver);
        formData.append('bank_gold', medals.gold);
        formData.append('bank_platinum', medals.phat);

        Axios.post('http://localhost:5000/bank_create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then((response) => {
            console.log(response.data);
            setIsDataSaved(true);
            if (response.data.Status === 'Success') {
              Swal.fire({
                icon: 'success',
                title: 'สร้างบัญชีธนาคารสำเร็จ',
                text: 'ไฟล์ถูกอัปโหลดเรียบร้อย',
              });
            } else {
              console.error("Error");
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถสร้างบัญชีธนาคารได้ตรวจสอบชื่อรหัสธนาคารหรือชื่อธนาคารหรืออีเมลล์อาจเคยสร้างธนาคารอยู่แล้ว โปรดลองอีกครั้งในภายหลัง',
            });
            console.error("Error:", error.message);
          });
      }
    });
  }
  const handleBack = () => {
    navigate('/main');
  }
  const handleNext = () => {
    ReactSession.set("codename", codename);
    navigate(`/bank`);
  }

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    }
  };
  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    document.getElementById("image-upload").click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
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
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src={imagePreview}
                  alt="Selected"
                  style={{
                    width: '30ch',
                    height: '30ch',
                    objectFit: 'cover',
                  }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={handleRemoveImage}
                  sx={{ marginTop: 1 }}
                >
                  Remove Image
                </Button>
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
            required
            id="outlined-required"
            label="ใส่รหัสของธนาคารของคุณ(ซ้ำกับธนาคารอื่นไม่ได้)"
            variant="outlined"
            sx={{ margin: 1 }}
            value={codename}
            onChange={(event) => {
              if (event.target.value.length <= 10) {
                setCodeName(event.target.value);
              }
            }}
            InputLabelProps={{
              shrink: true,
              color: 'error'
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="ชื่อธนาคาร(ซ้ำกับธนาคารอื่นไม่ได้)"
            variant="outlined"
            sx={{ margin: 1 }}
            value={profile}
            onChange={(event) => {
              if (event.target.value.length <= 20) {
                setProfile(event.target.value);
              }
            }}
            InputLabelProps={{
              shrink: true,
              color: 'error'
            }}
          />

          <TextField
            disabled
            id="outlined-disabled"
            label="Email"
            variant="outlined"
            sx={{ margin: 1 }}
            value={username} // ใช้ value แทน defaultValue
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            required
            id="outlined-basic"
            label="Tel"
            variant="outlined"
            sx={{ margin: 1 }}
            value={tel}
            onChange={(event) => {
              if (!isNaN(event.target.value)) {
                if (event.target.value.length <= 10) {
                  setTel(event.target.value);
                }
              }
            }}
            inputProps={{
              pattern: "[0-9]*"
            }}
          />
        </div>
      </Box>
      <h1 style={{ textAlign: 'center' }}>ปักหมุดที่อยู่ของคุณโดยกดที่รูปคนใน Map </h1>
      <MapShow />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mt: 2, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-multiline-static"
            label="ใส่ที่อยู่ของคุณ"
            multiline
            rows={6}
            value={address}
            onChange={(e) => {
              if (e.target.value.length <= 250) {
                setAddress(e.target.value);
              }
            }}
          />
        </Box>
        <h2>จัดการแรงค์ของผู้ใช้ว่าสามารถทำอะไรได้บ้าง</h2>
      </div >

      <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
        <img src={Ribbon1} alt="Bronze" style={{ marginTop: 60 }} />
        <FormLabel component="legend" style={{ color: 'black', fontSize: '22px', left: 50, top: 70 }}>Bronze</FormLabel>
        <div>
          <FormLabel component="legend" style={{ color: 'black', right: 20, top: 100 }}>สามารถทำรายการในธนาคารทั้งหมดได้ </FormLabel>
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
            name="bronze"
            value={medals.bronze}
            onChange={handleChange}
            sx={{ right: 20, top: 100, }}
          />
        </div>

      </div>
      <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
        <img src={Ribbon2} alt="Silver"
          style={{ marginTop: 100, marginRight: 7 }} />
        <FormLabel component="legend" style={{ color: 'black', fontSize: '22px', left: 38, top: 110 }}>Silver</FormLabel>
        <div>
          <FormLabel component="legend" style={{ color: 'black', right: 20, top: 140 }}>สามารถทำรายการในธนาคารทั้งหมดได้ </FormLabel>
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
            name="silver"
            value={medals.silver}
            onChange={handleChange}
            sx={{ right: 20, top: 140, }}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
        <img src={Ribbon3} alt="Gold"
          style={{ marginTop: 100, marginRight: 13 }} />
        <FormLabel component="legend" style={{ color: 'black', fontSize: '22px', left: 34, top: 110 }}>Gold</FormLabel>
        <div>
          <FormLabel component="legend" style={{ color: 'black', right: 12, top: 140 }}>สามารถทำรายการในธนาคารทั้งหมดได้ </FormLabel>
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end" >รายการ</InputAdornment>}
            name="gold"
            value={medals.gold}
            onChange={handleChange}
            sx={{ right: 12, top: 140, }}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
        <img src={Ribbon4} alt="Platinum"
          style={{ marginTop: 100, marginLeft: 17 }} />
        <FormLabel component="legend" style={{ color: 'black', fontSize: '22px', left: 58, top: 110 }}>Platinum</FormLabel>
        <div>
          <FormLabel component="legend" style={{ color: 'black', right: 30, top: 140 }}>สามารถทำรายการในธนาคารทั้งหมดได้ </FormLabel>
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"  >รายการ</InputAdornment>}
            name="phat"
            value={medals.phat}
            onChange={handleChange}
            sx={{ right: 30, top: 140, }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: 10 }}>
        <Button variant="contained" color='error' sx={{ top: 100 }} onClick={handleBack}>ย้อนกลับ</Button>
        <Button variant="contained" color='warning' sx={{ top: 100 }} onClick={handleSubmit}>บันทึกข้อมูล</Button>
        <Button variant="contained" color='success' sx={{ backgroundColor: '#07C27F', top: 100 }} onClick={handleNext} disabled={!isDataSaved}>เสร็จสิ้น</Button>
      </div>
    </div>

  );
}
export default RegisterBank;