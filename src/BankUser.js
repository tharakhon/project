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
import Apple from '../src/image/a.jpg';
import hoe from '../src/image/จอบ.jpg';
import fertilizer from '../src/image/ปุ๋ย.png';
import banana from '../src/image/กล้วย.jpg';
import car from '../src/image/รถเกี่ยวข้าว.png';
import NavBarBank from './navBarBank';
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
const products = [
    { title: 'จอบ', titles: 'จำนวนทรัพที่เหลืออยู่ 1 ชิ้น', image: hoe },
    { title: 'ปุ๋ย', titles: 'จำนวนทรัพที่เหลืออยู่ 10 กิโลกรัม', image: fertilizer },
    { title: 'แอบเปิ้ล', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple },
    { title: 'กล้วย', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: banana },
    { title: 'รถเกี่ยวข้าว', titles: 'จำนวนทรัพที่เหลืออยู่ 10 คัน', image: car },
    { title: 'แอบเปิ้ล', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple },
    { title: 'แอบเปิ้ล', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple },
    { title: 'แอบเปิ้ล', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple },
    { title: 'แอบเปิ้ล', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple },
    { title: 'แอบเปิ้ล', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple },
];
export default function BankUser() {
    const navigate = useNavigate();
    const handleNext = () => {
        navigate("/openbankusers");
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <NavBarBank/>
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
                        {['ทรัพยากรทั้งหมด'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['เช่าหรือยืมทรัพยากร'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['ซื้อทรัพยากร'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['แลกเปลี่ยนทรัพยากร'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['สมาชิก'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
                <DrawerHeader />
                <Search sx={{ m: 2 }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

                <Grid container spacing={2}>
                    {products.map(tab =>

                        <Grid xs={3}>
                            <Card sx={{ maxWidth: 345, m: 1 }} >
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={tab.image}
                                    title="รูปภาพทรัพยากร"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {tab.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {tab.titles}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={handleNext}>ดูทรัพยากร</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}