import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import { Autocomplete, FormControl, FormHelperText, InputAdornment, MenuItem, OutlinedInput } from "@mui/material";
import Stack from "@mui/material";
import NavBarBank from "./navBarBank";
import { useNavigate } from "react-router-dom";


const currencies = [
  { label: 'ทรัพยากรทางการเกษตรใช้แล้วหมด เช่น ปุ๋ย ดิน' },
  { label: 'อุปกรณ์หรือเครื่องมือทางการเกษตรขนาดเล็ก' },
  { label: 'อุปกรณ์หรือเครื่องมือทางการเกษตรขนาดใหญ่' },
];


const textStyle = {
  color: 'black',
  fontSize: '50px',
  fontWeight: 'normal',
};

function Resource() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [email, setEmail] = useState();
  const [tel, setTel] = useState("");
  const [flag, setflag] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
  const handleSubmit = () => {
    navigate('/bank')
  };
  return (
    <div>
      <NavBarBank />

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={textStyle}> เพิ่มทรัพยากรของคุณ</h1>
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
        <div style={{ marginTop: 50 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร:</FormLabel>
          <TextField id="outlined-basic" label="" variant="outlined" sx={{ width: '50ch' }} />
        </div>
        <FormControl sx={{ marginTop: 5 }} component="fieldset" variant="standard">
          <FormLabel component="legend" style={{ color: 'black' }}>เลือกประเภทบริการ</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="ทรัพยากรเพื่อเช่าหรือยืม" />
            <FormControlLabel control={<Checkbox />} label="ทรัพยากรเพื่อการซื้อขาย" />
            <FormControlLabel control={<Checkbox />} label="ทรัพยากรเพื่อแลกเปลี่ยน" />
          </FormGroup>
        </FormControl >
        <div style={{ marginTop: 20 }}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          ></Box>
          <FormLabel component="legend" style={{ color: 'black' }}>เลือกประเภททรัพยากรทางการเกษตร:</FormLabel>
          <Autocomplete disablePortal
            id="combo-box-demo"
            options={currencies}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="" />}>
          </Autocomplete>

        </div>
        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากร:</FormLabel>
          <TextField sx={{ width: 220 }}></TextField>
        </div>

        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>รายละเอียดเพิ่มเติม:</FormLabel>
          <TextField
            id="outlined-multiline-static"

            multiline
            rows={4}
            sx={{ width: '40ch' }} />
        </div>

        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>ราคาของทรัพยากร:</FormLabel>
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">บาท</InputAdornment>}

          />
          <FormHelperText >หมายเหตุ : ถ้าเลือกบริการเช่ายืมหรือแลกเปลี่ยน</FormHelperText>
          <FormHelperText >ให้ใส่ราคา0บาท</FormHelperText>


        </div>
        <div style={{ display: 'flex', justifyContent:'space-between', marginTop: 40 }}>
          <Button variant="contained" size="large" color="error" onClick={handleSubmit}> ยกเลิก </Button>
          <Button variant="contained" size="large" color="success" onClick={handleSubmit}>เสร็จสิ้น</Button>
        </div>
      </div>


    </div>
  );
}
export default Resource;