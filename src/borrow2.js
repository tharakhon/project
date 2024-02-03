import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import { Autocomplete, FormControl, FormHelperText, InputAdornment, MenuItem, OutlinedInput, Tooltip } from "@mui/material";
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import Navbar1 from "./NavBar1";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NavBarBank from "./navBarBank";

const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong>
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a href="https://mui.com/x/introduction/licensing/#pro-plan">
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}



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

function Borroww() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [email, setEmail] = useState();
  const [tel, setTel] = useState("");
  const [flag, setflag] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

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
  const handleBack = () => {
    navigate('/changepage')
  };
  return (
    <div>
      <NavBarBank />

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={textStyle}> ทรัพยากรที่คุณนำไปแลกเปลี่ยน</h1>
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
            sx={{ width: 435 }}
            renderInput={(params) => <TextField {...params} label="" />}>
          </Autocomplete>

        </div>
        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการแลกเปลี่ยน:</FormLabel>
          <TextField sx={{ width: 435 }} defaultValue="ใส่จำนวนทรัพยากรที่คุณต้องการ"></TextField>
        </div>
        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>รายละเอียดเพิ่มเติม:</FormLabel>
          <TextField
            id="outlined-multiline-static"

            multiline
            rows={4}
            sx={{ width: '50ch' }} />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={[
              'DatePicker',
            ]}
          >
            <DemoItem label={<Label componentName="วันที่จะนำของมาแลกเปลี่ยน" valueType="date" />}>
              <DatePicker />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>



        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 40 }}>
          <Button variant="contained" size="large" color="error" onClick={handleBack}> ย้อนกลับ </Button>
          <Button variant="contained" size="large" color="success" >เสร็จสิ้น</Button>
        </div>
      </div>


    </div>
  );
}
export default Borroww;