import React, { useState } from "react";
import NavBarBank from "./navBarBank";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { Autocomplete, FormControl, FormHelperText, InputAdornment, MenuItem, OutlinedInput } from "@mui/material";
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect } from 'react';
import Axios from "axios";
import { ReactSession } from 'react-client-session';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from "@mui/material/FormGroup";

const ProSpan = styled('span')({
    display: 'inline-block',
    height: '1em',
    width: '1em',
    verticalAlign: 'middle',
    marginLeft: '0.3em',
    marginBottom: '0.08em',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, isProOnly }) {
    const content = (
        <span>
            <strong>{componentName}</strong>
        </span>
    );

    if (isProOnly) {
        return (
            <Stack direction="row" spacing={0.5} component="span">
                <Tooltip title="Included on Pro package">
                    <a href="https://mui.com/x/introduction/licensing/#pro-plan">
                        <ProSpan />
                    </a>
                </Tooltip>
                {content}
            </Stack>
        );
    }

    return content;
}


function OrderBankUsers() {
    const id = ReactSession.get("id");
    const [selectedDate, setSelectedDate] = useState("");
    const [filteredProduct, setFilteredProduct] = useState(null);
    const navigate = useNavigate();

    const handleBackbankuser = () => {
        navigate(-1);
    }

    const handleMemberbankuser = () => {
        navigate("/member");
    }
    useEffect(() => {
        // Fetch data from the server
        Axios.get(`http://localhost:5000/showProductUser1/${id}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ:", response.data[0]);
                // Assuming response.data is an array of products
                // Choose the first product for now
                if (response.data.length > 0) {
                    setFilteredProduct(response.data[0]);
                }
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
            })
    }, []);

    return (
        <div>
            <NavBarBank />
            {filteredProduct ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ maxWidth: 345, m: 1 }} >
                            <CardMedia
                                component="img"
                                height="300"
                                image={filteredProduct.product_image}
                                title="รูปภาพทรัพยากร"
                            />
                        </Card>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginTop: 50 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                            <TextField disabled id="outlined-disabled" label="" variant="outlined" defaultValue={filteredProduct.product_name} sx={{ width: '50ch' }} />
                        </div>
                        <FormControl sx={{ marginTop: 5 }} component="fieldset" variant="standard">
                            <FormLabel component="legend" style={{ color: "black" }}>
                                ประเภทบริการ :
                            </FormLabel>
                            <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProduct.product_type)} />}
                                        label="ทรัพยากรเพื่อเช่าหรือยืม"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProduct.product_type2)} />}
                                        label="ทรัพยากรเพื่อการซื้อขาย"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProduct.product_type3)} />}
                                        label="ทรัพยากรเพื่อแลกเปลี่ยน"
                                    />
                                </div>
                            </FormGroup>
                        </FormControl>
                        <div style={{ marginTop: 20 }}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            ></Box>
                            <FormLabel component="legend" style={{ color: 'black' }}>ประเภททรัพยากรทางการเกษตร:</FormLabel>
                            <TextField disabled id="outlined-disabled" label="" variant="outlined" defaultValue={filteredProduct.product_type4} sx={{ width: '50ch' }} />

                        </div>

                        <div style={{ marginTop: 30 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>รายละเอียดเพิ่มเติม:</FormLabel>
                            <TextField
                                disabled
                                defaultValue={filteredProduct.product_details}
                                id="outlined-multiline-static"
                                sx={{ width: '50ch' }} />
                        </div>
                        <div style={{ marginTop: 30 }}>
                            {filteredProduct.product_price === '' ? null : (
                                <>
                                    <FormLabel component="legend" style={{ color: 'black' }}>ราคาของทรัพยากร:</FormLabel>
                                    <OutlinedInput
                                        disabled
                                        defaultValue={filteredProduct.product_price}
                                        id="outlined-adornment-weight"
                                        sx={{ width: '48ch' }}
                                        endAdornment={<InputAdornment position="end">บาท</InputAdornment>}
                                    />
                                </>
                            )}
                        </div>
                        <div style={{ marginTop: 5 }}>
                            <FormLabel component="legend" style={{ color: 'red' }}>จำนวนทรัพยากร : {filteredProduct.product_quantity}</FormLabel>
                            <TextField id="outlined-disabled" label="ใส่จำนวนที่ต้องการ" variant="outlined" defaultValue='' sx={{ width: '50ch' }} />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'DatePicker',
                                ]}
                            >
                                <DemoItem label={<Label componentName="วันที่ต้องการยืมทรัพยากร" valueType="date" />}>
                                    <DatePicker />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'DatePicker',
                                ]}
                            >
                                <DemoItem label={<Label componentName="วันที่ต้องการคืนทรัพยากร" valueType="date" />}>
                                    <DatePicker />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>


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
