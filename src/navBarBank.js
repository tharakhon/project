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
import { useNavigate } from "react-router-dom";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReviewsIcon from '@mui/icons-material/Reviews';
import HomeIcon from '@mui/icons-material/Home';
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

function NavBarBank() {
    const navigate = useNavigate();
    const username = ReactSession.get("username");
    const [open, setOpen] = useState(false);
    const [bankname,setBankName] = useState([]);
    const theme = useTheme();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClick = () => {
        ReactSession.set("username", username)
        navigate("/profile")
    }
    const handleClickToMain = () => {
        ReactSession.set("username", username)
        navigate("/main")
    }
    useEffect(() => {
        Axios.get(`http://localhost:5000/showcodename/${username}`)
          .then((response) => {
            console.log("ข้อมูลที่ได้รับ:showcodename", response.data[0]);
            setBankName(response.data[0]);
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
          })
    
      }, [username]);
      const handleOpenBankChat = () => {
        ReactSession.set('username', username)
        ReactSession.set('bank_name', bankname.bank_name)
        navigate('/Bankchat')
    }
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
                    <Typography><p style={{ color: 'white', padding: 20, fontSize: 24, marginLeft: 320 }}>ธนาคาร : {bankname.bank_name}</p></Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" color="inherit" onClick={handleOpenBankChat}>
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
                            <ListItemButton onClick={handleClickToMain}>
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
        </div>
    );
}
export default NavBarBank;