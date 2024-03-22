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
import Swal from 'sweetalert2';
import swal from 'sweetalert'; 

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
  const username = localStorage.getItem('username');
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
  const [filteredProductInbox, setFilteredProductInbox] = useState([]);
  const [filteredProductInbox1, setFilteredProductInbox1] = useState([]);
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
  const [openOrder1, setOpenOrder1] = React.useState(false);
  const [openOrder2, setOpenOrder2] = React.useState(false);
  const [openOrderApproved, setOpenOrderApproved] = React.useState(false);
  const [openOrderApproved1, setOpenOrderApproved1] = React.useState(false);
  const [openOrderApproved2, setOpenOrderApproved2] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedProductss, setSelectedProductss] = useState(null);
  const [selectedProductApproved, setSelectedProductApproved] = useState(null);
  const [selectedProductApproved1, setSelectedProductApproved1] = useState(null);
  const [selectedProductApproved2, setSelectedProductApproved2] = useState(null);
  const [orderExchange_borrowDate, setOrderExchange_borrowDate] = useState(dayjs());
  const [orderSale_borrowDate, setOrderSale_borrowDate] = useState(dayjs());
  const [openNextDialog, setOpenNextDialog] = React.useState(false);
  const [openNextDialogApproved, setOpenNextDialogApproved] = React.useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedProductReview, setSelectedProductReview] = useState(null);
  const [openOrderReview, setOpenOrderReview] = React.useState(false);
  const [bankExists, setBankExists] = useState(false);
  const [updated, setUpdated] = useState(false);
  console.log("selectedProductApproved", selectedProductApproved)

  const descriptionElementRefReview = React.useRef(null);
  React.useEffect(() => {
    if (openOrderReview) {
      const { current: descriptionElement } = descriptionElementRefReview;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrderReview]);

  const handleCloseReview = () => {
    setOpenOrderReview(false);
  };

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
      const { current: descriptionElement } = descriptionElementRefs;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrder1]);
  const descriptionElementRefss = React.useRef(null);
  React.useEffect(() => {
    if (openOrder2) {
      const { current: descriptionElement } = descriptionElementRefss;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrder2]);


  const descriptionElementRefApproved = React.useRef(null);
  React.useEffect(() => {
    if (openOrderApproved) {
      const { current: descriptionElement } = descriptionElementRefApproved;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrderApproved]);
  const descriptionElementRefApproved1 = React.useRef(null);

  React.useEffect(() => {
    if (openOrderApproved1) {
      const { current: descriptionElement } = descriptionElementRefApproved1;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrderApproved1]);
  const descriptionElementRefApproved2 = React.useRef(null);
  React.useEffect(() => {
    if (openOrderApproved2) {
      const { current: descriptionElement } = descriptionElementRefApproved2;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrderApproved2]);

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

  const handleClickOpen2 = (product) => () => {
    setSelectedProductss(product);
    setOrderSale_borrowDate(dayjs(product.order_product_date));
    setOpenOrder2(true);
    setScroll('body');
  };

  const handleClickOpenApproved = (product) => () => {
    setSelectedProductApproved(product);
    setBorrowDate(dayjs(product.order_borrowDate));
    setReturnDate(dayjs(product.order_returnDate));
    setOpenOrderApproved(true);
    setScroll('body');
  };

  const handleClickOpenApproved1 = (product) => () => {
    setSelectedProductApproved1(product);
    setOrderExchange_borrowDate(dayjs(product.orderExchange_borrowDate));
    setOpenOrderApproved1(true);
    setScroll('body');
  };

  const handleClickOpenApproved2 = (product) => () => {
    setSelectedProductApproved2(product);
    setOrderSale_borrowDate(dayjs(product.order_product_date));
    setOpenOrderApproved2(true);
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
  const switchToReView = () => {
    setCurrentView('review');
  };

  const handleClose = () => {
    setOpenOrder(false);
  };
  const handleClose1 = () => {
    setOpenOrder1(false);
    setOpenNextDialog(false);
  };
  const handleClose2 = () => {
    setOpenOrder2(false);
  };
  const handleCloseApproved = () => {
    setOpenOrderApproved(false);
  };
  const handleCloseApproved1 = () => {
    setOpenOrderApproved1(false);
    setOpenNextDialogApproved(false);
  };
  const handleCloseApproved2 = () => {
    setOpenOrderApproved2(false);
  };

  const handleOpenPopover = () => {
    ReactSession.set('username', username);
    ReactSession.set('bank_name', codename.bank_name)
    navigate("/notifications");
  };
  const calculateTotalPendingNotifications = () => {
    if (!notifications || !Array.isArray(notifications)) {
      console.error('Invalid notifications data:', notifications);
      return 0;
    }
    const pendingNotifications = notifications.filter(notification => {
      return (
        notification.order_status === 'รอการตรวจสอบ' ||
        notification.userbank_status === 'รอการตรวจสอบ' ||
        notification.order_product_status === 'รอการตรวจสอบ'
      );
    });
    const totalPendingNotifications = pendingNotifications.reduce((sum, notification) => {
      return sum + notification.combined_count;
    }, 0);

    console.log('Total Pending Notifications:', totalPendingNotifications);

    return totalPendingNotifications;
  };

  const handleClosePopover = () => {
    setAnchorElPopover(null);
  };

  const handleBookmarkClick = async (title) => {
    try {
      const isBookmarked = bookmarks.some((item) => item.title === title);

      if (isBookmarked) {
        const updatedBookmarks = bookmarks.filter((item) => item.title !== title);
        setBookmarks(updatedBookmarks);
        await Axios.delete(`http://localhost:5000/deletebookmark`, {
          data: {
            bookmark_email: username,
            bookmark_bankname: title,
          },
        });
      } else {
        const bookmarkedItem = filteredProducts.find((item) => item.title === title);
        await Axios.post(`http://localhost:5000/bookmark`, {
          bookmark_email: username,
          bookmark_bankname: title,
          bookmark_members: bookmarkedItem.bankMembers,
          bookmark_codename: bookmarkedItem.codename ?? "",
          bookmark_image: bookmarkedItem.image,
          bookmark_lat: bookmarkedItem.lat,
          bookmark_lon: bookmarkedItem.lon,
          bookmark_rank: bookmarkedItem.rank,
          bookmark_rating: bookmarkedItem.rating ?? 0,
        });
        console.log('bookmarkedItem', bookmarkedItem)
        setBookmarks([...bookmarks, bookmarkedItem]);
      }
    } catch (error) {
      console.error('Error bookmarking:', error);
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

  useEffect(() => {
    // Check if the query is empty
    if (searchQuery.trim() === "") {
      // If empty, reset filteredProducts to the original data
      setFilteredProducts(originalData);
    } else {
      // If not empty, filter the products based on the query
      filterProducts(searchQuery);
    }

  }, [searchQuery, originalData]);

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
        localStorage.setItem('username', username)
        navigate(`/profile`);
        break;
      case 'Logout':
        localStorage.removeItem('username');
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
        console.log("image:", response.data[0].image);
        // Assuming the image data is present in the response data
        setUserImage(response.data[0].image);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [username, userImage]);
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
  }, [codename.bank_name, notifications]);

  useEffect(() => {
    Axios.get("http://localhost:5000/showcountuser")
      .then((response) => {
        console.log("จำนวนสมาชิกของแต่ละธนาคาร:", response.data);
        const fetchedProducts = response.data.map((item) => ({
          title: item.bank_name,
          rating: item.rating,
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
    ReactSession.set('username', username);
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

  }, []);
  // Effect(() => {
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

        if (response.data[0]) {
          setCodeName(response.data[0]);
          setBankExists(true); // ถ้ามีธนาคารอยู่แล้วให้เซ็ตค่าเป็น true
        } else {
          setBankExists(false); // ถ้ายังไม่มีธนาคารให้เซ็ตค่าเป็น false
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [username]);
  const disableCreateBankButton = bankExists;

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
          product_id: item.product_id,
          order_request_id: item.order_request_id,
          product_type4: item.product_type4,
          product_name: item.product_name,
          product_quantity: item.product_quantity,
          product_unit: item.product_unit,
          order_rental: item.order_rental,
          order_date: dayjs(item.order_date),
          order_rental_pickup: item.order_rental_pickup ?? "",
          customer_status: item.customer_status,
          order_status_getproduct: item.order_status_getproduct

        }));

        const sortedProducts = fetchedProducts.sort((a, b) => b.order_date - a.order_date);
        setFilteredProduct(sortedProducts);

      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, []);
  useEffect(() => {
    Axios.get(`http://localhost:5000/Inbox1/${username}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data);
        const fetchedProduct = response.data.map((item) => ({
          orderExchange_id: item.orderExchange_id,
          exchange_id: item.exchange_id,
          bank_name: item.bank_name,
          fullname: item.fullname,
          image: item.image,
          product_name: item.product_name,
          product_image: item.product_image,
          product_unit: item.product_unit,
          product_details: item.product_details,
          orderExchange_borrowDate: dayjs(item.orderExchange_borrowDate),
          orderExchange_quantity: item.orderExchange_quantity,
          userbank_status: item.userbank_status,
          userbank_productname: item.userbank_productname,
          userbank_productimage: item.userbank_productimage,
          product_type4: item.product_type4,
          userbank_producttype1: item.userbank_producttype1,
          userbank_productquantity: item.userbank_productquantity,
          userbank_unit: item.userbank_unit,
          userbank_productdetails: item.userbank_productdetails,
          order_exchange: item.order_exchange,
          exchange_date: dayjs(item.exchange_date),
          order_exchange_pickup: item.order_exchange_pickup ?? "",
          customer_status_exchange: item.customer_status_exchange,
          userbank_status_getproduct: item.userbank_status_getproduct
        }));
        const sortedProduct = fetchedProduct.sort((a, b) => b.exchange_date - a.exchange_date);
        setFilteredProductInbox(sortedProduct);


      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [username]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/Inbox2/${username}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data);
        const fetchedProduct = response.data.map((item) => ({
          bank_name: item.bank_name,
          order_product_id: item.order_product_id,
          order_sale_id: item.order_sale_id,
          order_sale_bankname: item.order_sale_bankname,
          fullname: item.fullname,
          image: item.image,
          product_name: item.product_name,
          product_image: item.product_image,
          product_type4: item.product_type4,
          order_product_date: dayjs(item.order_product_date),
          order_product_status: item.order_product_status,
          order_product_quantity: item.order_product_quantity,
          order_product_unit: item.order_product_unit,
          order_product_price: item.order_product_price,
          order_sale: item.order_sale,
          order_product_datetime: dayjs(item.order_product_datetime),
          order_sale_pickup: item.order_sale_pickup ?? "",
          customer_status_sale: item.customer_status_sale,
          order_product_getproduct: item.order_product_getproduct

        }));
        const sortedProductInbox1 = fetchedProduct.sort((a, b) => b.order_product_datetime - a.order_product_datetime);
        setFilteredProductInbox1(sortedProductInbox1);

      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [username]);

  const handleToBank = () => {
    ReactSession.set('username', username);
    ReactSession.set("codename", codename.bank_codename);
    ReactSession.set("bank_name", codename.bank_name);
    console.log(filteredProducts.title)
    navigate("/bank")
  }

  const itemsToDisplay = displayBookmarks ? bookmarks : filteredProducts;
  useEffect(() => {
    Axios.get(`http://localhost:5000/bookmark/${username}`)
      .then((response) => {
        console.log("ข้อมูล Bookmark ทั้งหมด:", response.data);
        const fetchedBookmarks = response.data.map((item) => ({
          title: item.bookmark_bankname,
          bankMembers: item.bookmark_members,
          codename: item.bookmark_codename,
          image: item.bookmark_image,
          lat: item.bookmark_lat,
          lon: item.bookmark_lon,
          rank: item.bookmark_rank,
          rating: item.bookmark_rating,
        }));

        console.log('fetchedBookmarks', fetchedBookmarks);
        setBookmarks(fetchedBookmarks);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล Bookmark:", error);
      });
  }, [username]);
 
  useEffect(() => {
    Axios.get(`http://localhost:5000/checkAndUpdateRank/${username}`)
      .then((response) => {
        console.log('checkAndUpdateRank', response.data);
        
      })
      .catch((error) => {
        console.error('Error occurred while checking and updating rank:', error);
      });
  }, []);

  const handleClicktoReview = (product_id) => {
    ReactSession.set("product_id", product_id);
    ReactSession.set('username', username);
    navigate("/reviewbank")
  }

  const handleClicktoReview1 = (product_id) => {
    ReactSession.set("product_id", product_id);
    ReactSession.set('username', username);
    navigate("/reviewbankchage")
  }

  const handleClicktoReview2 = (product_id) => {
    ReactSession.set("product_id", product_id);
    ReactSession.set('username', username);
    navigate("/reviewbanksale")
  }

  const calculateAverageRating = (products) => {
    let averageRatingsObj = {}; // เก็บผลรวมของคะแนนในแต่ละธนาคาร
    let ratingsCount = {}; // เก็บจำนวนของรีวิวในแต่ละธนาคาร

    products.forEach((product) => {
      const title = product.title;
      if (!averageRatingsObj[title]) {
        averageRatingsObj[title] = 0;
        ratingsCount[title] = 0;
      }
      averageRatingsObj[title] += parseFloat(product.rating); // แปลงคะแนนให้เป็นตัวเลขแบบ float ก่อนนำมารวม
      ratingsCount[title] += 1;
    });

    let averageRatingsResult = {};
    for (let title of Object.keys(averageRatingsObj)) {
      averageRatingsResult[title] = (averageRatingsObj[title] / ratingsCount[title]).toFixed(1);
    }
    return averageRatingsResult;
  };

  const averageRatings = calculateAverageRating(filteredProducts);
  console.log(averageRatings);

  useEffect(() => {
    Axios.get(`http://localhost:5000/Showreviewcustom/${username}`)
      .then((response) => {
        console.log("ข้อมูลรีวิวที่ได้รับ:", response.data);

        if (Array.isArray(response.data)) {
          setReviews(response.data); // เซ็ตข้อมูลรีวิวที่ได้รับเข้าสู่ state reviews
        } else {

        }
      })
      .catch((error) => {

      });
  }, []);

  const handleClickOpenReview = (product) => () => {
    setSelectedProductReview(product);
    setOpenOrderReview(true);
    setScroll('body');
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
              <ListItemButton onClick={switchToReView}>
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
          {itemsToDisplay.map((bookmark) => (
            <Grid item key={bookmark.title} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345, m: 1 }}>
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
                      src={`http://localhost:5000/image/${bookmark.rank}`}
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
                  image={`http://localhost:5000/image/${bookmark.image}`}
                  title="รูปภาพธนาคาร"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {bookmark.title}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    จำนวนสมาชิกทั้งหมด {bookmark.bankMembers} คน
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
                      value={averageRatings[bookmark.title] || null}
                      readOnly
                      precision={0.5}

                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Box sx={{ ml: 2 }} >{`${averageRatings[bookmark.title] || 'N/A'}`}</Box>
                  </Box>
                  {currentPosition && (
                    <Typography>
                      Distance: {bookmark.distance ? bookmark.distance.toFixed(2) : 'N/A'} km
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="medium" onClick={() => handleOpenbankuser(bookmark.title)}>
                    เปิดดูทรัพยากรในธนาคาร
                  </Button>
                  <Button size="medium" onClick={() => handleBookmarkClick(bookmark.title)}>
                    {bookmarks.some((item) => item.title === bookmark.title) ? 'ยกเลิกบุ๊คมาร์ค' : 'บุ๊คมาร์ค'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {/* {filteredProducts.map((bank) => (
            <Grid item key={bank.title} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345, m: 1 }}>
                
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
          ))} */}
        </Grid>
      )}
      {currentView === 'active' && (
        <Grid container spacing={2} style={{ width: '98%', margin: 0 }}>
          {(filteredProduct.length > 0 || filteredProductInbox.length > 0 || filteredProductInbox1.length > 0) ? (
            <>
              {filteredProduct.map((item) => (
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
                          สถานะการรีวิว : {item.order_rental_pickup}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          เวลาที่ทำรายการ : {dayjs(item.order_date).format("DD-MM-YYYY HH:mm:ss")}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {item.order_status === 'รอการตรวจสอบ' ? (
                          <Button onClick={handleClickOpen(item)} size="medium">เปิดอ่าน</Button>
                        ) : (
                          <Button onClick={handleClickOpenApproved(item)} size="medium">เปิดอ่าน</Button>
                        )}
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              ))}
              {filteredProductInbox.map((inboxItem) => (
                <Grid item key={inboxItem.orderExchange_id} xs={12}>
                  <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={inboxItem.image}
                      alt="รูป user"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                          {inboxItem.fullname}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          ได้ทำรายการของ ธนาคาร : {inboxItem.bank_name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          สถานะปัจจุบัน : {inboxItem.userbank_status}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          สถานะการทำรายการ : {inboxItem.order_exchange}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          สถานะการรีวิว : {inboxItem.order_exchange_pickup}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          เวลาที่ทำรายการ : {dayjs(inboxItem.exchange_date).format("DD-MM-YYYY HH:mm:ss")}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {inboxItem.userbank_status === 'รอการตรวจสอบ' ? (
                          <Button onClick={handleClickOpen1(inboxItem)} size="medium">เปิดอ่าน</Button>
                        ) : (
                          <Button onClick={handleClickOpenApproved1(inboxItem)} size="medium">เปิดอ่าน</Button>
                        )}
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              ))}
              {filteredProductInbox1.map((item) => (
                <Grid item key={item.order_product_id} xs={12}>
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
                          ได้ทำรายการของ ธนาคาร : {item.order_sale_bankname}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          สถานะปัจจุบัน : {item.order_product_status}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          สถานะการทำรายการ : {item.order_sale}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          สถานะการรีวิว : {item.order_sale_pickup}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          เวลาที่ทำรายการ : {dayjs(item.order_product_datetime).format("DD-MM-YYYY HH:mm:ss")}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {item.order_product_status === 'รอการตรวจสอบ' ? (
                          <Button onClick={handleClickOpen2(item)} size="medium">เปิดอ่าน</Button>
                        ) : (
                          <Button onClick={handleClickOpenApproved2(item)} size="medium">เปิดอ่าน</Button>
                        )}
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </>
          ) : (
            <p>ไม่มีกิจกรรม</p>
          )}
        </Grid>
      )}

      {currentView === 'review' && (
        <Grid container spacing={2} style={{ width: '98%', margin: 0 }}>
          {reviews.length > 0 ? (
            <>
              {reviews.map((item) => (
                <Grid item key={item.product_id} xs={12}>
                  <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={`http://localhost:5000/image/${item.bank_image}`}
                      alt="รูปธนาคาร"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                          {item.bank_name}
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
                            value={item.rating}
                            readOnly
                            precision={0.5}

                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                          <Box sx={{ ml: 2 }} >{`${item.rating || 'N/A'}`}</Box>
                        </Box>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          รายละเอียด : {item.detail}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          เวลาที่ทำรายการ : {dayjs(item.date).format("DD-MM-YYYY HH:mm:ss")}
                        </Typography>
                        <CardMedia
                          component="img"
                          sx={{ width: 151 }}
                          image={`http://localhost:5000/image/${item.customer_review_image}`}
                          alt="รูปธนาคาร"
                        />
                      </CardContent>
                      <CardActions>
                        <Button onClick={handleClickOpenReview(item)} size="medium">เปิดอ่าน</Button>
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>

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
              <Grid container spacing={2} style={{ width: '98%', margin: 0 }}>
                {(filteredProduct.length > 0 || filteredProductInbox.length > 0 || filteredProductInbox1.length > 0) ? (
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
                    {filteredProductInbox.map((inboxItem) => (
                      inboxItem.userbank_status === 'รอการตรวจสอบ' && (
                        <Grid item key={inboxItem.orderExchange_id} xs={12}>
                          <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 151 }}
                              image={inboxItem.image}
                              alt="รูป user"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                  {inboxItem.fullname}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  ได้ทำรายการของ ธนาคาร : {inboxItem.bank_name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะปัจจุบัน : {inboxItem.userbank_status}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะการทำรายการ : {inboxItem.order_exchange}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  เวลาที่ทำรายการ : {dayjs(inboxItem.exchange_date).format("DD-MM-YYYY HH:mm:ss")}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button onClick={handleClickOpen1(inboxItem)} size="medium">เปิดอ่าน</Button>
                              </CardActions>
                            </Box>
                          </Card>
                        </Grid>
                      )
                    ))}
                    {filteredProductInbox1.map((item) => (
                      item.order_product_status === 'รอการตรวจสอบ' && (
                        <Grid item key={item.order_product_id} xs={12}>
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
                                  ได้ทำรายการของ ธนาคาร : {item.order_sale_bankname}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะปัจจุบัน : {item.order_product_status}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะการทำรายการ : {item.order_sale}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  เวลาที่ทำรายการ : {dayjs(item.order_product_datetime).format("DD-MM-YYYY HH:mm:ss")}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button onClick={handleClickOpen2(item)} size="medium">เปิดอ่าน</Button>
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
              <Grid container spacing={2} style={{ width: '98%', margin: 0 }}>
                {(filteredProduct.length > 0 || filteredProductInbox.length > 0 || filteredProductInbox1.length > 0) ? (
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
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะการทำรายการ : {item.order_rental}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะการรีวิว : {item.order_rental_pickup}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  เวลาที่ทำรายการ : {dayjs(item.order_date).format("DD-MM-YYYY HH:mm:ss")}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button onClick={handleClickOpenApproved(item)} size="medium">เปิดอ่าน</Button>
                              </CardActions>
                            </Box>
                          </Card>
                        </Grid>
                      )
                    ))}
                    {filteredProductInbox.map((inboxItem) => (
                      inboxItem.userbank_status === 'อนุมัติให้ทำรายการ' && (
                        <Grid item key={inboxItem.orderExchange_id} xs={12}>
                          <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 151 }}
                              image={inboxItem.image}
                              alt="รูป user"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                  {inboxItem.fullname}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  ได้ทำรายการของ ธนาคาร : {inboxItem.bank_name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะปัจจุบัน : {inboxItem.userbank_status}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะการทำรายการ : {inboxItem.order_exchange}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะการทำรายการ : {inboxItem.order_exchange_pickup}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  เวลาที่ทำรายการ : {dayjs(inboxItem.exchange_date).format("DD-MM-YYYY HH:mm:ss")}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button onClick={handleClickOpenApproved1(inboxItem)} size="medium">เปิดอ่าน</Button>
                              </CardActions>
                            </Box>
                          </Card>
                        </Grid>
                      )
                    ))}
                    {filteredProductInbox1.map((item) => (
                      item.order_product_status === 'อนุมัติให้ทำรายการ' && (
                        <Grid item key={item.order_product_id} xs={12}>
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
                                  ได้ทำรายการของ ธนาคาร : {item.order_sale_bankname}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะปัจจุบัน : {item.order_product_status}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะการทำรายการ : {item.order_sale}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะการทำรายการ : {item.order_sale_pickup}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  เวลาที่ทำรายการ : {dayjs(item.order_product_datetime).format("DD-MM-YYYY HH:mm:ss")}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button onClick={handleClickOpenApproved2(item)} size="medium">เปิดอ่าน</Button>
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
              <Grid container spacing={2} style={{ width: '98%', margin: 0 }}>
                {(filteredProduct.length > 0 || filteredProductInbox.length > 0 || filteredProductInbox1.length > 0) ? (
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
                    {filteredProductInbox.map((inboxItem) => (
                      inboxItem.userbank_status === 'ไม่อนุมัติให้ทำรายการ' && (
                        <Grid item key={inboxItem.orderExchange_id} xs={12}>
                          <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 151 }}
                              image={inboxItem.image}
                              alt="รูป user"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                  {inboxItem.fullname}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  ได้ทำรายการของ ธนาคาร : {inboxItem.bank_name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะปัจจุบัน : {inboxItem.userbank_status}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะการทำรายการ : {inboxItem.order_exchange}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  เวลาที่ทำรายการ : {dayjs(inboxItem.exchange_date).format("DD-MM-YYYY HH:mm:ss")}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button onClick={handleClickOpen1(inboxItem)} size="medium">เปิดอ่าน</Button>
                              </CardActions>
                            </Box>
                          </Card>
                        </Grid>
                      )
                    ))}
                    {filteredProductInbox1.map((item) => (
                      item.order_product_status === 'ไม่อนุมัติให้ทำรายการ' && (
                        <Grid item key={item.order_product_id} xs={12}>
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
                                  ได้ทำรายการของ ธนาคาร : {item.order_sale_bankname}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะปัจจุบัน : {item.order_product_status}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  สถานะการทำรายการ : {item.order_sale}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  เวลาที่ทำรายการ : {dayjs(item.order_product_datetime).format("DD-MM-YYYY HH:mm:ss")}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button onClick={handleClickOpen2(item)} size="medium">เปิดอ่าน</Button>
                              </CardActions>
                            </Box>
                          </Card>
                        </Grid>
                      )
                    ))}
                  </>
                ) : (
                  <p>ไม่มีรายการที่ไม่อนุมัติ</p>
                )}
              </Grid>
            </div>
          )}
        </div>
      )}

      <Dialog
        open={openOrderReview}
        onClose={handleCloseReview}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>ธนาคาร {selectedProductReview ? selectedProductReview.bank_name : 'N/A'} ได้รีวิวทรัพยากรที่คุณทำรายการไป </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRefReview}
            tabIndex={-1}
          >
            {selectedProductReview ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ maxWidth: 345, m: 1 }} >
                    <CardMedia
                      component="img"
                      height="300"
                      image={`http://localhost:5000/image/${selectedProductReview.product_image}`}
                      title="รูปภาพทรัพยากร"
                    />
                  </Card>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ marginTop: 50 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                    <TextField disabled id="outlined-disabled" label={selectedProductReview.product_name} variant="outlined" sx={{ width: '50ch' }} />
                  </div>
                </div>
              </>
            ) : (
              <p>Details not found.</p>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>

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
                    <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                    <TextField disabled id="outlined-disabled" label={`${selectedProduct.order_rental}`} variant="outlined" sx={{ width: '50ch' }} />
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
                        <DemoItem label={<Label componentName="วันที่จะมารับทรัพยากร" valueType="date" />} >
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
          <Button onClick={() => handleClose1()} color='error'>ปิด</Button>
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
      </Dialog>

      <Dialog
        open={openOrder2}
        onClose={handleClose2}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>คุณได้ทำรายการของธนาคาร {selectedProductss ? selectedProductss.order_sale_bankname : 'N/A'} </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRefss}
            tabIndex={-1}
          >
            {selectedProductss ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ maxWidth: 345, m: 1 }} >
                    <CardMedia
                      component="img"
                      height="300"
                      image={`http://localhost:5000/image/${selectedProductss.product_image}`}
                      title="รูปภาพทรัพยากร"
                    />
                  </Card>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ marginTop: 50 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                    <TextField disabled id="outlined-disabled" label={selectedProductss.product_name} variant="outlined" sx={{ width: '50ch' }} />
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
                    <TextField disabled id="outlined-disabled" label={selectedProductss.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                  </div>
                  <div style={{ marginTop: 30 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                    <TextField disabled id="outlined-disabled" label={`${selectedProductss.order_sale}`} variant="outlined" sx={{ width: '50ch' }} />
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                    <TextField disabled id="outlined-disabled" label={`${selectedProductss.order_product_quantity} ${selectedProductss.order_product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
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
                            value={orderSale_borrowDate}
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

      {/* approved */}
      <Dialog
        open={openOrderApproved}
        onClose={handleCloseApproved}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>คุณได้ทำรายการของธนาคาร {selectedProductApproved ? selectedProductApproved.bank_name : 'N/A'} </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRefApproved}
            tabIndex={-1}
          >
            {selectedProductApproved ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ maxWidth: 345, m: 1 }} >
                    <CardMedia
                      component="img"
                      height="300"
                      image={`http://localhost:5000/image/${selectedProductApproved.product_image}`}
                      title="รูปภาพทรัพยากร"
                    />
                  </Card>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ marginTop: 50 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                    <TextField disabled id="outlined-disabled" label={selectedProductApproved.product_name} variant="outlined" sx={{ width: '50ch' }} />
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
                    <TextField disabled id="outlined-disabled" label={selectedProductApproved.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                  </div>
                  <div style={{ marginTop: 30 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                    <TextField disabled id="outlined-disabled" label={`${selectedProductApproved.order_rental}`} variant="outlined" sx={{ width: '50ch' }} />
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                    <TextField disabled id="outlined-disabled" label={`${selectedProductApproved.order_quantity} ${selectedProductApproved.product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
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
        {(selectedProductApproved && selectedProductApproved.order_status_getproduct === 'รับทรัพยากรเรียบร้อยแล้ว' && selectedProductApproved.order_rental_pickup !== 'รีวิวทรัพยากรเรียบร้อย') && (
          <DialogActions sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => handleClicktoReview(selectedProductApproved.order_request_id)}>แจ้งคืนทรัพยากร</Button>
          </DialogActions>
        )}
      </Dialog>

      <Dialog
        open={openOrderApproved1}
        onClose={() => setOpenNextDialogApproved(false)}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>รายการที่ {selectedProductApproved1 ? selectedProductApproved1.fullname : 'N/A'} ได้ทำรายการ</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRefApproved1}
            tabIndex={-1}
          >
            {selectedProductApproved1 ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ maxWidth: 345, m: 1 }} >
                    <CardMedia
                      component="img"
                      height="300"
                      image={`http://localhost:5000/image/${selectedProductApproved1.product_image}`}
                      title="รูปภาพทรัพยากร"
                    />
                  </Card>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ marginTop: 50 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                    <TextField disabled id="outlined-disabled" label={selectedProductApproved1.product_name} variant="outlined" sx={{ width: '50ch' }} />
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
                    <TextField disabled id="outlined-disabled" label={selectedProductApproved1.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                  </div>
                  <div style={{ marginTop: 30 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                    <TextField disabled id="outlined-disabled" label={`${selectedProductApproved1.order_exchange}`} variant="outlined" sx={{ width: '50ch' }} />
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                    <TextField disabled id="outlined-disabled" label={`${selectedProductApproved1.orderExchange_quantity} ${selectedProductApproved1.product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
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
          <Button onClick={() => handleCloseApproved1()} color='error'>ปิด</Button>
          <Button onClick={() => setOpenNextDialogApproved(true)} >ถัดไป</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openNextDialogApproved}
        onClose={handleCloseApproved1}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>รายการที่ {selectedProductApproved1 ? selectedProductApproved1.fullname : 'N/A'} จะนำมาแลกเปลี่ยน</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRefApproved1}
            tabIndex={-1}
          >
            {selectedProductApproved1 ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ maxWidth: 345, m: 1 }} >
                    <CardMedia
                      component="img"
                      height="300"
                      image={`http://localhost:5000/image/${selectedProductApproved1.userbank_productimage}`}
                      title="รูปภาพทรัพยากร"
                    />
                  </Card>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ marginTop: 50 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                    <TextField disabled id="outlined-disabled" label={selectedProductApproved1.userbank_productname} variant="outlined" sx={{ width: '50ch' }} />
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
                    <TextField disabled id="outlined-disabled" label={selectedProductApproved1.userbank_producttype1} variant="outlined" sx={{ width: '50ch' }} />

                  </div>

                  <div style={{ marginTop: 30 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                    <TextField disabled id="outlined-disabled" label={`${selectedProductApproved1.userbank_productquantity} ${selectedProductApproved1.userbank_unit}`} variant="outlined" sx={{ width: '50ch' }} />
                  </div>

                </div>
              </>
            ) : (
              <p>Details not found.</p>
            )}
          </DialogContentText>
        </DialogContent>
        {(selectedProductApproved1 && selectedProductApproved1.userbank_status_getproduct === 'รับทรัพยากรเรียบร้อยแล้ว' && selectedProductApproved1.order_exchange_pickup !== 'รีวิวทรัพยากรเรียบร้อย') && (
          <DialogActions sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => handleClicktoReview1(selectedProductApproved1.exchange_id)}>รีวิวทรัพยากรที่แลกเปลี่ยนในธนาคาร</Button>
          </DialogActions>
        )}
      </Dialog>

      <Dialog
        open={openOrderApproved2}
        onClose={handleCloseApproved2}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>คุณได้ทำรายการของธนาคาร {selectedProductApproved2 ? selectedProductApproved2.order_sale_bankname : 'N/A'} </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRefApproved2}
            tabIndex={-1}
          >
            {selectedProductApproved2 ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ maxWidth: 345, m: 1 }} >
                    <CardMedia
                      component="img"
                      height="300"
                      image={`http://localhost:5000/image/${selectedProductApproved2.product_image}`}
                      title="รูปภาพทรัพยากร"
                    />
                  </Card>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ marginTop: 50 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                    <TextField disabled id="outlined-disabled" label={selectedProductApproved2.product_name} variant="outlined" sx={{ width: '50ch' }} />
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
                    <TextField disabled id="outlined-disabled" label={selectedProductApproved2.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                  </div>
                  <div style={{ marginTop: 30 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                    <TextField disabled id="outlined-disabled" label={`${selectedProductApproved2.order_sale}`} variant="outlined" sx={{ width: '50ch' }} />
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                    <TextField disabled id="outlined-disabled" label={`${selectedProductApproved2.order_product_quantity} ${selectedProductApproved2.order_product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
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
                            value={orderSale_borrowDate}
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
        {(selectedProductApproved2 && selectedProductApproved2.order_product_getproduct === 'รับทรัพยากรเรียบร้อยแล้ว' && selectedProductApproved2.order_sale_pickup !== 'รีวิวทรัพยากรเรียบร้อย') && (
          <DialogActions sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => handleClicktoReview2(selectedProductApproved2.order_sale_id)}>รีวิวทรัพยากรที่ซื้อในธนาคาร</Button>
          </DialogActions>
        )}
      </Dialog>
    </div >

  );
}
export default Main12;