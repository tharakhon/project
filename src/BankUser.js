import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import logo from "../src/image/Logo.png";
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReviewsIcon from '@mui/icons-material/Reviews';
import HomeIcon from '@mui/icons-material/Home';
import NavBarBank from './navBarBank';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useState, useEffect } from 'react';
import Axios from "axios";
import { ReactSession } from 'react-client-session';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating'
import StarRateSharpIcon from '@mui/icons-material/StarRateSharp';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const drawerWidth = 240;
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    borderRadius: 20,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(30),
        width: '35%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
    },
}));


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
export default function BankUser() {
    const bank_name = ReactSession.get("bank_name");
    const username = ReactSession.get("username");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const [showUserInBank, setShowUserInBank] = useState([]);
    const [value, setValue] = React.useState(0);
    const [reviews, setReviews] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const productTypes = [
        'ทรัพยากรทั้งหมด',
        'ทรัพยากรเพื่อเช่าหรือยืม',
        'ทรัพยากรเพื่อการซื้อขาย',
        'ทรัพยากรเพื่อแลกเปลี่ยน',

    ];

    const handleOpenReviewsDialog = (product) => {
        if (product) {
            Axios.get(`http://localhost:5000/showReview/${product.id}`)
                .then((response) => {
                    console.log("ข้อมูลรีวิวที่ได้รับ:", response.data);

                    if (Array.isArray(response.data)) {
                        setReviews(response.data); // เซ็ตข้อมูลรีวิวที่ได้รับเข้าสู่ state reviews
                    }  else {
                        Swal.fire({
                            icon: 'info',
                            title: 'ไม่พบรีวิว',
                            text: 'ยังไม่มีรีวิวสำหรับทรัพยากรนี้',
                          });
                      }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: 'ไม่สามารถดึงข้อมูลรีวิวได้ในขณะนี้',
                      });
                  });
        }
    };
    const handleCloseReviewsDialog = () => {
        setReviews([]); // เคลียร์ข้อมูลรีวิวเมื่อปิด dialog
    };
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
    const handleNext = (id) => {
        ReactSession.set('bank_name', bank_name);
        ReactSession.set('username', username);
        ReactSession.set("id", id);
        navigate(`/openbankusers`);
    };
    const handleNextListbankuser = () => {
        navigate("/listbankuser");
    }
    // const filteredProducts = products.filter((product) =>
    //     product.title.toLowerCase().includes(searchInput.toLowerCase())
    // );
    useEffect(() => {
        Axios.get(`http://localhost:5000/showProductUser/${bank_name}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ:", response.data);
                const fetchedProducts = response.data.map((item) => ({
                    id: item.product_id,
                    title: item.product_name,
                    quantity: item.product_quantity,
                    image: item.product_image,
                    type: item.product_type,
                    type2: item.product_type2,
                    type3: item.product_type3,
                    unit: item.product_unit

                }));
                setFilteredProducts(fetchedProducts);
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
            })

    }, []);

    const filteredAndSearchedProducts = filteredProducts.filter((resource) =>
        (resource.title && resource.title.toLowerCase().includes(searchInput.toLowerCase())) &&
        (value === 0 || (value === 1 && resource.type === 'ทรัพยากรเพื่อเช่าหรือยืม') || (value === 2 && resource.type2 === 'ทรัพยากรเพื่อการซื้อขาย') || (value === 3 && resource.type3 === 'ทรัพยากรเพื่อแลกเปลี่ยน'))
    );

    function calculateAverageRating(reviews) {
        if (reviews.length === 0) {
          return 0; // ถ้าไม่มีรีวิว ให้คะแนนเฉลี่ยเป็น 0
        }
    
        // คำนวณผลรวมของคะแนนทั้งหมด
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    
        // หารด้วยจำนวนรีวิวเพื่อคำนวณคะแนนเฉลี่ย
        const averageRating = totalRating / reviews.length;
    
        return averageRating;
      }
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                        <Typography><p style={{ color: 'white', padding: 20, fontSize: 24, marginLeft: 350 }}>ธนาคาร : {bank_name}</p></Typography>
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
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', marginTop: 10 }}>
                    <List>
                        {['ข้อมูลของธนาคาร'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton sx={{ backgroundColor: '#a2d2ff' }} onClick={handleNextListbankuser}>
                                    <ListItemIcon>
                                        <AccountBalanceIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderColor: 'divider', width: 240 }}
                        >
                            {productTypes.map((productType, index) => (
                                <Tab label={productType} {...a11yProps(index)} key={index} />
                            ))}
                        </Tabs>
                    </Box>
                </Box>
            </Drawer >

            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
                <DrawerHeader />
                <Search sx={{ m: 2 }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="ค้นหาทรัพยากร"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </Search>

                <Dialog
                    open={calculateAverageRating(reviews) > 0} // เปิด dialog เมื่อมีรีวิว
                    onClose={handleCloseReviewsDialog}
                    scroll="paper"
                    aria-labelledby="reviews-dialog-title"
                    aria-describedby="reviews-dialog-description"
                    PaperProps={{ style: { maxWidth: '900px', margin: 'auto' } }}
                >
                    {reviews.length > 0 ? (
                        <>
                            <DialogTitle id="reviews-dialog-title" sx={{ textAlign: "center" }}>
                                รีวิวสินค้า
                                <Box sx={{ ml: 2, fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {`คะแนนเฉลี่ย : `}
                                    <Rating
                                        name="average-rating"
                                        value={calculateAverageRating(reviews)}
                                        precision={0.5}
                                        readOnly
                                        emptyIcon={<StarRateSharpIcon fontSize="inherit" />}
                                    />
                                    <Box sx={{ ml: 1 }}>
                                        {calculateAverageRating(reviews).toFixed(2)}
                                    </Box>
                                </Box>
                            </DialogTitle>
                            <DialogContent dividers>
                                {/* แสดงรีวิวของสินค้า */}
                                <Grid container spacing={2}>
                                    {reviews.map((review, index) => (
                                        <Grid item xs={12} key={index}>
                                            <Card style={{ width: '100%', display: 'flex', marginBottom: '10px' }}>
                                                <CardMedia
                                                    component="img"
                                                    height="280"
                                                    image={review.image}
                                                    title="รูปภาพคนรีวิว"
                                                    style={{ width: '300px' }}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {review.fullname}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Rating
                                                            name="text-feedback"
                                                            value={review.rating}
                                                            readOnly
                                                            precision={0.5}
                                                            emptyIcon={<StarRateSharpIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                        />
                                                        <Typography variant="body1" sx={{ ml: 1 }}>
                                                            {review.rating.toFixed(1)} ดาว
                                                        </Typography>
                                                    </Box>
                                                    <Typography gutterBottom variant="body1" component="div">
                                                        ความคิดเห็น : {review.detail}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body2" component="div">
                                                        วันเวลาที่ได้รีวิว : {dayjs(review.date).format('DD/MM/YYYY HH:mm:ss')}
                                                    </Typography>
                                                    <CardMedia
                                                        component="img"
                                                        height="280"
                                                        image={`http://localhost:5000/image/${review.bank_review_image}`}
                                                        title="รูปภาพทรัพยากรที่รีวิว"
                                                        style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </DialogContent>
                        </>
                    ) : (
                        <DialogContent>
                            <Typography variant="body1" component="div" align="center">
                                ยังไม่มีรีวิวสำหรับสินค้านี้
                            </Typography>
                        </DialogContent>
                    )}
                    <DialogActions>
                        <Button onClick={handleCloseReviewsDialog} color="primary">
                            ปิด
                        </Button>
                    </DialogActions>
                </Dialog>

                {productTypes.map((productType, index) => (
                    <TabPanel value={value} index={index} key={index}>
                        <Grid container spacing={2}>
                            {value === 0 ? (
                                // Display all resources
                                filteredAndSearchedProducts.map((resource) => (
                                    <Grid item xs={3.75} key={resource.title}>
                                        <Card sx={{ maxWidth: 345, m: 1 }} >
                                            <CardMedia
                                                component="img"
                                                height="300"
                                                image={`http://localhost:5000/image/${resource.image}`}
                                                title="รูปภาพทรัพยากร"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {resource.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {`จำนวนทรัพยากรที่เหลืออยู่ : ${resource.quantity} ${resource.unit}`}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'space-around' }}>
                                                <Button size="small" onClick={() => handleNext(resource.id)}>
                                                    ดูทรัพยากร
                                                </Button>
                                                <Button size="small" onClick={() => handleOpenReviewsDialog(resource)}>
                                                    ดูรีวิว
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                // Display resources based on tab selection
                                filteredAndSearchedProducts.
                                    filter((resource) => {
                                        if (value === 1) {
                                            return resource.type === 'ทรัพยากรเพื่อเช่าหรือยืม';
                                        } else if (value === 2) {
                                            return resource.type2 === 'ทรัพยากรเพื่อการซื้อขาย';
                                        } else if (value === 3) {
                                            return resource.type3 === 'ทรัพยากรเพื่อแลกเปลี่ยน';
                                        }
                                        return false;
                                    })
                                    .map((resource) => (
                                        <Grid item xs={3.75} key={resource.title}>
                                            <Card sx={{ maxWidth: 345, m: 1 }} >
                                                <CardMedia
                                                    component="img"
                                                    height="300"
                                                    image={`http://localhost:5000/image/${resource.image}`}
                                                    title="รูปภาพทรัพยากร"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {resource.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {`จำนวนทรัพยากรที่เหลืออยู่ : ${resource.quantity} ${resource.unit}`}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions sx={{ justifyContent: 'space-around' }}>
                                                    <Button size="small" onClick={() => handleNext(resource.id)}>
                                                        ดูทรัพยากร
                                                    </Button>
                                                    <Button size="small" onClick={() => handleOpenReviewsDialog(resource)}>
                                                        ดูรีวิว
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                            )}
                        </Grid>
                    </TabPanel>
                ))}
            </Box>
        </Box >
    );
}