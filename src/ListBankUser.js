import React from "react";
import NavbarProfile from "./navBarprofile";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Ribbon1 from "../src/image/ribbon1.png";
import Ribbon2 from "../src/image/ribbon2.png";
import Ribbon3 from "../src/image/ribbon3.png";
import Ribbon4 from "../src/image/ribbon4.png";
import { Autocomplete} from "@mui/material";
import MapShow from "./mapShow";
const ListBronze = [
    { label: 'สามารถทำรายการทั้งหมดได้ 1 รายการ' },
    { label: 'สามารถทำรายการเช่าหรือยืมได้ 1 รายการ' },
    { label: 'สามารถทำรายการแลกเปลี่ยนด้ 1 รายการ' },
    { label: 'สามารถทำรายการซื้อขายได้ 1 รายการ' },
]
const ListSilver = [
    { label: 'สามารถทำรายการทั้งหมดได้ 2 รายการ' },
    { label: 'สามารถทำรายการเช่าหรือยืมได้ 2 รายการ' },
    { label: 'สามารถทำรายการแลกเปลี่ยนด้ 2 รายการ' },
    { label: 'สามารถทำรายการซื้อขายได้ 2 รายการ' },
]
const ListGold = [
    { label: 'สามารถทำรายการทั้งหมดได้ 3 รายการ' },
    { label: 'สามารถทำรายการเช่าหรือยืมได้ 3 รายการ' },
    { label: 'สามารถทำรายการแลกเปลี่ยนด้ 3 รายการ' },
    { label: 'สามารถทำรายการซื้อขายได้ 3 รายการ' },
]
const ListPlatinum = [
    { label: 'สามารถทำรายการทั้งหมดได้ไม่จำกัด' },
    { label: 'สามารถทำรายการเช่าหรือยืมได้ 4 รายการ' },
    { label: 'สามารถทำรายการแลกเปลี่ยนด้ 4 รายการ' },
    { label: 'สามารถทำรายการซื้อขายได้ 4 รายการ' },
]
function ListBankuser() {
    const [profile, setProfile] = useState();
    const [email, setEmail] = useState();
    const [tel, setTel] = useState("");
    const [flag, setflag] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
            setImage(selectedImage);
            const imageUrl = URL.createObjectURL(selectedImage);
            setImagePreview(imageUrl);
        }
    };
    const handleSubmit = () => {
        navigate("/bankuser");
    }
    const handleBack = () => {
        navigate("/bankuser");
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
                <div style={{ display: 'flex', flexDirection: 'column', width: '50ch' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        {imagePreview ? (
                            <div >
                                <img
                                    src={imagePreview}
                                    alt="Selected"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        sx={{ margin: 1 }}
                                    >
                                        Upload Image
                                    </Button>
                                </label>
                            </div>
                        )}
                    </div>
                    <TextField
                        id="outlined-required"
                        label="ชื่อธนาคาร"
                        variant="outlined"
                        sx={{ margin: 1 }}
                        value={profile} // ใช้ value แทน defaultValue
                        onChange={(event) => setProfile(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Email"
                        variant="outlined"
                        sx={{ margin: 1 }}
                        value={email} // ใช้ value แทน defaultValue
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Tel"
                        variant="outlined"
                        sx={{ margin: 1 }}
                        value={tel} // ใช้ค่าของ state tel
                        onChange={(event) => setTel(event.target.value)} // อัปเดต state เมื่อมีการเปลี่ยนแปลง
                    />

                    {/* ในส่วนของเบอร์โทร คุณอาจต้องสร้าง state และใช้ value ใน TextField เช่นเดียวกัน */}
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
                        label="ที่อยู่ของธนาคาร"
                        multiline
                        rows={6}
                        variant="filled"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Box>
                <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                    <img src={Ribbon1} alt="Bronze"
                        style={{ marginTop: 50, width:100}} />
                    <Autocomplete disablePortal
                        id="combo-box-demo"
                        options={ListBronze}
                        sx={{ marginTop: 9, width: 350 }}
                        renderInput={(params) => <TextField {...params} />}></Autocomplete>
                </div>
                <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                    <img src={Ribbon2} alt="Silver"
                        style={{ marginTop: 75, width:100 }} />
                    <Autocomplete disablePortal
                        id="combo-box-demo"
                        options={ListSilver}
                        sx={{ marginTop: 12, width: 350 }}
                        renderInput={(params) => <TextField {...params} />}></Autocomplete>
                </div>
                <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                    <img src={Ribbon3} alt="Gold"
                        style={{ marginTop: 75, width:100 }} />
                    <Autocomplete disablePortal
                        id="combo-box-demo"
                        options={ListGold}
                        sx={{ marginTop: 12, width: 350 }}
                        renderInput={(params) => <TextField {...params} />}></Autocomplete>
                </div>
                <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                    <img src={Ribbon4} alt="Platinum"
                        style={{ marginTop: 75, width:100 }} />
                    <Autocomplete disablePortal
                        id="combo-box-demo"
                        options={ListPlatinum}
                        sx={{ marginTop: 12, width: 350 }}
                        renderInput={(params) => <TextField {...params} />}></Autocomplete>
                </div>
            </Box>
            <MapShow/>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 50 }}>
                <Button variant="contained" size="large" color="error" onClick={handleBack}> ย้อนกลับ </Button>
                <Button variant="contained" size="large" color="success" onClick={handleSubmit}>ถัดไป</Button>
            </div>
        </>
    );
}
export default ListBankuser;