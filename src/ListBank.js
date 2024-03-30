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

function ListBank() {
    const [profile, setProfile] = useState('');
    const username = ReactSession.get('username');
    const codename = ReactSession.get("codename");
    const bank_name = ReactSession.get("bank_name");
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState("");
    const [imagePreview, setImagePreview] = useState('');
    const [bronze, setBronze] = useState('');
    const [silver, setSilver] = useState('');
    const [gold, setGold] = useState('');
    const [platinum, setPlatinum] = useState('');
    const [address, setAddress] = useState('');
    const [originalData, setOriginalData] = useState([]); 
    const navigate = useNavigate();
    useEffect(() => {
        Axios.get(`http://localhost:5000/ShowBank/${bank_name}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ ShowBank :", response.data);
                setProfile(response.data[0].bank_name);
                setEmail(response.data[0].bank_email);
                setTel(response.data[0].bank_telephone);
                setAddress(response.data[0].bank_address);
                setImagePreview(response.data[0].bank_image);
                setBronze(response.data[0].bank_bronze);
                setSilver(response.data[0].bank_silver);
                setGold(response.data[0].bank_gold);
                setPlatinum(response.data[0].bank_platinum)
                setOriginalData(response.data[0]);
            })
    }, [bank_name])
    const handleBack = () => {
        const isDataModified = profile !== "" || tel !== "" || address !== "";

        if (isDataModified) {
            Swal.fire({
                icon: 'question',
                title: 'คุณต้องการบันทึกข้อมูลที่แก้ไขหรือไม่?',
                text: 'ข้อมูลที่แก้ไขจะไม่ถูกบันทึกหากคุณเลือกย้อนกลับโดยไม่บันทึก',
                showCancelButton: true,
                confirmButtonText: 'บันทึก',
                cancelButtonText: 'ไม่บันทึก',
            }).then((result) => {
                if (result.isConfirmed) {
                    handleSaveData();
                } else {
                    ReactSession.set('username', username);
                    ReactSession.set("codename", codename);
                    ReactSession.set("bank_name", bank_name);
                    navigate(-1);
                }
            });
        } else {
            navigate(-1);
        }
    }
    const handleSaveData = () => {
        const data = {
            bank_name: profile,
            bank_telephone: tel,
            bank_address: address
        };

        Swal.fire({
            title: 'ยืนยันการบันทึกข้อมูล',
            text: 'คุณแน่ใจหรือไม่ที่ต้องการบันทึกข้อมูล?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ใช่, ฉันต้องการบันทึก',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                //ตรวจสอบว่ามีการเปลี่ยนแปลงข้อมูลหรือไม่
                const isDataModified = profile !== originalData.bank_name || tel !== originalData.bank_telephone || address !== originalData.bank_address;


                if (isDataModified) {
                    Axios.post(`http://localhost:5000/saveBankData/${bank_name}`, data)
                        .then(response => {
                            console.log("บันทึกข้อมูลสำเร็จ");
                            ReactSession.set('username', username);
                            ReactSession.set("codename", codename);
                            ReactSession.set("bank_name", bank_name);
                            Swal.fire({
                                title: 'บันทึกข้อมูลสำเร็จ',
                                text: 'ข้อมูลของคุณถูกบันทึกแล้ว',
                                icon: 'success',
                                confirmButtonText: 'ตกลง'
                            }).then(() => {
                                ReactSession.set('username', username);
                                ReactSession.set("codename", codename);
                                ReactSession.set("bank_name", bank_name);
                                navigate(-1);
                            });
                        })
                        .catch(error => {
                            console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
                            Swal.fire({
                                title: 'เกิดข้อผิดพลาด',
                                text: 'ไม่สามารถบันทึกข้อมูลได้',
                                icon: 'error',
                                confirmButtonText: 'ตกลง'
                            });
                        });
                } else {
                    // ถ้าไม่มีการเปลี่ยนแปลงในข้อมูล
                    Swal.fire({
                        title: 'ไม่มีการเปลี่ยนแปลงข้อมูล',
                        text: 'ไม่มีข้อมูลใหม่ที่ต้องบันทึก',
                        icon: 'info',
                        confirmButtonText: 'ตกลง'
                    });
                }
            }
        });
    };

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
                            image={`http://localhost:5000/image/${imagePreview}`}
                            alt="รูป user"
                        />
                    </Card>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50ch' }}>
                    <TextField
                        id="outlined-required"
                        label="ชื่อธนาคาร"
                        variant="outlined"
                        sx={{ margin: 1 }}
                        value={profile}
                        onChange={(event) => setProfile(event.target.value)}
                    />

                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="อีเมลล์"
                        variant="outlined"
                        sx={{ margin: 1 }}
                        value={email}
                    />

                    <TextField
                        id="outlined-basic"
                        label="เบอร์โทร"
                        variant="outlined"
                        sx={{ margin: 1 }}
                        value={tel} // ใช้ค่าของ state tel
                        onChange={(event) => setTel(event.target.value)}
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
                        id="filled-multiline-static"
                        label="ที่อยู่"
                        multiline
                        rows={6}
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Box>
                <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                    <img src={`http://localhost:5000/image/ribbon1.png`} alt="Bronze"
                        style={{ marginTop: 50, width: 100 }} />
                    <FormLabel component="legend" style={{ color: 'black', fontSize: '22px', left: 50, top: 70 }}>Bronze</FormLabel>
                    <div>
                        <FormLabel component="legend" style={{ color: 'black', right: 20, top: 100 }}>สามารถทำรายการเช่ายืมได้ทั้งหมด </FormLabel>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            value={bronze}
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
                            id="outlined-adornment-weight"
                            value={silver}
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
                            id="outlined-adornment-weight"
                            value={gold}
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
                            id="outlined-adornment-weight"
                            value={platinum}
                            endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
                            sx={{ right: 20, top: 100, }}
                        />
                    </div>
                </div>
            </Box >
            <Mapshow />
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 50 }}>
                <Button variant="contained" size="large" color="error" onClick={handleBack}> ย้อนกลับ </Button>
                <Button variant="contained" size="large" color="error" onClick={handleSaveData}> บันทึกข้อมูล </Button>
            </div>
        </>
    );
}
export default ListBank;