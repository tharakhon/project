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
import HomeIcon from '@mui/icons-material/Home';
import { ReactSession } from 'react-client-session';
import { background } from "@chakra-ui/react";
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
  const [displayBookmarks, setDisplayBookmarks] = useState(false);
  const [codename,setCodeName] = useState([]);
  console.log(username)
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
    filterProducts(query);
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
    Axios.get(`http://localhost:5000/showbank`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:showbank", response.data);
        const fetchedProducts = response.data.map((item) => ({
          title: item.bank_name,
          rating: item.bank_rating,
          image: item.bank_image, // Update with the correct property name
          rank: item.bank_rank,   // Update with the correct property name
          lat: item.bank_latitude, // Update with the correct property name
          lon: item.bank_longitude,
          codename: item.bank_codename // Update with the correct property name
        }));
        console.log('fetchedProducts', fetchedProducts)
        setFilteredProducts(fetchedProducts);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [username]);
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
  const handleToBank = () => {
    ReactSession.set("username", username)
    ReactSession.set("codename", codename.bank_codename);
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
            >
              <NotificationsIcon />
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
      <Grid container spacing={2}>
        {(displayBookmarks ? bookmarks : filteredProducts).map((tab, index) => (
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
                image={`image/${tab.image}`}
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
                  <Box sx={{ ml: 2 }} onClick={handleClickReviw}>{tab.rating}</Box>
                </Box>
                {currentPosition && (
                  <Typography>
                    Distance: {tab.distance ? tab.distance.toFixed(2) : 'N/A'} km
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="medium" onClick={() => handleOpenbankuser(tab.title)}>เปิดดูทรัพยากรในธนาคาร</Button>
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