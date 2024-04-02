import React, { useState } from "react";
import NavBarBank from "./navBarBank";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { Autocomplete, FormControl, FormHelperText, InputAdornment, MenuItem, OutlinedInput } from "@mui/material";
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect } from 'react';
import Axios from "axios";
import { ReactSession } from 'react-client-session';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from "@mui/material/FormGroup";
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
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import massage from './image/conversation.png'
import Avatar from '@mui/material/Avatar';
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
const UnitDropdown = ({ selectedUnit, handleUnitChange }) => {
    const units = ['กรัม', 'กิโลกรัม', 'ชิ้น', 'คัน', 'ถุง', 'กระสอบ']; // เพิ่มหน่วยตามที่ต้องการ

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

function OrderBankSale() {
    const id = ReactSession.get("id");
    const bank_name = ReactSession.get("bank_name");
    const [open, setOpen] = useState(false);
    const username = ReactSession.get("username");
    const [userImage, setUserImage] = useState('');
    const [borrowDate, setBorrowDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [filteredProduct, setFilteredProduct] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const [selectedUnit, setSelectedUnit] = useState('กรัม');
    const [inputQuantity, setInputQuantity] = useState('');
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
    const handleBorrowDateChange = (date) => {
        const currentDate = new Date();
        if (date <= currentDate) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'วันที่มารับทรัพยากรต้องมากกว่าวันที่ปัจจุบัน',
            });
            return;
        }
        setBorrowDate(date);
    };

    const handleReturnDateChange = (date) => {
        setReturnDate(date);
    };
    const handleChange = (event) => {
        const newValue = event.target.value;

        // Ensure the input value is a valid number and does not exceed the available quantity
        if (!isNaN(newValue) && newValue <= filteredProduct.product_quantity) {
            setInputQuantity(newValue);
        }
    };

    const handleUnitChange = (event) => {
        setSelectedUnit(event.target.value);
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

    const handleBackbankuser = () => {
        if (inputQuantity || borrowDate) {
            // ถ้ามีข้อมูลที่ถูกเปลี่ยนแปลง
            Swal.fire({
                icon: 'question',
                title: 'คุณต้องการบันทึกข้อมูลก่อนที่จะย้อนกลับหรือไม่?',
                text: 'ข้อมูลที่กรอกจะไม่ถูกบันทึกหากคุณเลือกย้อนกลับโดยไม่บันทึก',
                showCancelButton: true,
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            }).then((result) => {
                if (result.isConfirmed) {
                    handleNext();
                } else {
                    navigate(-1);
                }
            });
        } else {
            navigate(-1);
        }
    }

    const handleNext = () => {
        // Axios.get(`http://localhost:5000/checkPreviousTransactions/${username}`)
        //     .then((response) => {
        //         const previousTransactions = response.data;
        //         if (previousTransactions.length > 0) {
        if (!inputQuantity || !borrowDate) {
            Swal.fire({
                icon: 'error',
                title: 'ข้อมูลไม่ครบถ้วน',
                text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
            });
            return;
        }

        if (inputQuantity <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'ข้อมูลไม่ถูกต้อง',
                text: 'จำนวนสินค้าต้องไม่เท่ากับ 0',
            });
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณต้องการส่งข้อมูลไปให้ทางธนาคารหรือไม่?',
            showCancelButton: true,
            confirmButtonText: 'ใช่, ฉันต้องการส่งข้อมูล',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                // ถ้ายืนยัน
                Axios.post('http://localhost:5000/order_sale', {
                    order_product_id: id,
                    order_sale_bankname: bank_name,
                    userbank_order_sale: username,
                    order_product_quantity: inputQuantity,
                    order_product_date: borrowDate,
                    order_product_price: filteredProduct.product_price,
                    order_product_unit: filteredProduct.product_unit,

                    // ... other data
                })
                    .then((response) => {
                        console.log(response.data);
                        ReactSession.set('username', username);
                        Swal.fire({
                            icon: 'success',
                            title: 'ส่งข้อมูลสำเร็จ',
                            text: 'รอทางธนาคารตรวจสอบข้อมูล',
                        }).then(() => {
                            navigate("/bankuser");
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: 'ไม่สามารถส่งข้อมูลไปยังธนาคารได้ โปรดลองอีกครั้งในภายหลัง',
                        });
                        console.error("Error:", error.message);
                    });
            }
        });
        //     } else {
        //         Swal.fire({
        //             icon: 'info',
        //             title: 'ไม่สามารถดำเนินการได้',
        //             text: 'คุณต้องไปรีวิวรายการเก่าก่อนที่จะทำรายการใหม่',
        //             confirmButtonText: 'ตกลง',
        //         });
        //     }
        // })
        // .catch((error) => {
        //     console.error("Error:", error.message);
        // });



    }
    useEffect(() => {
        // Fetch data from the server
        Axios.get(`http://localhost:5000/showProductUser1/${id}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ:", response.data[0]);
                // Assuming response.data is an array of products
                // Choose the first product for now
                if (response.data.length > 0) {
                    setFilteredProduct(response.data[0]);
                }
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
            })
    }, []);
    const handleOpenBankChat = () => {
        ReactSession.set('username', username)
        ReactSession.set('bank_name', bank_name)
        navigate('/Bankuserchat')
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
            {filteredProduct ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ maxWidth: 345, m: 1 }} >
                            <CardMedia
                                component="img"
                                height="300"
                                image={`http://localhost:5000/image/${filteredProduct.product_image}`}
                                title="รูปภาพทรัพยากร"
                            />
                        </Card>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginTop: 50 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                            <TextField disabled id="outlined-disabled" label="" variant="outlined" defaultValue={filteredProduct.product_name} sx={{ width: '50ch' }} />
                        </div>
                        <FormControl sx={{ marginTop: 5, width: '50ch' }} component="fieldset" variant="standard">
                            <FormLabel component="legend" style={{ color: "black" }}>
                                ประเภทบริการ :
                            </FormLabel>
                            <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProduct.product_type)} />}
                                        label="ทรัพยากรเพื่อเช่าหรือยืม"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProduct.product_type2)} />}
                                        label="ทรัพยากรเพื่อการซื้อขาย"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProduct.product_type3)} />}
                                        label="ทรัพยากรเพื่อแลกเปลี่ยน"
                                    />
                                </div>
                            </FormGroup>
                        </FormControl>
                        <div style={{ marginTop: 30 }}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            ></Box>
                            <FormLabel component="legend" style={{ color: 'black' }}>ประเภททรัพยากรทางการเกษตร:</FormLabel>
                            <TextField disabled id="outlined-disabled" label="" variant="outlined" defaultValue={filteredProduct.product_type4} sx={{ width: '50ch' }} />

                        </div>

                        <div style={{ marginTop: 30 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>รายละเอียดเพิ่มเติม:</FormLabel>
                            <TextField
                                disabled
                                defaultValue={filteredProduct.product_details}
                                id="outlined-multiline-static"
                                sx={{ width: '50ch' }} />
                        </div>
                        <div style={{ marginTop: 30 }}>
                            {filteredProduct.product_price === '' ? null : (
                                <>
                                    <FormLabel component="legend" style={{ color: 'black' }}>ราคาของทรัพยากร:</FormLabel>
                                    <OutlinedInput
                                        disabled
                                        defaultValue={filteredProduct.product_price}
                                        id="outlined-adornment-weight"
                                        sx={{ width: '48ch' }}
                                        endAdornment={<InputAdornment position="end">บาท</InputAdornment>}
                                    />
                                </>
                            )}
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <FormLabel component="legend" style={{ color: 'red' }}>
                                จำนวนทรัพยากร : {filteredProduct.product_quantity} {filteredProduct.product_unit}
                            </FormLabel>
                            <TextField
                                id="unit-input"
                                label="ใส่จำนวนที่คุณต้องการ"
                                variant="outlined"
                                value={inputQuantity}
                                onChange={handleChange}
                                sx={{ width: '50ch', }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {filteredProduct.product_unit}
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'DatePicker',
                                ]}
                                sx={{ width: '50ch', marginTop: 3 }}
                            >
                                <DemoItem label={<Label componentName="วันที่ต้องการมารับทรัพยากร" valueType="date" />}>
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
                        <Button variant="contained" color="error" onClick={handleBackbankuser}>ย้อนกลับ</Button>
                        <Button variant="contained" color="warning" onClick={handleNext}>เสร็จสิ้น</Button>
                    </div>
                </>
            ) : (
                <p>Details not found.</p>
            )}
        </div>
    );
}

export default OrderBankSale;
