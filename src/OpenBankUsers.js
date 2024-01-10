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
const productsData = [
    { id: 1, title: 'จอบ', titles: 'เหลืออยู่ 1 ชิ้น', image: hoe, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'อุปกรณ์หรือเครื่องมือทางการเกษตรช่วยเรื่องดิน', Resourcestatus: 'ว่างสามารถให้บริการได้', Price:'0',Moredetails:'ไม่มี'},
    { id: 2, title: 'ปุ๋ย', titles: 'เหลืออยู่ 10 กิโลกรัม', image: fertilizer, ServiceType: 'ทรัพยากรเพื่อแลกเปลี่ยน', ResourceType: 'ทรัพยากรทางการเกษตรทางเคมี', Resourcestatus: 'ว่างสามารถให้บริการได้', Price:'50' ,Moredetails:'สามารถขายแบ่งเป็นขีดๆได้หรือเป็นกิโลก็ได้'},
    { id: 3, title: 'แอบเปิ้ล', titles: 'เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', Price:'30' ,Moredetails:'สามารถขายแบ่งเป็นขีดๆได้หรือเป็นกิโลก็ได้'},
    { id: 4, title: 'กล้วย', titles: 'เหลืออยู่ 10 ผล', image: banana, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', Price:'30' ,Moredetails:'สามารถขายแบ่งเป็นขีดๆได้หรือเป็นกิโลก็ได้'},
    { id: 5, title: 'รถเกี่ยวข้าว', titles: 'เหลืออยู่ 10 คัน', image: car, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'เครื่องยนต์ทางการเกษตรขนาดใหญ่', Resourcestatus: 'ว่างสามารถให้บริการได้', Price:'0' ,Moredetails:'ไม่มี'},
    { id: 6, title: 'ส้ม', titles: 'เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', Price:'30' ,Moredetails:'สามารถขายแบ่งเป็นขีดๆได้หรือเป็นกิโลก็ได้'},
    { id: 7, title: 'มะม่วง', titles: 'เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', Price:'30',Moredetails:'ไม่มี'},
    { id: 8, title: 'เสียม', titles: 'เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', Price:'0',Moredetails:'ไม่มี' },
    { id: 9, title: 'เคียว', titles: 'เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', Price:'0',Moredetails:'ไม่มี'},
    { id: 10, title: 'พั่ว', titles: 'เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', Price:'0' ,Moredetails:'ไม่มี'},
];
function OpenBankUsers() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            // Assuming the API fetch returns an object with details
            const details = productsData.find((product) => product.id === Number(id));

            if (details) {
                setProductDetails(details);
            }

            setLoading(false);
        };

        fetchData();
    }, [id]);
    const handleBackbankuser = () => {
        navigate("/bankuser");
    }
    const handleMemberbankuser = () => {
        navigate("/member");
    }
    const handleOrderbankuser = (id) => {
        navigate(`/orderbankusers/${id}`, { state: { productDetails } });
    }
    const handleExchangePage = () => {
        navigate(`/changepage/${id}`, { state: { productDetails } }); // Change "/exchangePage" to the desired route
    };
    return (
        <div>
            <NavBarBank />
            {loading ? (
                <p>Loading...</p>
            ) : productDetails ? (
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
                    <div style={{display:'flex',justifyContent:'center', textAlign: 'center' }}>
                        <Card sx={{ maxWidth: 600, m: 1 }} >
                            <Typography variant="h4">{productDetails.title}</Typography>
                            <Typography variant="h6">ประเภทบริการ : {productDetails.ServiceType}</Typography>
                            <Typography variant="h6">ประเภททรัพยากรทางการเกษตร: {productDetails.ResourceType}</Typography>
                            <Typography variant="h6">สถานะของทรัพยากร : {productDetails.Resourcestatus}</Typography>
                            <Typography variant="h6">จำนวนทรัพยากรที่เหลืออยู่ : {productDetails.titles}</Typography>
                        </Card>


                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant="contained" color="error" onClick={handleBackbankuser}>ย้อนกลับ</Button>
                        <Button variant="contained" color="primary" onClick={handleMemberbankuser}>สมัครสมาชิก</Button>
                        {productDetails.ServiceType === 'ทรัพยากรเพื่อแลกเปลี่ยน' && (
                            <Button variant="contained" color="secondary" onClick={handleExchangePage}>ไปหน้าแลกเปลี่ยน</Button>
                        )}
                        <Button variant="contained" color="warning" onClick={handleOrderbankuser}>ทำรายการ</Button>
                    </div>
                </>
            ) : (
                <p>Details not found.</p>
            )}
        </div>
    );
}
export default OpenBankUsers;