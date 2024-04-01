import React from "react";
import { useParams } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import { useState, useEffect } from "react";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ReactSession } from 'react-client-session';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
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

function OpenBankUsers() {
    const id = ReactSession.get("id");
    const bank_name = ReactSession.get("bank_name");
    const [open, setOpen] = useState(false);
    const username = ReactSession.get("username");
    const [userImage, setUserImage] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBankMember, setIsBankMember] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
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

    useEffect(() => {
        Axios.get(`http://localhost:5000/showProductUser1/${id}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ:", response.data[0]);
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
    useEffect(() => {
        Axios.get(`http://localhost:5000/CheckUserInBank/${username}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ:", response.data);

                // Assuming response.data is an array
                const userEntries = response.data;

                // Check if the user is a member
                const isMember = userEntries.some((userEntry) => {
                    const userBankEmail = userEntry?.userBank_email;
                    const userBankName = userEntry?.userBank_bankName;
                    return userBankEmail === username && userBankName === bank_name;
                });

                setIsBankMember(isMember);
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
            });
    }, [username, bank_name]);
    const handleBackbankuser = () => {
        navigate("/bankuser");
    }
    const handleMemberbankuser = () => {
        Swal.fire({
            icon: 'warning',
            title: 'ยืนยันการสมัครสมาชิก',
            text: 'คุณต้องการสมัครสมาชิกในธนาคารหรือไม่?',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่',
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.post('http://localhost:5000/RegisterUserForBank', {
                    userBank_email: username,
                    userBank_bankName: bank_name,
                })
                    .then((response) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'สมัครสมาชิกเสร็จสิ้น',
                            text: 'คุณได้เป็นสมาชิกของธนาคารเรียบร้อยแล้ว',
                            confirmButtonText: 'OK',
                        });
                    })
                    .catch((error) => {
                        if (error.response) {
                            console.error("Server Error:", error.response.data);
                            if (error.response.data === "User is not a member of the bank") {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'ยังไม่ได้เป็นสมาชิก',
                                    text: 'กรุณาสมัครสมาชิกก่อนทำรายการ',
                                });
                            }
                        } else if (error.request) {
                            console.error("No Response from Server");
                        } else {
                            console.error("Error:", error.message);
                        }
                    });
            }
        });
    }
    const handleOrderbankuser = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:5000/CheckUserInBank/${username}`);
            console.log("ข้อมูลที่ได้รับ:", response.data);

            // Assuming response.data is an array
            const userEntries = response.data;

            // Flag to check if a match is found
            let isBankMember = false;

            // Iterate through the array
            for (const userEntry of userEntries) {
                const userBankEmail = userEntry?.userBank_email;
                const userBankName = userEntry?.userBank_bankName;

                // Check if the current entry matches the expected values
                if (userBankEmail === username && userBankName === bank_name) {
                    isBankMember = true;
                    ReactSession.set('bank_name', bank_name);
                    ReactSession.set('username', username);
                    ReactSession.set("id", id);
                    navigate(`/orderbankusers`);
                    // Exit the loop once a match is found
                    break;
                }
            }

            // If no match is found after the loop, show an alert
            if (!isBankMember) {
                Swal.fire({
                    icon: 'warning',
                    title: 'ยังไม่ได้เป็นสมาชิก',
                    text: 'กรุณาสมัครสมาชิกก่อนทำรายการ',
                });

            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
        }
    }
    const handleExchangePage = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:5000/CheckUserInBank/${username}`);
            console.log("ข้อมูลที่ได้รับ:", response.data);

            // Assuming response.data is an array
            const userEntries = response.data;

            // Flag to check if a match is found
            let isBankMember = false;

            // Iterate through the array
            for (const userEntry of userEntries) {
                const userBankEmail = userEntry?.userBank_email;
                const userBankName = userEntry?.userBank_bankName;

                // Check if the current entry matches the expected values
                if (userBankEmail === username && userBankName === bank_name) {
                    isBankMember = true;
                    ReactSession.set('bank_name', bank_name);
                    ReactSession.set('username', username);
                    ReactSession.set("id", id);
                    navigate(`/changepage`);
                    // Exit the loop once a match is found
                    break;
                }
            }

            // If no match is found after the loop, show an alert
            if (!isBankMember) {
                Swal.fire({
                    icon: 'warning',
                    title: 'ยังไม่ได้เป็นสมาชิก',
                    text: 'กรุณาสมัครสมาชิกก่อนทำรายการ',
                });
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
        }
    };

    const handleOrderbankuserSale = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:5000/CheckUserInBank/${username}`);
            console.log("ข้อมูลที่ได้รับ:", response.data);

            // Assuming response.data is an array
            const userEntries = response.data;

            // Flag to check if a match is found
            let isBankMember = false;

            // Iterate through the array
            for (const userEntry of userEntries) {
                const userBankEmail = userEntry?.userBank_email;
                const userBankName = userEntry?.userBank_bankName;

                // Check if the current entry matches the expected values
                if (userBankEmail === username && userBankName === bank_name) {
                    isBankMember = true;
                    ReactSession.set('bank_name', bank_name);
                    ReactSession.set('username', username);
                    ReactSession.set("id", id);
                    navigate(`/orderbankusersale`);
                    // Exit the loop once a match is found
                    break;
                }
            }

            // If no match is found after the loop, show an alert
            if (!isBankMember) {
                Swal.fire({
                    icon: 'warning',
                    title: 'ยังไม่ได้เป็นสมาชิก',
                    text: 'กรุณาสมัครสมาชิกก่อนทำรายการ',
                });

            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
        }
    }

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

            {filteredProducts ? (
                <>
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
                            <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากร : </FormLabel>
                            <TextField disabled id="outlined-disabled" label={`${filteredProducts.product_quantity} ${filteredProducts.product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', margin: 30 }}>
                        <Button variant="contained" color="error" onClick={handleBackbankuser}>ย้อนกลับ</Button>

                        {filteredProducts.product_type3 === 'ทรัพยากรเพื่อแลกเปลี่ยน' && (
                            <Button variant="contained" color="warning" onClick={() => handleExchangePage(id)}>ไปหน้าแลกเปลี่ยน</Button>
                        )}
                        {filteredProducts.product_type === 'ทรัพยากรเพื่อเช่าหรือยืม' && (
                            <Button variant="contained" color="warning" onClick={() => handleOrderbankuser(id)} >ไปหน้าเช่าหรือยืม</Button>
                        )}
                        {filteredProducts.product_type2 === 'ทรัพยากรเพื่อการซื้อขาย' && (
                            <Button variant="contained" color="warning" onClick={() => handleOrderbankuserSale(id)} >ไปหน้าซื้อขาย</Button>
                        )}
                        {!isBankMember && (
                            <Button variant="contained" color="primary" onClick={handleMemberbankuser}>สมัครสมาชิก</Button>
                        )}
                    </div>
                </>
            ) : (
                <p>Details not found.</p>
            )}
        </div>
    );
}
export default OpenBankUsers;