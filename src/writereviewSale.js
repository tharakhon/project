import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, FormLabel, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ReactSession } from 'react-client-session';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import AllReview from "./review";
import logo from "../src/image/Logo.png";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Badge from '@mui/material/Badge';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReviewsIcon from '@mui/icons-material/Reviews';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const labels = {
    0.5: '0.5',
    1: '1.0',
    1.5: '1.5',
    2: '2.0',
    2.5: '2.5',
    3: '3.0',
    3.5: '3.5',
    4: '4.0',
    4.5: '4.5',
    5: '5.0',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function ReviewbankSale() {
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const username = ReactSession.get("username");
    const product_id = ReactSession.get("product_id");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [comment, setComment] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isDataSaved, setIsDataSaved] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClick = () => {
        navigate("/profile")
    }
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
            setImage(selectedImage);
            const imageUrl = URL.createObjectURL(selectedImage);
            setImagePreview(imageUrl);
        }
    };

    /*const MyComponent = () => {
   const [response, setResponse] = useState('');
   
     const postMessage = async () => {
       const response = await fetch('/api/data', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ key: 'value' })
       });
       const data = await response.text();
       setResponse(data);
     };
    };*/
    const handleSubmit = (status) => {

        if (!value || !comment || !image) {
            Swal.fire({
              icon: 'error',
              title: 'โปรดกรอกข้อมูลให้ครบถ้วน',
              text: 'กรุณาตรวจสอบและกรอกข้อมูลให้ครบทุกช่อง',
            });
            return;
          }

        const formData = new FormData()
        formData.append("user_email", username);
        formData.append("bank_codename", filteredProducts.bank_codename);
        formData.append("rating", value);
        formData.append('detail', comment);
        formData.append("product_id", filteredProducts.order_product_id);
        formData.append("bank_review_image", image);

        Swal.fire({
            icon: 'warning',
            title: 'คุณแน่ใจหรือไม่ว่าต้องการบันทึกข้อมูล?',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'บันทึก',
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.post('http://localhost:5000/Review', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                    .then((response) => {
                        console.log(response.data);
                        setIsDataSaved(true);
                        if (response.data.Status === 'Success') {
                            Swal.fire({
                                icon: 'success',
                                title: 'บันทึกข้อมูลสำเร็จ',
                                text: 'File Successfully Uploaded',
                            }).then(() => {
                                Axios.put(`http://localhost:5000/updateStatusSalePickup/${filteredProducts.order_sale_id}`, {
                                    order_sale_pickup: status,
                                })
                                    .then((response) => {
                                        console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
                                        setFilteredProducts((prevProducts) => {
                                            return prevProducts.map((item) =>
                                                item.order_sale_id === filteredProducts.order_sale_id ? response.data : item
                                            );
                                        });
                                        navigate("/main")
                                    })
                                    .catch((error) => {
                                        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
                                    });
                            });
                        } else {
                            console.error("Error");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: 'มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง',
                        });
                    });
            }
        });
    }

    useEffect(() => {
        Axios.get(`http://localhost:5000/showProductUser7/${product_id}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ:", response.data);
                if (response.data.length > 0) {
                    setFilteredProducts(response.data[0]);
                }
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
            })

    }, []);
    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
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
                    <Typography><p style={{ color: 'white', padding: 20, fontSize: 24, marginLeft: 250 }}>แสดงความคิดเห็นให้กับทรัพยากรของธนาคารนั้น</p></Typography>
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
                    {['หน้ากลัก'].map((text, index) => (
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
                <List>
                    {['กิจกรรมของคุณ'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => navigate('/registerbank')}>
                                <ListItemIcon>
                                    <AccessTimeIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <List>
                    {['รีวีว'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ReviewsIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Grid2 container spacing={0} columns={16} marginTop={8}>
                <Grid xs={6} container spacing={0}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography sx={{ fontSize: "30px" }}>ทรัพยากรที่ทำรายการ</Typography>
                    <Card sx={{ maxWidth: 345, m: 1, }} >
                        <CardMedia
                            component="img"
                            height="300"
                            image={`http://localhost:5000/image/${filteredProducts.product_image}`}
                            title="รูปภาพทรัพยากร"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {filteredProducts.product_name}
                            </Typography>
                            <Typography gutterBottom variant="p" component="div">
                                สถานะการทำรายการ : {filteredProducts.order_sale}
                            </Typography>
                        </CardContent>

                    </Card>
                </Grid>
                <Grid xs={6}>
                    <Stack direction="row" justifyContent="center" spacing={3} marginTop={5}>
                        <Typography sx={{ fontSize: "30px" }}>ให้คะแนนบริการ</Typography>
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => { setValue(newValue); }}
                            onChangeActive={(event, newHover) => { setHover(newHover); }}
                            size="large"
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>)}
                    </Stack>

                    <Grid xs={6}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                            marginTop={5}
                        >
                            <FormLabel component="legend" style={{ color: "black", fontSize: '20px' }}>เขียนรีวิวของคุณ</FormLabel>
                            <TextField

                                id="outlined-multiline-static"
                                multiline
                                rows={7}
                                sx={{ width: 600, marginTop: 3 }}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />

                        </Stack>
                    </Grid>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                        marginTop={10}
                    >
                        <FormLabel component="legend" style={{ color: "black", fontSize: '20px' }}>เพิ่มรูปภาพของคุณ</FormLabel>
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
                                        startIcon={<AddAPhotoIcon />}
                                        style={{ width: '120px', height: '120px' }}
                                    >
                                        Upload Image
                                    </Button>
                                </label>
                            </div>
                        )}
                    </Stack>
                </Grid>
            </Grid2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="success" sx={{ marginTop: 5 }} onClick={() => handleSubmit("รีวิวทรัพยากรเรียบร้อย")}>ยืนยันความคิดเห็น</Button>
            </div>
        </div>


    );

}
