import React from 'react';
import logo from "../src/image/Logo.png";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
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
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from "react";
import Axios from "axios";
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from "@mui/material/FormGroup";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { ReactSession } from 'react-client-session';
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
function Notifications() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const username = ReactSession.get("username");
    const bank_name = ReactSession.get("bank_name");
    const theme = useTheme();
    const [openOrder, setOpenOrder] = React.useState(false);
    const [openOrder1, setOpenOrder1] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [borrowDate, setBorrowDate] = useState(dayjs());
    const [returnDate, setReturnDate] = useState(dayjs());
    const [orderExchange_borrowDate, setOrderExchange_borrowDate] = useState(dayjs());
    const [openNextDialog, setOpenNextDialog] = React.useState(false);


    console.log(filteredProducts)
    console.log(selectedProduct)
    console.log(bank_name)
    const handleClickOpen = (product) => () => {
        setSelectedProduct(product);
        setBorrowDate(dayjs(product.order_borrowDate));
        setReturnDate(dayjs(product.order_returnDate));
        setOpenOrder(true);
        setScroll('body');
    };
    const handleClickOpen1 = (product) => () => {
        setSelectedProducts(product);
        setOrderExchange_borrowDate(dayjs(product.orderExchange_borrowDate));
        setOpenOrder1(true);
        setScroll('body');
    };

    const handleClose = () => {
        setOpenOrder(false);

    };
    const handleClose1 = () => {
        setOpenOrder1(false);
        setOpenNextDialog(false);
    };

    useEffect(() => {
        Axios.get(`http://localhost:5000/showProductUser2/${bank_name}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ:", response.data);
                const fetchedProducts = response.data.map((item) => ({
                    order_id: item.order_id,
                    bank_name: item.bank_name,
                    fullname: item.fullname,
                    image: item.image,
                    order_borrowDate: dayjs(item.order_borrowDate),
                    order_returnDate: dayjs(item.order_returnDate),
                    order_quantity: item.order_quantity,
                    order_status: item.order_status,
                    product_image: item.product_image,
                    product_name: item.product_name,
                    product_quantity: item.product_quantity,
                    product_type: item.product_type,
                    product_type2: item.product_type2,
                    product_type3: item.product_type3,
                    product_type4: item.product_type4,
                    product_unit: item.product_unit,
                    order_rental: item.order_rental,
                    order_date: dayjs(item.order_date)
                }));

                setFilteredProducts(fetchedProducts);

            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
            })

    }, [bank_name]);
    useEffect(() => {
        Axios.get(`http://localhost:5000/showProductUser3/${bank_name}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ:", response.data);
                const fetchedProduct = response.data.map((item) => ({
                    orderExchange_id: item.orderExchange_id,
                    bank_name: item.bank_name,
                    fullname: item.fullname,
                    image: item.image,
                    product_name: item.product_name,
                    product_image: item.product_image,
                    product_type: item.product_type,
                    product_type2: item.product_type2,
                    product_type3: item.product_type3,
                    product_type4: item.product_type4,
                    product_unit: item.product_unit,
                    product_details: item.product_details,
                    orderExchange_borrowDate: dayjs(item.orderExchange_borrowDate),
                    orderExchange_quantity: item.orderExchange_quantity,
                    userbank_status: item.userbank_status,
                    userbank_productname: item.userbank_productname,
                    userbank_productimage: item.userbank_productimage,
                    userbank_producttype1: item.userbank_producttype1,
                    userbank_productquantity: item.userbank_productquantity,
                    userbank_unit: item.userbank_unit,
                    userbank_productdetails: item.userbank_productdetails,
                    order_exchange: item.order_exchange,
                    exchange_date: dayjs(item.exchange_date)
                }));

                setFilteredProduct(fetchedProduct);

            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
            })

    }, [bank_name]);
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (openOrder) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openOrder]);
    const descriptionElementRefs = React.useRef(null);
    React.useEffect(() => {
        if (openOrder1) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openOrder1]);

    const handleUpdate = (status) => {
        if (!selectedProduct) {
            console.error("Selected product not found");
            return;
        }
        Axios.put(`http://localhost:5000/updateStatus/${selectedProduct.order_id}`, {
            order_status: status,
        })
            .then((response) => {
                console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
                setFilteredProducts((prevProducts) => {
                    return prevProducts.map((item) =>
                        item.order_id === selectedProduct.order_id ? response.data : item
                    );
                });
                handleClose();
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
            });
    };
    const handleUpdate1 = (status) => {
        if (!selectedProducts) {
            console.error("Selected product not found");
            return;
        }
        Axios.put(`http://localhost:5000/updateStatus1/${selectedProducts.orderExchange_id}`, {
            userbank_status: status,
        })
            .then((response) => {
                console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
                setFilteredProduct((prevProducts) => {
                    return prevProducts.map((item) =>
                        item.product_id === selectedProducts.product_id ? response.data : item
                    );
                });
                handleClose1();
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
            });
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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
                    <Typography variant="h3" component="div" sx={{ paddingLeft: 45 }}> Notifications</Typography>
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
            <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
                {filteredProducts.length > 0 ? (
                    <>
                        {filteredProducts.map((item) => (
                            item.order_status === 'รอการตรวจสอบ' && (
                                <Grid item key={item.order_id} xs={12}>
                                    <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 151 }}
                                            image={item.image}
                                            alt="รูป user"
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {item.fullname}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    ได้ทำรายการของ ธนาคาร : {item.bank_name}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    สถานะปัจจุบัน : {item.order_status}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    สถานะการทำรายการ : {item.order_rental}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    เวลาที่ทำรายการ : {dayjs(item.order_date).format("DD-MM-YYYY HH:mm:ss")}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={handleClickOpen(item)} size="medium">เปิดอ่าน</Button>
                                            </CardActions>
                                        </Box>
                                    </Card>
                                </Grid>
                            )
                        ))}
                    </>
                ) : (
                    <p>filteredProducts is not an array.</p>
                )}
            </Grid>


            <Dialog
                open={openOrder}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>รายการที่ {selectedProduct ? selectedProduct.fullname : 'N/A'} ได้ทำรายการ</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {selectedProduct ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Card sx={{ maxWidth: 345, m: 1 }} >
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={`http://localhost:5000/image/${selectedProduct.product_image}`}
                                            title="รูปภาพทรัพยากร"
                                        />
                                    </Card>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                                    <div style={{ marginTop: 50 }}>
                                        <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                                        <TextField disabled id="outlined-disabled" label={selectedProduct.product_name} variant="outlined" sx={{ width: '50ch' }} />
                                    </div>
                                    <div style={{ marginTop: 30 }}>
                                        <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                                        <TextField disabled id="outlined-disabled" label={`${selectedProduct.order_rental}`} variant="outlined" sx={{ width: '50ch' }} />
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
                                        <FormLabel component="legend" style={{ color: 'black' }}>ประเภททรัพยากรทางการเกษตร:</FormLabel>
                                        <TextField disabled id="outlined-disabled" label={selectedProduct.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                                    </div>

                                    <div style={{ marginTop: 30 }}>
                                        <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                                        <TextField disabled id="outlined-disabled" label={`${selectedProduct.order_quantity} ${selectedProduct.product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
                                    </div>
                                    <div >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={[
                                                    'DatePicker',
                                                ]}
                                                sx={{ width: '50ch', marginTop: 3 }}
                                            >
                                                <DemoItem label={<Label componentName="วันที่จะมารับทรัพยากร :" valueType="date" />} >
                                                    <DatePicker
                                                        disabled
                                                        value={borrowDate}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" value={borrowDate.format("DD-MM-YYYY")} />}
                                                    />
                                                </DemoItem>
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={[
                                                    'DatePicker',
                                                ]}
                                                sx={{ width: '50ch', marginTop: 3 }}
                                            >
                                                <DemoItem label={<Label componentName="วันที่จะนำทรัพยากรมาคืน :" valueType="date" />} >
                                                    <DatePicker
                                                        disabled
                                                        value={returnDate}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" value={returnDate.format("DD-MM-YYYY")} />}
                                                    />
                                                </DemoItem>
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Details not found.</p>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-around' }}>
                    <Button onClick={() => handleUpdate('ไม่อนุมัติให้ทำรายการ')} color='error'>ไม่อนุมัติให้ทำรายการ</Button>
                    <Button onClick={() => handleUpdate('อนุมัติให้ทำรายการ')} >อนุมัติให้ทำรายการ</Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
                {filteredProduct.length > 0 ? (
                    <>
                        {filteredProduct.map((item) => (
                            item.userbank_status === 'รอการตรวจสอบ' && (
                                <Grid item key={item.orderExchange_id} xs={12}>
                                    <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 151 }}
                                            image={item.image}
                                            alt="รูป user"
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {item.fullname}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    ได้ทำรายการของ ธนาคาร : {item.bank_name}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    สถานะปัจจุบัน : {item.userbank_status}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    สถานะการทำรายการ : {item.order_exchange}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    เวลาที่ทำรายการ : {dayjs(item.exchange_date).format("DD-MM-YYYY HH:mm:ss")}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={handleClickOpen1(item)} size="medium">เปิดอ่าน</Button>
                                            </CardActions>
                                        </Box>
                                    </Card>
                                </Grid>
                            )
                        ))}
                    </>
                ) : (
                    <p>filteredProduct is not an array.</p>
                )}
            </Grid>

            <Dialog
                open={openOrder1}
                onClose={() => setOpenNextDialog(false)}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>รายการที่ {selectedProducts ? selectedProducts.fullname : 'N/A'} ได้ทำรายการ</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRefs}
                        tabIndex={-1}
                    >
                        {selectedProducts ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Card sx={{ maxWidth: 345, m: 1 }} >
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={`http://localhost:5000/image/${selectedProducts.product_image}`}
                                            title="รูปภาพทรัพยากร"
                                        />
                                    </Card>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                                    <div style={{ marginTop: 50 }}>
                                        <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                                        <TextField disabled id="outlined-disabled" label={selectedProducts.product_name} variant="outlined" sx={{ width: '50ch' }} />
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
                                        <FormLabel component="legend" style={{ color: 'black' }}>ประเภททรัพยากรทางการเกษตร:</FormLabel>
                                        <TextField disabled id="outlined-disabled" label={selectedProducts.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                                    </div>
                                    <div style={{ marginTop: 30 }}>
                                        <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                                        <TextField disabled id="outlined-disabled" label={`${selectedProducts.order_exchange}`} variant="outlined" sx={{ width: '50ch' }} />
                                    </div>
                                    <div style={{ marginTop: 30 }}>
                                        <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                                        <TextField disabled id="outlined-disabled" label={`${selectedProducts.orderExchange_quantity} ${selectedProducts.product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
                                    </div>
                                    <div >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={[
                                                    'DatePicker',
                                                ]}
                                                sx={{ width: '50ch', marginTop: 3 }}
                                            >
                                                <DemoItem label={<Label componentName="วันที่จะมารับทรัพยากร :" valueType="date" />} >
                                                    <DatePicker
                                                        disabled
                                                        value={orderExchange_borrowDate}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                    />
                                                </DemoItem>
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Details not found.</p>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-around' }}>
                    <Button onClick={() => handleClose1()}>ปิด</Button>
                    <Button onClick={() => setOpenNextDialog(true)} >ถัดไป</Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openNextDialog}
                onClose={handleClose1}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>รายการที่ {selectedProducts ? selectedProducts.fullname : 'N/A'} จะนำมาแลกเปลี่ยน</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRefs}
                        tabIndex={-1}
                    >
                        {selectedProducts ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Card sx={{ maxWidth: 345, m: 1 }} >
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={`http://localhost:5000/image/${selectedProducts.userbank_productimage}`}
                                            title="รูปภาพทรัพยากร"
                                        />
                                    </Card>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                                    <div style={{ marginTop: 50 }}>
                                        <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                                        <TextField disabled id="outlined-disabled" label={selectedProducts.userbank_productname} variant="outlined" sx={{ width: '50ch' }} />
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
                                        <FormLabel component="legend" style={{ color: 'black' }}>ประเภททรัพยากรทางการเกษตร:</FormLabel>
                                        <TextField disabled id="outlined-disabled" label={selectedProducts.userbank_producttype1} variant="outlined" sx={{ width: '50ch' }} />

                                    </div>

                                    <div style={{ marginTop: 30 }}>
                                        <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                                        <TextField disabled id="outlined-disabled" label={`${selectedProducts.userbank_productquantity} ${selectedProducts.userbank_unit}`} variant="outlined" sx={{ width: '50ch' }} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Details not found.</p>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-around' }}>
                    <Button onClick={() => handleUpdate1('ไม่อนุมัติให้ทำรายการ')} color='error'>ไม่อนุมัติให้ทำรายการ</Button>
                    <Button onClick={() => handleUpdate1('อนุมัติให้ทำรายการ')} >อนุมัติให้ทำรายการ</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
export default Notifications;