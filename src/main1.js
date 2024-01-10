import React from "react";
import Navbar1 from "./NavBar1";
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
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
import bk from "../src/image/กรุงเทพ.jpg";
import ktb from "../src/image/กรุงไทย.jpg";
import k from "../src/image/กสิกร.jpg";
import scb from "../src/image/ไทยพานิช.png";
import logo from "../src/image/Logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
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
import LogoutIcon from '@mui/icons-material/Logout';
import TTB from '../src/image/TTB.jpg';
import BAY from '../src/image/กรุงศรีอยุธยา.png';
import Ribbon1 from '../src/image/ribbon1.png';
import Ribbon2 from '../src/image/ribbon2.png';
import Ribbon3 from '../src/image/ribbon3.png';
import Ribbon4 from '../src/image/ribbon4.png';
import CardHeader from '@mui/material/CardHeader';
import LongdoMap, { map as longdoMap } from './LongdoMap';
import Bookmark from "./Bookmark";
const products = [
  {
    title: 'กรุงเทพ', rating: 2.5, image: bk, rank: Ribbon2, lat:
      13.111478, lon: 100.930375
  },
  { title: 'กรุงไทย', rating: 3.5, image: ktb, rank: Ribbon3, lat: 13.2, lon: 100.1 },
  { title: 'กสิกร', rating: 4.5, image: k, rank: Ribbon3, lat: 13.3, lon: 100.2 },
  { title: 'ไทยพานิช', rating: 1.5, image: scb, rank: Ribbon1, lat: 13.4, lon: 100.3 },
  { title: 'กรุงศรีอยุธยา', rating: 4.5, image: BAY, rank: Ribbon4, lat: 13.5, lon: 100.4 },
  { title: 'TTB', rating: 3.5, image: TTB, rank: Ribbon3, lat: 13.6, lon: 100.5 },
  { title: 'thailand', rating: 2.5, image: ktb, rank: Ribbon2, lat: 13.7, lon: 100.6 },
  { title: 'island', rating: 1.5, image: ktb, rank: Ribbon2, lat: 13.8, lon: 100.7 },
  { title: 'ลาว', rating: 4.5, image: ktb, rank: Ribbon4, lat: 13.9, lon: 100.8 },
  { title: 'พม่า', rating: 0.5, image: ktb, rank: Ribbon1, lat: 14, lon: 100.9 },
];

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
function Main12() {
  const [profile, setProfile] = useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [flag, setflag] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  

  const handleBookmarkClick = (title) => {
    // Check if the item is already bookmarked
    const isBookmarked = bookmarks.some((item) => item.title === title);

    if (isBookmarked) {
      // Remove from bookmarks if already bookmarked
      const updatedBookmarks = bookmarks.filter((item) => item.title !== title);
      setBookmarks(updatedBookmarks);
    } else {
      // Add to bookmarks if not bookmarked
      const bookmarkedItem = filteredProducts.find((item) => item.title === title);
      setBookmarks([...bookmarks, bookmarkedItem]);
    }
  };
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterProducts(query);
  };

  const filterProducts = (query) => {
    const filtered = products.filter((product) =>
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
  const handleClick = () => {
    navigate("/profile")
  }
  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูลใน /user หรือไม่
    Axios.get("http://localhost:5000/user/:email")
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data);
        const userEmails = response.data.map((user) => user.email);
        if (userEmails.includes(profile.email)) {
          setflag(true);
        } else {
          alert("ไม่พบข้อมูลผู้ใช้");
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      });
  }, []);
  const handleSubmit = () => {
    navigate('/registerbank')
  }
  const handleOpenbankuser = () => {
    navigate('/bankuser')
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
    const updatedProducts = products.map((product) => {
      const distance =
        currentPosition && calculateDistance(currentPosition.lat, currentPosition.lon, product.lat, product.lon);
      return { ...product, distance };
    });
    setFilteredProducts(updatedProducts);
  }, [currentPosition]);
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
          {['บุ๊คมาร์ค'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setBookmarks([...bookmarks])}>
                <ListItemIcon>
                  <BookmarkIcon />
                  
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['ตั้งค่า'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
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
          {['ออกจากระบบ'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Bookmark bookmarks={bookmarks} />
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
      <Grid container spacing={2}>
        {filteredProducts.map((tab, index) => (
          <Grid key={index} xs={3}>
            <Card sx={{ maxWidth: 345, m: 1 }} >
              <CardHeader
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse', // Move Avatar to the right
                  justifyContent: 'space-between', // Add space between Avatar and content
                  alignItems: 'center',
                  background: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)', // Customize background
                  color: 'white', // Customize text color
                }}
                avatar={
                  <Avatar
                    alt={`Rank ${tab.title}`}
                    src={tab.rank}
                    sx={{
                      backgroundColor: 'transparent', // Set a transparent background
                    }}
                  />
                }
              />

              <CardMedia
                component="img"
                height="300"
                image={tab.image}
                title="รูปภาพธนาคาร"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {tab.title}

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
                    value={tab.rating}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  <Box sx={{ ml: 2 }}>{tab.rating}</Box>
                </Box>
                {currentPosition && (
                  <Typography>
                    Distance: {tab.distance ? tab.distance.toFixed(2) : 'N/A'} km
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="medium" onClick={handleOpenbankuser}>เปิดดูทรัพยากรในธนาคาร</Button>
                <Button size="medium" onClick={() => handleBookmarkClick(tab.title)}>
                  {bookmarks.some((item) => item.title === tab.title) ? 'ยกเลิกบุ๊คมาร์ค' : 'บุ๊คมาร์ค'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

      </Grid>

    </div>

  );
}
export default Main12;