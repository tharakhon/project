import React from "react";
import NavBarLevel from "./navBarLevel";
import { Autocomplete, Button, TextField } from "@mui/material";
import Ribbon1 from "../src/image/ribbon1.png";
import Ribbon2 from "../src/image/ribbon2.png";
import Ribbon3 from "../src/image/ribbon3.png";
import Ribbon4 from "../src/image/ribbon4.png";

import { useNavigate } from "react-router-dom";


const circularImageContainer = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    overflow: 'hidden',
};
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

function Rank() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/bank");
    }
    const handleBack = () => {
        navigate("/map");
    }

    return (
        <>
            <NavBarLevel />
            <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                <img src={Ribbon1} alt="Bronze"
                    style={{ marginTop: 50, }} />
                <Autocomplete disablePortal
                    id="combo-box-demo"
                    options={ListBronze}
                    sx={{ marginTop: 9, width: 500 }}
                    renderInput={(params) => <TextField {...params} />}></Autocomplete>
            </div>
            <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                <img src={Ribbon2} alt="Silver"
                    style={{ marginTop: 100, }} />
                <Autocomplete disablePortal
                    id="combo-box-demo"
                    options={ListSilver}
                    sx={{ marginTop: 16, width: 500 }}
                    renderInput={(params) => <TextField {...params} />}></Autocomplete>
            </div>
            <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                <img src={Ribbon3} alt="Gold"
                    style={{ marginTop: 100, }} />
                <Autocomplete disablePortal
                    id="combo-box-demo"
                    options={ListGold}
                    sx={{ marginTop: 16, width: 500 }}
                    renderInput={(params) => <TextField {...params} />}></Autocomplete>
            </div>
            <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                <img src={Ribbon4} alt="Platinum"
                    style={{ marginTop: 100, }} />
                <Autocomplete disablePortal
                    id="combo-box-demo"
                    options={ListPlatinum}
                    sx={{ marginTop: 16, width: 500 }}
                    renderInput={(params) => <TextField {...params} />}></Autocomplete>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 50 }}>
                <Button variant="contained" size="large" color="error" onClick={handleBack}> ย้อนกลับ </Button>
                <Button variant="contained" size="large" color="success" onClick={handleSubmit}>เสร็จสิ้น</Button>
            </div>
        </>
    );
}
export default Rank;