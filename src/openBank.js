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
import { Autocomplete, FormHelperText, InputAdornment, MenuItem, OutlinedInput } from "@mui/material";
import Swal from 'sweetalert2';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

function OpenBank() {
    const id = ReactSession.get("id");
    const bank_name = ReactSession.get("bank_name");
    const [open, setOpen] = useState(false);
    const username = ReactSession.get("username");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBankMember, setIsBankMember] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const [editedData, setEditedData] = useState({
        product_name: "",
        product_type: "",
        product_type2: "",
        product_type3: "",
        product_quantity: 0,
        product_unit: "",
        product_price: 0
    });
    const [dataEdited, setDataEdited] = useState(false);

    useEffect(() => {
        Axios.get(`http://localhost:5000/showProductUser1/${id}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ:", response.data[0]);
                // Assuming response.data is an array of products
                // Choose the first product for now
                if (response.data.length > 0) {
                    setFilteredProducts(response.data[0]);
                    setEditedData({
                        product_name: response.data[0].product_name || "",
                        product_type: Boolean(response.data[0].product_type === 'ทรัพยากรเพื่อเช่าหรือยืม'),
                        product_type2: Boolean(response.data[0].product_type2 === 'ทรัพยากรเพื่อการซื้อขาย'),
                        product_type3: Boolean(response.data[0].product_type3 === 'ทรัพยากรเพื่อแลกเปลี่ยน'),
                        product_quantity: response.data[0].product_quantity || 0,
                        product_unit: response.data[0].product_unit || "",
                        product_price: response.data[0].product_price || 0
                    });
                }
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
            })

    }, []);
    const handleUpdate = () => {
        Swal.fire({
            icon: 'warning',
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณต้องการอัปเดตข้อมูลหรือไม่?',
            showCancelButton: true,
            confirmButtonText: 'ใช่, อัปเดตข้อมูล',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.put(`http://localhost:5000/updateProduct/${id}`, {
                    ...editedData,
                    product_type: editedData.product_type ? 'ทรัพยากรเพื่อเช่าหรือยืม' : '',
                    product_type2: editedData.product_type2 ? 'ทรัพยากรเพื่อการซื้อขาย' : '',
                    product_type3: editedData.product_type3 ? 'ทรัพยากรเพื่อแลกเปลี่ยน' : '',
                })
                    .then((response) => {
                        console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
                        setFilteredProducts(response.data);
                        navigate("/bank");
                        Swal.fire({
                            icon: 'success',
                            title: 'อัปเดตข้อมูลสำเร็จ',
                            text: 'ข้อมูลถูกอัปเดตเรียบร้อย'
                        });
                    })
                    .catch((error) => {
                        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: 'ไม่สามารถอัปเดตข้อมูลได้ โปรดลองอีกครั้งในภายหลัง'
                        });
                    });
            }
        });
    };

    const handleBackbank = () => {
        if (dataEdited) {
            Swal.fire({
                icon: 'warning',
                title: 'คุณแน่ใจหรือไม่?',
                text: 'คุณยังไม่ได้บันทึกการเปลี่ยนแปลง คุณต้องการย้อนกลับโดยไม่บันทึกการเปลี่ยนแปลงหรือไม่?',
                showCancelButton: true,
                confirmButtonText: 'ใช่, ย้อนกลับ',
                cancelButtonText: 'ยกเลิก',
            }).then((result) => {
                if (result.isConfirmed) {
                    ReactSession.set("username", username);
                    navigate("/bank");
                }
            });
        } else {
            ReactSession.set("username", username);
            navigate("/bank");
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleClick = () => {
        ReactSession.set('username', username)
        navigate("/profile")
    }
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleDataEdited = (field, value) => {
        setDataEdited(true); // เมื่อมีการแก้ไขข้อมูลให้เซ็ตสถานะเป็น true
        setEditedData({ ...editedData, [field]: value });
    };
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
                            <TextField id="outlined-disabled" 
                            label={filteredProducts.product_name} 
                            variant="outlined" 
                            sx={{ width: '50ch' }} 
                            onChange={(e) => handleDataEdited('product_name', e.target.value)} 
                            inputProps={{ maxLength: 20 }}
                            />
                            
                        </div>
                        <FormControl sx={{ marginTop: 5, width: '50ch' }} component="fieldset" variant="standard">
                            <FormLabel component="legend" style={{ color: "black" }}>
                                ประเภทบริการ :
                            </FormLabel>
                            <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={editedData.product_type} onChange={(e) => handleDataEdited('product_type', e.target.checked)} />}
                                        label="ทรัพยากรเพื่อเช่าหรือยืม"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={editedData.product_type2} onChange={(e) => handleDataEdited('product_type2', e.target.checked)} />}
                                        label="ทรัพยากรเพื่อการซื้อขาย"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={editedData.product_type3} onChange={(e) => handleDataEdited('product_type3', e.target.checked)} />}
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
                            <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากร (ถ้าใส่จำนวนต่ำกว่า 0 จะให้เป็นอัตโนมัติ): </FormLabel>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                startAdornment={<InputAdornment position="start">{`${filteredProducts.product_quantity} `}</InputAdornment>}
                                endAdornment={<InputAdornment position="end">{`${filteredProducts.product_unit}`}</InputAdornment>}
                                label="จำนวนทรัพยากร"
                                variant="outlined"
                                sx={{ width: '48ch' }}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (!isNaN(Number(inputValue)) && inputValue >= 0) {
                                        handleDataEdited('product_quantity', inputValue);
                                    } else {
                                        handleDataEdited('product_quantity', 0);
                                    }
                                }}
                                inputProps={{ type: 'number' }} 
                            />

                        </div>

                        <div style={{ marginTop: 30 }}>
                            <FormControl sx={{ display: editedData.product_type2 ? 'block' : 'none' }}>
                                <FormLabel component="legend" style={{ color: "black" }}>
                                    ราคาของทรัพยากร (ถ้าใส่จำนวนต่ำกว่า 0 จะให้เป็นอัตโนมัติ) :
                                </FormLabel>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    startAdornment={<InputAdornment position="start">{`${filteredProducts.product_price} `}</InputAdornment>}
                                    endAdornment={<InputAdornment position="end">บาท</InputAdornment>}
                                    label={filteredProducts.product_price}
                                    sx={{ width: '48ch' }}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        if (!isNaN(Number(inputValue)) && inputValue >= 0) {
                                            handleDataEdited('product_price', inputValue)
                                        } else {
                                            handleDataEdited('product_price', 0 )
                                        }
                                    }}
                                    inputProps={{ type: 'number' }}
                                />
                            </FormControl>
                        </div>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-around', margin: 30 }}>
                        <Button variant="contained" color="error" onClick={handleBackbank}>ย้อนกลับ</Button>
                        <Button variant="contained" color='primary' onClick={handleUpdate}>บันทึกข้อมูล</Button>
                    </div>
                </>
            ) : (
                <p>Details not found.</p>
            )}
        </div>
    );
}
export default OpenBank;