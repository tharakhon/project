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
        ReactSession.set("id",id)
        navigate(`/orderbankusers`);
    }
    const handleExchangePage = (id) => {
        ReactSession.set("id",id)
        navigate(`/changepage`);
    };
    return (
        <div>
            <NavBarBank />
            { filteredProducts ? (
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
                    <div style={{display:'flex',justifyContent:'center', textAlign: 'center' }}>
                        <Card sx={{ maxWidth: 600, m: 1 }} >
                            <Typography variant="h4">{filteredProducts.product_name}</Typography>
                            <Typography variant="h6">ประเภทบริการ1 : {filteredProducts.product_type}</Typography>
                            <Typography variant="h6">ประเภทบริการ2 : {filteredProducts.product_type2}</Typography>
                            <Typography variant="h6">ประเภทบริการ3 : {filteredProducts.product_type3}</Typography>
                            <Typography variant="h6">ประเภททรัพยากรทางการเกษตร: {filteredProducts.product_type4}</Typography>
                            <Typography variant="h6">จำนวนทรัพยากรที่เหลืออยู่ : {filteredProducts.product_quantity}</Typography>
                        </Card>


                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant="contained" color="error" onClick={handleBackbankuser}>ย้อนกลับ</Button>
                        <Button variant="contained" color="primary" onClick={handleMemberbankuser}>สมัครสมาชิก</Button>
                        {filteredProducts.product_type3 === 'ทรัพยากรเพื่อแลกเปลี่ยน' && (
                            <Button variant="contained" color="secondary" onClick={() => handleExchangePage(id)}>ไปหน้าแลกเปลี่ยน</Button>
                        )}
                        <Button variant="contained" color="warning" onClick={() => handleOrderbankuser(id)}>ทำรายการ</Button>
                    </div>
                </>
            ) : (
                <p>Details not found.</p>
            )}
        </div>
    );
}
export default OpenBankUsers;