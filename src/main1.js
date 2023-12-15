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
import logo from "../src/image/Logo.png";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import bk from "../src/image/กรุงเทพ.jpg";
import ktb from "../src/image/กรุงไทย.jpg";
import k from "../src/image/กสิกร.jpg";
import scb from "../src/image/ไทยพานิช.png";
const products = [
  { title: 'กรุงเทพ', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica', image: bk },
  { title: 'กรุงไทย', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica', image: ktb },
  { title: 'กสิกร', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica', image: k },
  { title: 'ไทยพานิช', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica', image: scb },
  { title: 'earth', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica', image: ktb },
  { title: 'mud', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica', image: ktb },
  { title: 'thailand', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica', image: ktb },
  { title: 'island', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica', image: ktb },
  { title: 'ลาว', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica', image: ktb },
  { title: 'พม่า', titles: 'Lizards are a widespread group of squamate reptiles, with over 6000 species ranging across all continents except Antarctica', image: ktb },
];
const settings = ['เรียงด้วยแรงค์', 'เรียงด้วยระยะทาง', 'เรียงด้วยเรตติ้ง'];
function Main12() {
  const [profile, setProfile] = useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [flag, setflag] = useState(false);
  const navigate = useNavigate();
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


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
      <Navbar1 />
      <div style={{ display: 'flex', margin: 10, justifyContent: 'space-between' }}>
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
        {products.map(tab =>
          <Grid xs={3}>
            <Card sx={{ maxWidth: 345, m: 1 }} >
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
                <Button size="medium">Open</Button>
                <Button size="medium">Mark</Button>
              </CardActions>
            </Card>
          </Grid>

        )}
      </Grid>

    </div>

  );
}
export default Main12;