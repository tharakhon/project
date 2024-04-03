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
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import logo from "../src/image/Logo.png";
import { styled, useTheme, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { ReactSession } from 'react-client-session';
import Axios from 'axios';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import massage from './image/conversation.png';
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
const UnitDropdown = ({ selectedUnit, handleUnitChange }) => {
  const units = ['กรัม', 'กิโลกรัม', 'ชิ้น', 'คัน', 'ถุง', 'กระสอบ', 'ลูก', 'หวี', 'เครื่อง', 'แกลลอน', 'ถัง', 'กระปุก', 'เมตร', 'เซนติเมตร', 'กิโลเมตร', 'มิลลิเมตร', 'ตารางเมตร']; // เพิ่มหน่วยตามที่ต้องการ

  return (
    <FormControl fullWidth>
      <Select
        labelId="unit-dropdown-label"
        id="unit-dropdown"
        value={selectedUnit}
        onChange={handleUnitChange}
      >
        {units.map((unit) => (
          <MenuItem key={unit} value={unit}>
            {unit}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
function Borroww() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [quantity, setQuantity] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [flag, setflag] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const bank_name = ReactSession.get("bank_name");
  const bank_codename = ReactSession.get("bank_codename");
  const id = ReactSession.get("id");
  const [open, setOpen] = useState(false);
  const username = ReactSession.get("username");
  const [isDataSaved, setIsDataSaved] = useState(false);
  const theme = useTheme();
  const [selectedUnit, setSelectedUnit] = useState('กรัม');
  const [borrowDate, setBorrowDate] = useState(null);
  const [userImage, setUserImage] = useState('');
  useEffect(() => {
    Axios.get(`http://localhost:5000/readimage/${username}`)
      .then((response) => {
        console.log("image:", response.data[0].image);
        // Assuming the image data is present in the response data
        setUserImage(response.data[0].image);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [username, userImage]);

  const handleOpenBankChat = () => {
    ReactSession.set('username', username)
    ReactSession.set('bank_name', bank_name)
    navigate('/Bankuserchat')
  }

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleBorrowDateChange = (date) => {
    const currentDate = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(currentDate.getMonth() + 3);

    if (date <= currentDate || date > threeMonthsLater) {
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'วันที่มารับทรัพยากรต้องมากกว่าวันที่ปัจจุบัน',
      });
      return;
    }
    setBorrowDate(date);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleClick = () => {
    ReactSession.set('username', username)
    navigate("/profilebank")
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleCurrencyChange = (event, value) => {
    setSelectedCurrency(value);
  };

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
  const handleSubmit = () => {
    ReactSession.set('username', username)
    ReactSession.set('bank_name', bank_name);
    navigate('/bankuser')
  };
  const handleBack = () => {
    if (!isDataSaved && (profile || image || selectedCurrency || quantity || selectedUnit || additionalDetails || borrowDate !== null)) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลที่กรอกอาจไม่ได้รับการบันทึก',
        text: 'คุณต้องการบันทึกข้อมูลก่อนออกหรือไม่?',
        showCancelButton: true,
        confirmButtonText: 'ใช่, ฉันต้องการบันทึกข้อมูล',
        cancelButtonText: 'ไม่, ฉันต้องการออกโดยไม่บันทึก',
      }).then((result) => {
        if (result.isConfirmed) {
          handleAddData();
        } else {
          ReactSession.set('bank_name', bank_name);
          ReactSession.set('username', username);
          navigate('/changepage');
        }
      });
    } else {
      ReactSession.set('bank_name', bank_name);
      ReactSession.set('username', username);
      navigate('/changepage');
    }
  };



  const handleAddData = () => {

    if (!profile || !image || !selectedCurrency || !quantity || !selectedUnit || !additionalDetails || !borrowDate) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
      });
      return;
    }
    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการเพิ่มข้อมูลใช่หรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ฉันต้องการเพิ่มข้อมูล',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        // ถ้ายืนยัน
        const formData = new FormData();
        formData.append("orderExchange_id", id);
        formData.append("bank_codename", bank_codename);
        formData.append("bank_name", bank_name);
        formData.append("userbank_email", username);
        formData.append('userbank_productname', profile);
        formData.append("userbank_productimage", image);
        formData.append("userbank_producttype1", selectedCurrency.label);
        formData.append("userbank_productquantity", quantity);
        formData.append('userbank_unit', selectedUnit);
        formData.append('userbank_productdetails', additionalDetails);
        formData.append("userbank_borrowdate", borrowDate);

        Axios.post('http://localhost:5000/userbank_exchange', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then((response) => {
            console.log(response.data);
            setIsDataSaved(true);
            if (response.data.Status === 'Success') {
              Swal.fire({
                icon: 'success',
                title: 'เพิ่มข้อมูลสำเร็จ',
                text: 'ไฟล์ถูกอัปโหลดเรียบร้อย',
              });
              ReactSession.set('username', username)
              ReactSession.set('bank_name', bank_name);
              navigate('/bankuser')
            } else {
              console.error("Error");
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถเพิ่มข้อมูลได้ โปรดลองอีกครั้งในภายหลัง',
            });
            console.error("Error:", error.message);
          });
      }
    });
  }

  return (
    <div>
      <AppBar position="static" open={open} sx={{ backgroundColor: '#07C27F' }}>
        <Toolbar>
          <Typography><img src={logo} style={{ padding: 20, height: 80, width: 80, }} /></Typography>
          <Typography><p style={{ color: 'white', padding: 20, fontSize: 24, }}>AVB</p></Typography>
          <Typography><p style={{ color: 'white', padding: 20, fontSize: 24, marginLeft: 360 }}>ธนาคาร : {bank_name}</p></Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit" onClick={() => navigate(`/main`)}>
              <HomeIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenBankChat}
            >
              <img src={massage} style={{ width: '24px' }} />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            >
              <Avatar alt="Remy Sharp" src={userImage} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={textStyle}> ทรัพยากรที่คุณนำไปแลกเปลี่ยน</h1>
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
        <div style={{ marginTop: 50 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร:</FormLabel>
          <TextField id="outlined-basic" label="" variant="outlined" sx={{ width: '50ch' }} onChange={(e) => setProfile(e.target.value)} />
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
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            sx={{ width: 435 }}
            renderInput={(params) => <TextField {...params} label="" />}>
          </Autocomplete>

        </div>
        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการแลกเปลี่ยน:</FormLabel>
          <TextField sx={{ width: 435 }}
            label="ใส่จำนวนทรัพยากรที่คุณต้องการ"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ display: 'flex', justifyContent: 'end' }}>
                  <UnitDropdown
                    selectedUnit={selectedUnit}
                    handleUnitChange={handleUnitChange}
                  />
                </InputAdornment>
              ),
            }} ></TextField>
        </div>
        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>รายละเอียดเพิ่มเติม:</FormLabel>
          <TextField
            id="outlined-multiline-static"
            sx={{ width: '50ch' }}
            value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={[
              'DatePicker',
            ]}
            sx={{ width: '50ch', marginTop: 3 }}
          >
            <DemoItem label={<Label componentName="วันที่จะนำของมาแลกเปลี่ยน" valueType="date" />} >
              <DatePicker
                value={borrowDate}
                onChange={handleBorrowDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: 40 }}>
        <Button variant="contained" size="large" color="error" onClick={handleBack}> ย้อนกลับ </Button>
        <Button variant="contained" color='warning' onClick={handleAddData}>บันทึกข้อมูล</Button>
      </div>

    </div>
  );
}
export default Borroww;