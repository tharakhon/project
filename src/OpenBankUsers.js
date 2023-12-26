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
    { id: 1, title: 'จอบ', titles: 'จำนวนทรัพที่เหลืออยู่ 1 ชิ้น', image: hoe, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'อุปกรณ์หรือเครื่องมือทางการเกษตรช่วยเรื่องดิน', Resourcestatus: 'ว่างสามารถให้บริการได้', },
    { id: 2, title: 'ปุ๋ย', titles: 'จำนวนทรัพที่เหลืออยู่ 10 กิโลกรัม', image: fertilizer, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางเคมี', Resourcestatus: 'ว่างสามารถให้บริการได้', },
    { id: 3, title: 'แอบเปิ้ล', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', },
    { id: 4, title: 'กล้วย', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: banana, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', },
    { id: 5, title: 'รถเกี่ยวข้าว', titles: 'จำนวนทรัพที่เหลืออยู่ 10 คัน', image: car, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'เครื่องยนต์ทางการเกษตรขนาดใหญ่', Resourcestatus: 'ว่างสามารถให้บริการได้', },
    { id: 6, title: 'ส้ม', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', },
    { id: 7, title: 'มะม่วง', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', },
    { id: 8, title: 'เสียม', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', },
    { id: 9, title: 'เคียว', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', },
    { id: 10, title: 'พั่ว', titles: 'จำนวนทรัพที่เหลืออยู่ 10 ผล', image: Apple, ServiceType: 'ทรัพยากรเพื่อเช่าหรือยืม', ResourceType: 'ทรัพยากรทางการเกษตรทางธรรมชาติ', Resourcestatus: 'ว่างสามารถให้บริการได้', },
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
                        <Button variant="contained" color="warning">ทำรายการ</Button>
                    </div>
                </>
            ) : (
                <p>Details not found.</p>
            )}
        </div>
    );
}
export default OpenBankUsers;