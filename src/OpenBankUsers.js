import React from "react";
import NavBarBank from "./navBarBank";
import { useParams } from "react-router-dom";
import Apple from '../src/image/a.jpg';
import hoe from '../src/image/จอบ.jpg';
import fertilizer from '../src/image/ปุ๋ย.png';
import banana from '../src/image/กล้วย.jpg';
import car from '../src/image/รถเกี่ยวข้าว.png';
import { useState, useEffect } from "react";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ReactSession } from 'react-client-session';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from "@mui/material/FormGroup";


function OpenBankUsers() {
    const id = ReactSession.get("id");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`http://localhost:5000/showProductUser1/${id}`)
            .then((response) => {
                console.log("ข้อมูลที่ได้รับ:", response.data[0]);
                // Assuming response.data is an array of products
                // Choose the first product for now
                if (response.data.length > 0) {
                    setFilteredProducts(response.data[0]);
                }
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
            })

    }, []);
    const handleBackbankuser = () => {
        navigate("/bankuser");
    }
    const handleMemberbankuser = () => {
        // navigate("/member");
    }
    const handleOrderbankuser = (id) => {
        ReactSession.set("id", id)
        navigate(`/orderbankusers`);
    }
    const handleExchangePage = (id) => {
        ReactSession.set("id", id)
        navigate(`/changepage`);
    };
    return (
        <div>
            <NavBarBank />
            {filteredProducts ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ maxWidth: 345, m: 1 }} >
                            <CardMedia
                                component="img"
                                height="300"
                                image={filteredProducts.product_image}
                                title="รูปภาพทรัพยากร"
                            />
                        </Card>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                        <div style={{ marginTop: 50 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                            <TextField disabled id="outlined-disabled" label={filteredProducts.product_name} variant="outlined" sx={{ width: '50ch' }} />
                        </div>
                        <FormControl sx={{ marginTop: 5 }} component="fieldset" variant="standard">
                            <FormLabel component="legend" style={{ color: "black" }}>
                                ประเภทบริการ :
                            </FormLabel>
                            <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProducts.product_type)} />}
                                        label="ทรัพยากรเพื่อเช่าหรือยืม"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProducts.product_type2)} />}
                                        label="ทรัพยากรเพื่อการซื้อขาย"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FormControlLabel
                                        control={<Checkbox disabled checked={Boolean(filteredProducts.product_type3)} />}
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
                            <TextField disabled id="outlined-disabled" label={filteredProducts.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                        </div>

                        <div style={{ marginTop: 30 }}>
                            <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากร : </FormLabel>
                            <TextField disabled id="outlined-disabled" label={filteredProducts.product_quantity} variant="outlined" sx={{ width: '50ch' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', margin: 30 }}>
                        <Button variant="contained" color="error" onClick={handleBackbankuser}>ย้อนกลับ</Button>
                        <Button variant="contained" color="primary" onClick={handleMemberbankuser}>สมัครสมาชิก</Button>
                        {filteredProducts.product_type3 === 'ทรัพยากรเพื่อแลกเปลี่ยน' && (
                            <Button variant="contained" color="secondary" onClick={() => handleExchangePage(id)}>ไปหน้าแลกเปลี่ยน</Button>
                        )}
                        {(filteredProducts.product_type === 'ทรัพยากรเพื่อเช่าหรือยืม' || filteredProducts.product_type2 === 'ทรัพยากรเพื่อการซื้อขาย') && (
                            <Button variant="contained" color="warning" onClick={() => handleOrderbankuser(id)}>ทำรายการ</Button>
                        )}

                    </div>
                </>
            ) : (
                <p>Details not found.</p>
            )}
        </div>
    );
}
export default OpenBankUsers;