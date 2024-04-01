import React from "react";
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
import Badge from '@mui/material/Badge';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReviewsIcon from '@mui/icons-material/Reviews';
import massage from './image/conversation.png'
import Avatar from '@mui/material/Avatar';
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from 'react';
import Axios from 'axios';

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

function NavbarProfile() {
    const navigate = useNavigate();
    const username = ReactSession.get("username");
    const bank_name = ReactSession.get("bank_name");
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [userImage, setUserImage] = useState('');
    const handleDrawerOpen = () => {
        setOpen(true);
    };
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
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleOpenBankChat = () => {
        ReactSession.set('username', username)
        ReactSession.set('bank_name', bank_name)
        navigate('/Bankchat')
    }
    const handleClick = () => {
        ReactSession.set("username", username)
        navigate("/profile")
    }
    return (
        <div>
            <AppBar position="static" open={open} sx={{ backgroundColor: '#07C27F' }}>
                <Toolbar>
                    <Typography><img src={logo} style={{ padding: 20, height: 80, width: 80, }} /></Typography>
                    <Typography><p style={{ color: 'white', padding: 20, fontSize: 24, }}>AVB</p></Typography>
                    <Typography variant="h3" component="div" sx={{ paddingLeft: 50 }}> Profile</Typography>
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
        </div>
    );
}
export default NavbarProfile;