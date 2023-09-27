import React from "react";
import NavbarProfile from "./navBarprofile";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
function Profile(){
    return (
        <div>
            <NavbarProfile />
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 5,
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{ display: 'flex', flexDirection: 'column', width: '50ch' }}>
                    <TextField id="outlined-basic" label="ชื่อ-นามสกุลจริง" variant="outlined" sx={{ margin: 1 }} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ margin: 1 }}></TextField>
                    <TextField id="outlined-basic" label="เบอร์โทร" variant="outlined" sx={{ margin: 1 }} />
                </div>
            </Box>
            <div style={{display:'flex',justifyContent:'space-between',margin:10}}>
            <Button variant="contained" color='error' sx={{top:300}}>ย้อนกลับ</Button>
            <Button variant="contained" color='success' sx={{ backgroundColor: '#07C27F',top:300}}>เสร็จสิ้น</Button>
            </div>
        </div>
    );
}
export default Profile;