import React, { useState, useEffect } from "react";
import NavBarBank from "./navBarBank";
import { useLocation, useParams } from "react-router-dom";
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
import { ReactSession } from 'react-client-session';
import Axios from "axios";
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
import Swal from 'sweetalert2';

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

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

function Changepage() {
    const id = ReactSession.get("id");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [borrowDate, setBorrowDate] = useState(null);
    const navigate = useNavigate();
    const bank_name = ReactSession.get("bank_name");
    const [open, setOpen] = useState(false);
    const username = ReactSession.get("username");
    const theme = useTheme();
    const [inputQuantity, setInputQuantity] = useState('');
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleBorrowDateChange = (date) => {
        setBorrowDate(date);
    };
    const handleChange = (event) => {
        const newValue = event.target.value;

        // Ensure the input value is a valid number and does not exceed the available quantity
        if (!isNaN(newValue) && newValue <= filteredProducts.product_quantity) {
            setInputQuantity(newValue);
        }
    };

    const handleClick = () => {
        ReactSession.set('username', username)
        navigate("/profile")
    }
    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        Axios.get(`http://localhost:5000/showProductUser1/${id}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับchangpage:", response.data[0]);
                // Assuming response.data is an array of products
                // Choose the first product for now

                if (response.data.length > 0) {

                    setFilteredProducts(response.data[0]);
                }
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
            })

    }, []);
    const handleBackbankuser = () => {
        if (inputQuantity !== '' || borrowDate !== null) {
            Swal.fire({
                icon: 'question',
                title: 'คุณต้องการบันทึกข้อมูลที่แก้ไขหรือไม่?',
                text: 'ข้อมูลที่แก้ไขจะไม่ถูกบันทึกหากคุณเลือกย้อนกลับโดยไม่บันทึก',
                showCancelButton: true,
                confirmButtonText: 'บันทึก',
                cancelButtonText: 'ไม่บันทึก',
            }).then((result) => {
                if (result.isConfirmed) {
                    handleNextbankuser();
                } else {
                    navigate('/openbankusers'); 
                }
            });
        } else {
            navigate('/openbankusers'); 
        }
    }

    const handleNextbankuser = () => {
        if (!inputQuantity || !borrowDate) {
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
            text: 'คุณต้องการส่งข้อมูลไปให้ทางธนาคารหรือไม่?',
            showCancelButton: true,
            confirmButtonText: 'ใช่, ฉันต้องการส่งข้อมูล',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                // ถ้ายืนยัน
                Axios.post('http://localhost:5000/order_exchangeRequest', {
                    orderExchange_id: id,
                    bank_name: bank_name,
                    userbank_email: username,
                    orderExchange_quantity: inputQuantity,
                    orderExchange_borrowDate: borrowDate,
                })
                    .then((response) => {
                        console.log(response.data);
                        ReactSession.set('bank_name', bank_name);
                        ReactSession.set('id', id);
                        ReactSession.set('bank_codename', filteredProducts.bank_codename);
                        ReactSession.set('username', username);
                        Swal.fire({
                            icon: 'success',
                            title: 'ส่งข้อมูลสำเร็จ',
                            text: 'รอทางธนาคารตรวจสอบข้อมูล',
                        }).then(() => {
                            navigate("/borroww");
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
    }

    return (
        <div>
            <AppBar position="static" open={open} sx={{ backgroundColor: '#07C27F' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography><img src={logo} style={{ padding: 20, height: 80, width: 80, }} /></Typography>
                    <Typography><p style={{ color: 'white', padding: 20, fontSize: 24, }}>AVB</p></Typography>
                    <Typography><p style={{ color: 'white', padding: 20, fontSize: 24, marginLeft: 360 }}>ธนาคาร : {bank_name}</p></Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" color="inherit">
                            <TextsmsOutlinedIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleClick}
                        >
                            <AccountCircle />
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
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['หน้าหลัก'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => navigate(`/main`)}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <List>
                    {['ธนาคารของคุณ'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => navigate('/bank')}>
                                <ListItemIcon>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {filteredProducts ? (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ maxWidth: 345, m: 1 }} >
                            <CardMedia
                                component="img"
                                height="300"
                                image={`http://localhost:5000/image/${filteredProducts.product_image}`}
                                title="รูปภาพทรัพยากร"
                            />
                        </Card>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                        <div style={{ marginTop: 50 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                            <TextField disabled id="outlined-disabled" label={filteredProducts.product_name} variant="outlined" sx={{ width: '50ch' }} />
                        </div>

                        <FormControl sx={{ marginTop: 5, width: '50ch' }} component="fieldset" variant="standard">
                            <FormLabel component="legend" style={{ color: "black" }}>
                                ประเภทบริการ :
                            </FormLabel>
                            <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProducts.product_type)} />}
                                        label="ทรัพยากรเพื่อเช่าหรือยืม"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProducts.product_type2)} />}
                                        label="ทรัพยากรเพื่อการซื้อขาย"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProducts.product_type3)} />}
                                        label="ทรัพยากรเพื่อแลกเปลี่ยน"
                                    />
                                </div>
                            </FormGroup>
                        </FormControl>

                        <div style={{ marginTop: 20 }}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            ></Box>
                            <FormLabel component="legend" style={{ color: 'black' }}>ประเภททรัพยากรทางการเกษตร:</FormLabel>
                            <TextField disabled id="outlined-disabled" label={filteredProducts.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                        </div>
                        <div style={{ marginTop: 30 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>รายละเอียดเพิ่มเติม:</FormLabel>
                            <TextField
                                disabled
                                label={filteredProducts.product_details}
                                id="outlined-disabled"
                                sx={{ width: '50ch' }} />
                        </div>

                        <div style={{ marginTop: 30 }}>
                            <FormLabel component="legend" style={{ color: 'red' }}>จำนวนทรัพยากร : {filteredProducts.product_quantity} {filteredProducts.product_unit}</FormLabel>
                            <TextField
                                id="outlined-disabled"
                                label="ใส่จำนวนที่ต้องการ"
                                variant="outlined"
                                value={inputQuantity}
                                onChange={handleChange}
                                sx={{ width: '50ch' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {filteredProducts.product_unit}
                                        </InputAdornment>
                                    ),
                                }} />
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
                    <div style={{ display: "flex", justifyContent: "space-around", margin: 40 }}>
                        <Button variant="contained" color="error" onClick={handleBackbankuser}>ย้อนกลับ</Button>
                        <Button variant="contained" color="warning" onClick={handleNextbankuser} >ต่อไป</Button>
                    </div>
                </div>
            ) : (
                <p>Details not found.</p>
            )}
        </div>
    );
}

export default Changepage;
