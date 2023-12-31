import React from "react";
import NavBarBank from "./navBarBank";
import { useLocation, useParams } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { Autocomplete, FormControl, FormHelperText, InputAdornment, MenuItem, OutlinedInput } from "@mui/material";
import Box from '@mui/material/Box';

function OrderBankUsers() {
    const { id } = useParams();
    const location = useLocation();
    const productDetails = location.state?.productDetails;
    const navigate = useNavigate();

    const handleBackbankuser = () => {
        navigate(-1);
    }

    const handleMemberbankuser = () => {
        navigate("/member");
    }

    return (
        <div>
            <NavBarBank />
            {productDetails ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ maxWidth: 345, m: 1 }} >
                            <CardMedia
                                component="img"
                                height="300"
                                image={productDetails.image}
                                title="รูปภาพทรัพยากร"
                            />
                        </Card>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginTop: 50 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                            <TextField disabled id="outlined-disabled" label="" variant="outlined" defaultValue={productDetails.title} sx={{ width: '50ch' }} />
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>เลือกประเภทบริการ :</FormLabel>
                            <TextField disabled id="outlined-disabled" label="" variant="outlined" defaultValue={productDetails.ServiceType} sx={{ width: '50ch' }} />
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            ></Box>
                            <FormLabel component="legend" style={{ color: 'black' }}>เลือกประเภททรัพยากรทางการเกษตร:</FormLabel>
                            <TextField disabled id="outlined-disabled" label="" variant="outlined" defaultValue={productDetails.ResourceType} sx={{ width: '50ch' }} />

                        </div>
                        <div style={{ marginTop: 30 }}>
                            <FormLabel component="legend" style={{ color: 'red' }}>จำนวนทรัพยากร : {productDetails.titles}</FormLabel>
                            <TextField  id="outlined-disabled" label="" variant="outlined" defaultValue='ใส่จำนวนที่ต้องการ' sx={{ width: '50ch'}} />
                        </div>

                        <div style={{ marginTop: 30 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>รายละเอียดเพิ่มเติม:</FormLabel>
                            <TextField
                                disabled
                                defaultValue={productDetails.Moredetails}
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                sx={{ width: '40ch' }} />
                        </div>

                        <div style={{ marginTop: 30 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>ราคาของทรัพยากร:</FormLabel>
                            <OutlinedInput
                                disabled
                                defaultValue={productDetails.Price}
                                id="outlined-adornment-weight"
                                endAdornment={<InputAdornment position="end">บาท</InputAdornment>}

                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant="contained" color="error" onClick={handleBackbankuser}>ย้อนกลับ</Button>
                        <Button variant="contained" color="warning">เสร็จสิ้น</Button>
                    </div>
                </>
            ) : (
                <p>Details not found.</p>
            )}
        </div>
    );
}

export default OrderBankUsers;
