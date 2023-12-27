import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NavBank1 from './navbank1';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import MapShow from "./mapShow";
function Address() {
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/rank");
    }

    const handleBack = () => {
        navigate("/registerbank");
    }
    return (
        <>
            <NavBank1 />
            <h1 style={{ textAlign: 'center' }}>ปักหมุดที่อยู่ของคุณ</h1>
            <MapShow />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 2, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="filled-multiline-static"
                        label="ใส่ที่อยู่ของคุณ"
                        multiline
                        rows={6}
                        variant="filled"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Box>
            </div >
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10 }}>
                <Button variant="contained" size="large" color="error" onClick={handleBack}> ย้อนกลับ </Button>
                <Button variant="contained" size="large" color="success" onClick={handleSubmit}>เสร็จสิ้น</Button>
            </div>
        </>
    );
}
export default Address;