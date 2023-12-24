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
const products = [
  { title: 'กรุงเทพ',rating:2.5, image: bk },
  { title: 'กรุงไทย', rating:3.5, image: ktb },
  { title: 'กสิกร', rating:4.5, image: k },
  { title: 'ไทยพานิช',  rating:1.5,image: scb },
  { title: 'earth', rating:4.5,image: ktb },
  { title: 'mud',  rating:3.5,image: ktb },
  { title: 'thailand',  rating:2.5,image: ktb },
  { title: 'island', rating:1.5, image: ktb },
  { title: 'ลาว', rating:4.5,image: ktb },
  { title: 'พม่า', rating:0.5, image: ktb },
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
  const handleOpenbankuser = () => {
    navigate('/bankuser')
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div >
      <Navbar1 />
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
        {products.map(tab =>
          <Grid xs={3}>
            <Card sx={{ maxWidth: 345, m: 1 }} >
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
              </CardContent>
              <CardActions>
                <Button size="medium" onClick={handleOpenbankuser}>เปิดดูทรัพยากรในธนาคาร</Button>
                <Button size="medium">บุ๊คมาร์ค</Button>
              </CardActions>
            </Card>
          </Grid>

        )}
      </Grid>

    </div>

  );
}
export default Main12;