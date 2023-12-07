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
import logo from "../src/Logo.png";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
function Main12() {
  const [profile, setProfile] = useState([]);
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
  return (
    <div>

      <Navbar1 />
      <div style={{ display: 'flex', margin: 20, justifyContent: 'space-between' }}>
        <FilterAltSharpIcon fontSize='large' color='info' />
        <Button variant='contained' sx={{ borderRadius: 20, backgroundColor: '#D62828', color: 'white' }} onClick={handleSubmit}>สร้างธนาคาร</Button></div>

      <Grid container spacing={2}>
        <Grid xs={3}>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              sx={{ height: 180, }}
              image={logo}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              sx={{ height: 180, }}
              image={logo}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              sx={{ height: 180, }}
              image={logo}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              sx={{ height: 180, }}
              image={logo}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              sx={{ height: 180, }}
              image={logo}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              sx={{ height: 180, }}
              image={logo}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              sx={{ height: 180, }}
              image={logo}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              sx={{ height: 180, }}
              image={logo}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              sx={{ height: 180, }}
              image={logo}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              sx={{ height: 180, }}
              image={logo}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>

  );
}
export default Main12;