import { Avatar, Box, Button, Card, CardContent, CardMedia, FormLabel, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBarBank from "./navBarBank";
import { blue } from "@mui/material/colors";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Axios from "axios";
import { ReactSession } from 'react-client-session';
import { useNavigate } from "react-router-dom";
import AllReviewcstom from "./Allreviewcustom";

const labels = {
    0.5: '0.5',
    1: '1.0',
    1.5: '1.5',
    2: '2.0',
    2.5: '2.5',
    3: '3.0',
    3.5: '3.5',
    4: '4.0',
    4.5: '4.5',
    5: '5.0',
  };

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

export default function Reviewcustom(){
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const [commentuser,setCommentuser]=useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();
    const user=useState('ฮอลคูล');
    useEffect(() => {
      Axios.get(`http://localhost:5000/showProductUser/AVB 2`)
          .then((response) => {
              console.log("ข้อมูลที่ได้รับ:", response.data);
              const fetchedProducts = response.data.map((item) => ({
                  id: item.product_id,
                  title: item.product_name,
                  quantity: item.product_quantity,
                  image: item.product_image // Update with the correct property name
                  // Update with the correct property name
              }));
              setFilteredProducts(fetchedProducts);
          })
          .catch((error) => {
              console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
          })

  }, []);
  const handleSubmit = () => {
      
    Axios.post('http://localhost:5000/Reviewcustom', {
      bank_name: "AVB 2",
      rating : value,
      detail: commentuser,
      user_name : "ฮอลคูล",
      // ... other data
    })
      .then((response) => {
        console.log(response.data);
        
        // Redirect to the bank page on successful registration

      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No Response from Server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
        }
      });
      navigate("/ShowReviewAllcus");
  }
  
  
    console.log(commentuser)
    console.log(value)
    return(
        <div>
             <NavBarBank/>
             <div style={{display: "flex", justifyContent: "center", alignItems: "center"  }}>
                <Typography sx={{fontSize:"60px",marginTop:3,fontWeight: "normal"}}>แสดงความคิดเห็นให้ผู้ใช้บริการ</Typography>
            </div>
            
            <Grid2 container spacing={0} columns={16} >
            <Grid xs={6} container spacing={0} 
            justifyContent="center" 
            alignItems= "center"
            direction="column"
            marginTop={5}
              >
            <Typography sx={{fontSize:"30px"}}>ผู้ทำรายการ</Typography>
            <Card sx={{ maxWidth: 345, m: 1,border:1,justifyContent:"center",alignItems:'center'}} >
              <CardMedia
                component="img"
                height="300"
                image='รูปภาพทรัพยากร'
                title="รูปภาพทรัพยากร"
              />
              <CardContent borderTop='1'>
                <Typography gutterBottom variant="h5" component="div">
                    {user}
                 </Typography>
                 
              </CardContent>
             
            </Card>
            </Grid>
            <Grid xs={6} container spacing={0} 
            justifyContent="center" 
            alignItems= "center"
            direction="column"
            marginTop={5}
              >
            <Typography sx={{fontSize:"30px"}}>ทรัพยากรที่ใช้ทำรายการ</Typography>
            <Card sx={{ maxWidth: 345, m: 1,border:1 }} >
              <CardMedia
                component="img"
                height="300"
                image='รูปภาพทรัพยากร'
                title="รูปภาพทรัพยากร"
              />
              <CardContent borderTop='1'>
                <Typography gutterBottom variant="h5" component="div">
                    จอบ
                 </Typography>
                 <Typography gutterBottom variant="h5" component="div">
                    ประเภทบริการ : เช่าหรือยืมทรัพยากร
                 </Typography>
              </CardContent>
             
            </Card>
            </Grid>
            </Grid2>
            
            <Stack direction="row" justifyContent= "center" spacing={3} marginTop={5}>
                <Typography sx={{fontSize:"30px"}}>ให้คะแนนผู้ใช้บริการ</Typography>
            <Rating
             name="hover-feedback"
             value={value}
             precision={0.5}
             getLabelText={getLabelText}
             onChange={(event, newValue) => {setValue(newValue);}}
             onChangeActive={(event, newHover) => {setHover(newHover);}}
            size="large"
            />
            {value !== null && (
             <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>)}
            </Stack>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              marginTop={5}
            >
            <FormLabel component="legend" style={{ color: "black",fontSize: '20px' }}>เขียนรีวิวของคุณ</FormLabel>
            <TextField
                
                id="outlined-multiline-static"              
                multiline
                rows={7}
                sx={{ width: 600,marginTop:3}}
                value={commentuser}
               onChange={(e)=>setCommentuser(e.target.value)}
            />
           </Stack>
           <div style={{display: "flex",justifyContent:"center"}}>
                <Button variant="contained" color="success" sx={{marginTop:5}} onClick={handleSubmit} >ยืนยันความคิดเห็น</Button>
            </div>

        </div>
    );

   

}