import React from "react";
import NavbarProfile from "./navBarprofile";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Autocomplete, FormLabel, InputAdornment, OutlinedInput } from "@mui/material";
import Mapshow from './mapShow';
import { ReactSession } from 'react-client-session';
import Axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Swal from 'sweetalert2';

function ListBankuser() {
    const [profile, setProfile] = useState();
    const username = ReactSession.get('username');
    const codename = ReactSession.get("codename");
    const bank_name = ReactSession.get("bank_name");
    const [email, setEmail] = useState();
    const [tel, setTel] = useState("");
    const [flag, setflag] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [filterProduct, setFilterProduct] = useState([])
    const [originalData, setOriginalData] = useState({});
   
    useEffect(() => {
        Axios.get(`http://localhost:5000/ShowBank/${bank_name}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ ShowBank :", response.data);
                setFilterProduct(response.data[0]);
                setOriginalData(response.data[0]);
            })
    }, [filterProduct, bank_name])
    const handleBack = () => {
      navigate(-1);
    }
   
    return (
        <>
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
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 345, m: 1 }}>
                        <CardMedia
                            component="img"
                            sx={{ height: 300 }}
                            image={`http://localhost:5000/image/${filterProduct.bank_image}`}
                            alt="รูป user"
                        />
                    </Card>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50ch' }}>
                    <TextField
                    disabled
                        id="outlined-required"
                        label={filterProduct.bank_name}
                        variant="outlined"
                        sx={{ margin: 1 }}
                    />

                    <TextField
                        disabled
                        id="outlined-disabled"
                        variant="outlined"
                        sx={{ margin: 1 }}
                        value={filterProduct.bank_email} // ใช้ value แทน defaultValue
                    />

                    <TextField
                    disabled
                        id="outlined-basic"
                        label={filterProduct.bank_telephone}
                        variant="outlined"
                        sx={{ margin: 1 }}
                    />
                </div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 2, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                    disabled
                        id="filled-multiline-static"
                        label={filterProduct.bank_address}
                        multiline
                        rows={6}
                        variant="outlined"
                    />
                </Box>
                <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                    <img src={`http://localhost:5000/image/ribbon1.png`} alt="Bronze"
                        style={{ marginTop: 50, width: 100 }} />
                    <FormLabel component="legend" style={{ color: 'black', fontSize: '22px', left: 50, top: 70 }}>Bronze</FormLabel>
                    <div>
                        <FormLabel component="legend" style={{ color: 'black', right: 20, top: 100 }}>สามารถทำรายการเช่ายืมได้ทั้งหมด </FormLabel>
                        <OutlinedInput
                        disabled
                            id="outlined-adornment-weight"
                            value={filterProduct.bank_bronze}
                            endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
                            sx={{ right: 20, top: 100, }}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                    <img src={`http://localhost:5000/image/ribbon2.png`} alt="Silver"
                        style={{ marginTop: 75, width: 100 }} />
                    <FormLabel component="legend" style={{ color: 'black', fontSize: '22px', left: 50, top: 70 }}>Bronze</FormLabel>
                    <div>
                        <FormLabel component="legend" style={{ color: 'black', right: 20, top: 100 }}>สามารถทำรายการเช่ายืมได้ทั้งหมด </FormLabel>
                        <OutlinedInput
                        disabled
                            id="outlined-adornment-weight"
                            value={filterProduct.bank_silver}
                            endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
                            sx={{ right: 20, top: 100, }}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                    <img src={`http://localhost:5000/image/ribbon3.png`} alt="Gold"
                        style={{ marginTop: 75, width: 100 }} />
                    <FormLabel component="legend" style={{ color: 'black', fontSize: '22px', left: 50, top: 70 }}>Bronze</FormLabel>
                    <div>
                        <FormLabel component="legend" style={{ color: 'black', right: 20, top: 100 }}>สามารถทำรายการเช่ายืมได้ทั้งหมด </FormLabel>
                        <OutlinedInput
                        disabled
                            id="outlined-adornment-weight"
                            value={filterProduct.bank_gold}
                            endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
                            sx={{ right: 20, top: 100, }}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                    <img src={`http://localhost:5000/image/ribbon4.png`} alt="Platinum"
                        style={{ marginTop: 75, width: 100 }} />
                    <FormLabel component="legend" style={{ color: 'black', fontSize: '22px', left: 50, top: 70 }}>Bronze</FormLabel>
                    <div>
                        <FormLabel component="legend" style={{ color: 'black', right: 20, top: 100 }}>สามารถทำรายการเช่ายืมได้ทั้งหมด </FormLabel>
                        <OutlinedInput
                        disabled
                            id="outlined-adornment-weight"
                            value={filterProduct.bank_platinum}
                            endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
                            sx={{ right: 20, top: 100, }}
                        />
                    </div>
                </div>
            </Box>
            <Mapshow/>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 50 }}>
                <Button variant="contained" size="large" color="error" onClick={handleBack}> ย้อนกลับ </Button>
            </div>
        </>
    );
}
export default ListBankuser;