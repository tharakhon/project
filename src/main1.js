import React from "react";
import Navbar1 from "./NavBar1";
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import logo from "../src/image/Logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled, useTheme, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Badge from '@mui/material/Badge';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import ReviewsIcon from '@mui/icons-material/Reviews';
import CardHeader from '@mui/material/CardHeader';
import HomeIcon from '@mui/icons-material/Home';
import { ReactSession } from 'react-client-session';
import Popover from '@mui/material/Popover';
import InboxIcons from '@mui/icons-material/Inbox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from "@mui/material/FormGroup";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';

const setting2 = ['Profile', 'Logout'];
const settings = ['เรียงด้วยแรงค์', 'เรียงด้วยระยะทาง', 'เรียงด้วยเรตติ้ง'];
const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  borderRadius: 20,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(30),
    width: 'auto',
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

function Main12() {
  const username = ReactSession.get("username");
  const [profile, setProfile] = useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElUser2, setAnchorElUser2] = React.useState(null);
  const [flag, setflag] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPosition, setCurrentPosition] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [userImage, setUserImage] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [displayBookmarks, setDisplayBookmarks] = useState(false);
  const [codename, setCodeName] = useState([]);
  const [anchorElPopover, setAnchorElPopover] = useState(null);
  const [bankMembers, setBankMembers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [currentView, setCurrentView] = useState('main');
  const [borrowDate, setBorrowDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const [openOrder, setOpenOrder] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openOrder) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrder]);

  const handleClickOpen = (product) => () => {
    setSelectedProduct(product);
    setBorrowDate(product.order_borrowDate instanceof dayjs ? product.order_borrowDate : dayjs());
    setReturnDate(product.order_returnDate instanceof dayjs ? product.order_returnDate : dayjs());
    setOpenOrder(true);
    setScroll('body');
  };


  const switchToInboxView = () => {
    setCurrentView('inbox');
  };


  const switchToMainView = () => {
    setCurrentView('main');
  };

  const switchToActiveView = () => {
    setCurrentView('active');
  };

  const handleClose = () => {
    setOpenOrder(false);
  };

  console.log('notifications:', notifications);

  const handleOpenPopover = () => {
    ReactSession.set('username', username)
    ReactSession.set('bank_name', codename.bank_name)
    navigate("/notifications");
  };
  const calculateTotalPendingNotifications = () => {
    if (!notifications || !Array.isArray(notifications)) {
      console.error('Invalid notifications data:', notifications);
      return 0;
    }
    const pendingNotifications = notifications.filter(notification => {
      return notification.order_status === 'รอการตรวจสอบ';
    });
    const totalPendingNotifications = pendingNotifications.reduce((sum, notification) => {
      return sum + notification.notification_count;
    }, 0);

    console.log('Total Pending Notifications:', totalPendingNotifications);

    return totalPendingNotifications;
  };

  const handleClosePopover = () => {
    setAnchorElPopover(null);
  };
  console.log(username)
  console.log("bankMembers", bankMembers)
  console.log('filteredProducts', filteredProducts)


  const handleBookmarkClick = (title) => {
    const isBookmarked = bookmarks.some((item) => item.title === title);

    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter((item) => item.title !== title);
      setBookmarks(updatedBookmarks);
    } else {
      const bookmarkedItem = filteredProducts.find((item) => item.title === title);
      setBookmarks([...bookmarks, bookmarkedItem]);
    }
  };
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Check if the query is empty
    if (query.trim() === "") {
      // If empty, reset filteredProducts to the original data
      setFilteredProducts(originalData);
    } else {
      // If not empty, filter the products based on the query
      filterProducts(query);
    }
  };


  const filterProducts = (query) => {
    const filtered = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseUserMenu1 = () => {
    setAnchorElUser2(null);
  };
  const handleOpenUserMenu1 = (event) => {
    setAnchorElUser2(event.currentTarget);
  };
  const [activeTab, setActiveTab] = useState('pending');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMenuOptionClick = (option) => {
    handleCloseUserMenu1();

    // Handle different menu options here
    switch (option) {
      case 'Profile':
        // Navigate to the profile page
        ReactSession.set('username', username)
        navigate(`/profile`);
        break;
      case 'Logout':
        // Handle 'Logout' option
        navigate(`/`)
        break;
      default:
        break;
    }
  };

  useEffect(() => {

    console.log(username);

    Axios.get(`http://localhost:5000/user/${username}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data[0].email);
        // const userEmails = response.data.map((user) => user.email);
        // if (userEmails==email) {
        //   console.log("ข้อมูลที่ได้รับ: profile.email", profile);
        //   setflag(true);
        // } else {
        //   alert("ไม่พบข้อมูลผู้ใช้");
        // }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      });
  }, [username]);
  useEffect(() => {

    console.log(username);

    Axios.get(`http://localhost:5000/readimage/${username}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data[0].image);
        // Assuming the image data is present in the response data
        setUserImage(response.data[0].image);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [username]);
  useEffect(() => {
    if (!codename.bank_name) {
      console.warn('codename.bank_name is null or undefined.');
      return;
    }
    Axios.get(`http://localhost:5000/notifications/${codename.bank_name}`)
      .then((response) => {
        console.log("จำนวน notifications:", response.data);
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลจำนวนสมาชิก:", error);
      });
  }, [codename.bank_name]);

  useEffect(() => {
    Axios.get("http://localhost:5000/showcountuser")
      .then((response) => {
        console.log("จำนวนสมาชิกของแต่ละธนาคาร:", response.data);
        const fetchedProducts = response.data.map((item) => ({
          title: item.bank_name,
          rating: item.bank_rating,
          image: item.bank_image,
          rank: item.rank_image,
          lat: item.bank_latitude,
          lon: item.bank_longitude,
          codename: item.bank_codename,
          bankMembers: item.member_count, // Assuming the number of members is available here
        }));

        console.log('fetchedProducts', fetchedProducts)
        setFilteredProducts(fetchedProducts);
        setOriginalData(fetchedProducts);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลจำนวนสมาชิก:", error);
      });
  }, []);
  const handleSubmit = () => {
    navigate(`/registerbank`)
  }
  const handleOpenbankuser = (title) => {
    setDisplayBookmarks(false);
    ReactSession.set("bank_name", title);
    navigate('/bankuser')
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleDisplayBookmarks = () => {
    setDisplayBookmarks(!displayBookmarks);
  };
  const handleClickReviw = () => {
    navigate('/review')
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lon: longitude });

      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    const updatedProducts = filteredProducts.map((product) => {
      const distance =
        currentPosition && calculateDistance(currentPosition.lat, currentPosition.lon, product.lat, product.lon);
      return { ...product, distance };
    });
    console.log(updatedProducts)
    setFilteredProducts(updatedProducts);
  }, [currentPosition]);
  // useEffect(() => {
  //   const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  //   setBookmarks(storedBookmarks);
  // }, []);

  // // Save bookmarks to local storage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // }, [bookmarks]);
  useEffect(() => {
    Axios.get(`http://localhost:5000/showcodename/${username}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:showcodename", response.data[0]);
        setCodeName(response.data[0]);

      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [username]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/Inbox/${username}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ Inbox:", response.data);
        const fetchedProducts = response.data.map((item) => ({
          bank_name: item.bank_name,
          fullname: item.fullname,
          image: item.image,
          bank_image: item.bank_image,
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
        }));

        setFilteredProduct(fetchedProducts);

      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, []);

  const handleToBank = () => {
    ReactSession.set("username", username)
    ReactSession.set("codename", codename.bank_codename);
    ReactSession.set("bank_name", codename.bank_name);
    console.log(filteredProducts.title)
    navigate("/bank")
  }
  return (
    <div >
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <TextsmsOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenPopover}
            >
              <Badge color="secondary" badgeContent={calculateTotalPendingNotifications()}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu1} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userImage} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser2)}
                onClose={handleCloseUserMenu1}
              >
                {setting2.map((setting1) => (
                  <MenuItem key={setting1} onClick={() => handleMenuOptionClick(setting1)}>
                    <Typography textAlign="center">{setting1}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
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
      </AppBar >
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
              <ListItemButton onClick={switchToMainView}>
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
              <ListItemButton onClick={() => handleToBank()}>
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
              <ListItemButton onClick={switchToActiveView}>
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
        <List>
          {['กล่องข้อความ'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={switchToInboxView}>
                <ListItemIcon>
                  <InboxIcons />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {currentView === 'main' && (
        <>
          <div style={{ display: 'flex', margin: 10, justifyContent: 'space-between', flexWrap: 'nowrap' }}>
            <Box>
              <Tooltip title="Open fillter">
                <IconButton onClick={handleOpenUserMenu} >
                  <FilterAltSharpIcon fontSize='large' color='info' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Button variant='contained' sx={{ borderRadius: 20, backgroundColor: '#D62828', color: 'white' }} onClick={handleSubmit}>สร้างธนาคาร</Button></div>
          <Button variant='contained' sx={{ borderRadius: 20, backgroundColor: '#2196F3', color: 'white' }} onClick={handleDisplayBookmarks}>
            {displayBookmarks ? 'แสดงทั้งหมด' : 'แสดงบุ๊คมาร์ค'}
          </Button>
        </>
      )}
      {currentView === 'main' && (
         <Grid container spacing={2}>
         {filteredProducts.map((bank) => (
           <Grid item key={bank.title} xs={12} sm={6} md={4} lg={3}>
             <Card sx={{ maxWidth: 345, m: 1 }}>
               {/* Card content here */}
               <CardHeader
                 sx={{
                   display: 'flex',
                   flexDirection: 'row-reverse',
                   justifyContent: 'space-between',
                   alignItems: 'center',
                   background: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
                   color: 'white',
                 }}
                 avatar={
                   <Avatar
                     src={`http://localhost:5000/image/${bank.rank}`}
                     alt=''
                     sx={{
                       backgroundColor: 'transparent',
                     }}
                   />
                 }
               />
               <CardMedia
                 component="img"
                 height="300"
                 image={`http://localhost:5000/image/${bank.image}`}
                 title="รูปภาพธนาคาร"
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   {bank.title}
                 </Typography>
                 <Typography gutterBottom variant="body1" component="div">
                   จำนวนสมาชิกทั้งหมด {bank.bankMembers} คน
                 </Typography>
                 <Box
                    sx={{
                      width: 200,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Rating
                      name="text-feedback"
                      value={bank.rating}
                      readOnly
                      precision={0.5}

                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Box sx={{ ml: 2 }} onClick={handleClickReviw}>{bank.rating}</Box>
                  </Box>
                  {currentPosition && (
                    <Typography>
                      Distance: {bank.distance ? bank.distance.toFixed(2) : 'N/A'} km
                    </Typography>
                  )}
               </CardContent>
               <CardActions>
                 <Button size="medium" onClick={() => handleOpenbankuser(bank.title)}>
                   เปิดดูทรัพยากรในธนาคาร
                 </Button>
                 <Button size="medium" onClick={() => handleBookmarkClick(bank.title)}>
                   {bookmarks.some((item) => item.title === bank.title) ? 'ยกเลิกบุ๊คมาร์ค' : 'บุ๊คมาร์ค'}
                 </Button>
               </CardActions>
             </Card>
           </Grid>
         ))}
       </Grid>
      )}
      {currentView === 'active' && (
        <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
          {filteredProduct.length > 0 ? (
            <>
              {filteredProduct.map((item) => (
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
            <p>ไม่มีกิจกรรม</p>
          )}
        </Grid>
      )}
      {currentView === 'inbox' && (
        <div>

          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="รอการตรวจสอบ" value="pending" />
            <Tab label="อนุมัติแล้ว" value="approved" />
            <Tab label="ไม่อนุมัติ" value="rejected" />
          </Tabs>


          {activeTab === 'pending' && (
            <div>
              <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
                {filteredProduct.length > 0 ? (
                  <>
                    {filteredProduct.map((item) => (
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
                  <p>ไม่มีรายการที่รอการตรวจสอบ</p>
                )}
              </Grid>
            </div>
          )}

          {activeTab === 'approved' && (
            <div>
              <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
                {filteredProduct.length > 0 ? (
                  <>
                    {filteredProduct.map((item) => (
                      item.order_status === 'อนุมัติให้ทำรายการ' && (
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
                  <p>ไม่มีรายการที่รอการตรวจสอบ</p>
                )}
              </Grid>
            </div>
          )}

          {activeTab === 'rejected' && (
            <div>
              <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
                {filteredProduct.length > 0 ? (
                  <>
                    {filteredProduct.map((item) => (
                      item.order_status === 'ไม่อนุมัติให้ทำรายการ' && (
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
                  <p>ไม่มีรายการที่รอการตรวจสอบ</p>
                )}
              </Grid>
            </div>
          )}
        </div>
      )}
      <Dialog
        open={openOrder}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>คุณได้ทำรายการของธนาคาร {selectedProduct ? selectedProduct.bank_name : 'N/A'} </DialogTitle>
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
                  <FormControl sx={{ marginTop: 5, width: '50ch' }} component="fieldset" variant="standard">
                    <FormLabel component="legend" style={{ color: "black" }}>
                      ประเภทบริการ :
                    </FormLabel>
                    <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginTop: 20 }}>
                        <FormControlLabel
                          control={<Checkbox disabled checked={Boolean(selectedProduct.product_type)} />}
                          label="ทรัพยากรเพื่อเช่าหรือยืม"
                        />
                      </div>
                      <div style={{ marginTop: 20 }}>
                        <FormControlLabel
                          control={<Checkbox disabled checked={Boolean(selectedProduct.product_type2)} />}
                          label="ทรัพยากรเพื่อการซื้อขาย"
                        />
                      </div>
                      <div style={{ marginTop: 20 }}>
                        <FormControlLabel
                          control={<Checkbox disabled checked={Boolean(selectedProduct.product_type3)} />}
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
                        <DemoItem label={<Label componentName="วันที่จะมารับทรัพยากร" valueType="date" />} >
                          <DatePicker
                            disabled
                            value={borrowDate}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
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
                        <DemoItem label={<Label componentName="วันที่จะนำทรัพยากรมาคืน" valueType="date" />} >
                          <DatePicker
                            disabled
                            value={returnDate}
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
      </Dialog>
    </div >

  );
}
export default Main12;