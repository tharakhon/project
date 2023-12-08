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
import Navbar1 from './NavBar1';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import logo from "../src/Logo.png";
import Grid from '@mui/material/Unstable_Grid2';
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
  { title: 'Lizard',titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica',image : logo },
  { title: 'Garlic', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica',image : logo},
  { title: 'Apple', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica',image : logo},
  { title: 'pond',titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica',image : logo },
  { title: 'earth',titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica',image : logo },
  { title: 'mud',titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica',image : logo },
  { title: 'thailand',titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica',image : logo },
  { title: 'island',titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica',image : logo },
  { title: 'ลาว',titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica',image : logo },
  { title: 'พม่า',titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica',image : logo },
];
export default function Bank() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/bank");
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar1 />
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
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 10 }}>
        <DrawerHeader />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Button variant="contained" color='error' sx={{ left: 1050, bottom: 35, borderRadius: 50 }} onClick={handleBack}>เพิ่มทรัพยากร</Button>
        <Grid container spacing={2}>
        {products.map(tab => 
         
         <Grid xs={3}>
         <Card sx={{ maxWidth: 345 ,m:1}} >
           <CardMedia
             sx={{ height: 180, }}
             image={tab.image}
             title="green iguana"
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
             <Button size="small">Share</Button>
             <Button size="small">Learn More</Button>
           </CardActions>
         </Card>
         </Grid>
         
        )}
        </Grid>
      </Box>
    </Box>
  );
}