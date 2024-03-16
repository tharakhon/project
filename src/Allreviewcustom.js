import React, { useEffect, useState } from "react";
import NavBarBank from "./navBarBank";
import { Avatar, Box, Card, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Rating, Select, Stack, Typography } from "@mui/material";
import { grey, orange, pink, purple, yellow } from "@mui/material/colors";
import StarRateSharpIcon from '@mui/icons-material/StarRateSharp';
import Axios from "axios";
import { ReactSession } from 'react-client-session';
import NavBaruser from "./navBaruser";
import dayjs from 'dayjs'

const textStyle = {
    color: 'black',
    fontSize: '60px',
    fontWeight: 'normal',
  };

function getLabelText(value) {
    return `${value}`;
}

export default function AllReviewcstom(){

    const [star, setStar] = React.useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [commentCount, setCommentCount] = useState(0);


    const handleChange = (event) => {
        
        setSortOption(event.target.value);
        console.log(event);
        console.log(event.target.value);
    };
    console.log(star);

    const [value, setValue] = React.useState([]);
    const [hover, setHover] = React.useState(-1);

    
      const calculateAverageRating = () => {
        let sum = 0;
        filteredProducts.forEach((product) => {
            sum += product.rate;
        });
        const averageRating = sum / filteredProducts.length;
        return averageRating.toFixed(1); // คืนค่าเฉลี่ยดาวที่มีทศนิยมหนึ่งตำแหน่ง
    };
    
     
      useEffect(()=>{
        let url = `http://localhost:5000/Showreviewcustom/AVB 2`;
        if (sortOption === '40') { // กรองดาวมากไปน้อย
            url += "?sort=desc";
            
        } else if (sortOption === '50') { // กรองดาวน้อยไปมาก
            url += "?sort=asc";
            
        } else if (sortOption === '30') { // กรองวันล่าสุด
            url += "?sort=date";
        }
            
        Axios.get(url)
          .then((response) => {
              console.log("ข้อมูลที่ได้รับ:", response.data);
              const fetchedProducts = response.data.map((item) => ({
                  id: item.product_id,
                  title: item.product_name,
                  detail: item.detail,
                  image: item.product_image, // Update with the correct property name
                  rate:item.rating,
                  name:item.bank_name,
                  day:dayjs(item.date),
                  // Update with the correct property name
              }));
              if (sortOption === '30') { // เรียงข้อมูลตามวันล่าสุด
                fetchedProducts.sort((a, b) => b.day - a.day);
              }
              setFilteredProducts(fetchedProducts);
              setValue(fetchedProducts.rate);
              setCommentCount(fetchedProducts.length);
          })
          .catch((error) => {
              console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
          })

        }, [sortOption]);
        console.log(filteredProducts);
    return(

        <div>

            <NavBaruser/>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={textStyle} s>ความคิดเห็นที่ธนาคารได้รีวิวคุณ</h1>
            <Box
            sx={{
                width: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>
                <Box sx={{ marginRight: 5 , fontSize:'40px'}}>{calculateAverageRating()}</Box>
                <Rating name="half-rating-read" value={calculateAverageRating()} precision={0.1} sx={{fontSize: 50}} readOnly/>
            </Box>
            <Box sx={{ marginTop:5,marginRight: 7 , fontSize:'25px'}}>{commentCount} ความคิดเห็น</Box>
          

            </div>
            <Box sx={{ minWidth: 120,marginLeft:4,marginTop:5 }}>
            <FormControl sx={{width:250}}>
                <InputLabel id="demo-simple-select-label">เรียงโดย</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortOption}
                label="เรียงโดย"
                onChange={handleChange}
                >
                <MenuItem value={'30'}>ล่าสุด</MenuItem>
                <MenuItem value={'40'}>เรียงดาวมาก-น้อย</MenuItem>
                <MenuItem value={'50'}>เรียงดาวน้อย-มาก</MenuItem>
                </Select>
            </FormControl>
            </Box>
            <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            marginTop={5}
            >
               {sortOption === '30' ? (
        <>
        {filteredProducts.sort((a, b) => b.day - a.day).map((commentm) => (
            <List sx={{ border: 1, padding: 3, width: '100%', bgcolor: grey[200] }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: purple[500] }}>A</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`ธนาคาร ${commentm.name}`}

                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                >
                                    <Box
                                        sx={{
                                            width: 150,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Rating
                                            
                                            name="text-feedback"
                                            value={commentm.rate}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarRateSharpIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <Box sx={{ ml: 2 }}>{getLabelText(commentm.rate)}</Box>
                                    </Box>
                                    <p> ความคิดเห็น : {commentm.detail}</p>
                                    <p>{dayjs(commentm.day).format('DD/MM/YYYY HH:mm:ss')}</p>
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        ))}
    </>
) : sortOption ==='40' ? ( 
    <>
        {filteredProducts.sort((a, b) => b.rate - a.rate).map((commentm) => (
            <List sx={{ border: 1, padding: 3, width: '100%', bgcolor: grey[200] }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: purple[500] }}>A</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`ธนาคาร ${commentm.name} ได้รีวิวคุณกลับ`}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                >
                                    <Box
                                        sx={{
                                            width: 150,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Rating
                                            name="text-feedback"
                                            value={commentm.rate}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarRateSharpIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <Box sx={{ ml: 2 }}>{getLabelText(commentm.rate)}</Box>
                                    </Box>
                                    <p> ความคิดเห็น : {commentm.detail}</p>
                                    <p>{dayjs(commentm.day).format('DD/MM/YYYY HH:mm:ss')}</p>
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        ))}
    </>
) : ( <>
    {filteredProducts.sort((a, b) => a.rate - b.rate).map((commentm) => (
            <List sx={{ border: 1, padding: 3, width: '100%', bgcolor: grey[200] }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: purple[500] }}>A</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`ธนาคาร ${commentm.name} ได้รีวิวคุณกลับ`}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                >
                                    <Box
                                        sx={{
                                            width: 150,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Rating
                                            name="text-feedback"
                                            value={commentm.rate}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarRateSharpIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <Box sx={{ ml: 2 }}>{getLabelText(commentm.rate)}</Box>
                                    </Box>
                                    <p> ความคิดเห็น : {commentm.detail}</p>
                                    <p>{dayjs(commentm.day).format('DD/MM/YYYY HH:mm:ss')}</p>
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        ))}

        </>)}

           </Stack>
   
        </div>
    )
};
