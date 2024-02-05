import React, { useEffect } from "react";
import NavBarBank from "./navBarBank";
import { Avatar, Box, Card, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Rating, Select, Stack, Typography } from "@mui/material";
import { grey, orange, pink, yellow } from "@mui/material/colors";
import StarRateSharpIcon from '@mui/icons-material/StarRateSharp';

const textStyle = {
    color: 'black',
    fontSize: '60px',
    fontWeight: 'normal',
  };
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

export default function Review(){

    const [star, setStar] = React.useState('');

    const handleChange = (event) => {
        setStar(event.target.value);
    };

    const [value, setValue] = React.useState(5);
    const [hover, setHover] = React.useState(-1);

    

    return(

        <div>

            <NavBarBank/>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={textStyle}>ความคิดเห็นของธนาคาร</h1>
            <Box
            sx={{
                width: 500,
                display: 'flex',
                alignItems: 'center',}}>
                <Box sx={{ marginRight: 5 , fontSize:'40px'}}>5.0</Box>
                <Rating name="half-rating-read" defaultValue={5.0} precision={0.5} sx={{fontSize: 50}} readOnly/>
            </Box>
            <Box sx={{ marginTop:5,marginRight: 7 , fontSize:'25px'}}>3 ความคิดเห็น</Box>
          

            </div>
            <Box sx={{ minWidth: 120,marginLeft:4,marginTop:5 }}>
            <FormControl sx={{width:250}}>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={star}
                label="Sort by"
                onChange={handleChange}
                >
                <MenuItem value={10}>ล่าสุด</MenuItem>
                <MenuItem value={30}>ดาวมากไปน้อย</MenuItem>
                <MenuItem value={40}>ดาวน้อยไปมาก</MenuItem>
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

           <List   sx={{ border:1,padding:3,width: '100%', bgcolor:grey[200]}}>
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: yellow[700] }}>ป</Avatar>
            </ListItemAvatar>
            <ListItemText
            primary="ปอนด์เทพซ่า"
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
                        value={value}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarRateSharpIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                </Box>
                    <p> ความคิดเห็น : การให้บริการดีมากๆ มีให้ครบทุกอย่าง</p>
                </Typography >
                
                
                </React.Fragment>
            }
            />
            </ListItem>
           </List>
           
           <List   sx={{ border:1,padding:3,width: '100%', bgcolor:grey[200]}}>
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar sx={{ bgcolor:orange[700] }}>ป</Avatar>
            </ListItemAvatar>
            <ListItemText
            primary="ปอนด์พารวย"
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
                        value={value}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarRateSharpIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                    </Box>
                    <p> ความคิดเห็น : การให้บริการดีมากๆ มีให้ครบทุกอย่าง</p>
                </Typography >

                
                </React.Fragment>
            }
            />
            </ListItem>
           </List>

           <List   sx={{ border:1,padding:3,width: '100%', bgcolor:grey[200]}}>
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: pink[500] }}>อ</Avatar>
            </ListItemAvatar>
            <ListItemText
            primary="ไอยูเลิฟวิน"
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
                        value={value}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarRateSharpIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                    </Box>
                    <p> ความคิดเห็น : การให้บริการดีมากๆ มีให้ครบทุกอย่าง</p>
                </Typography >

                
                </React.Fragment>
            }
            />
            </ListItem>
           </List>
           </Stack>

            
                    

        </div>
    )


};
