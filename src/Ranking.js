import React from "react";
import NavBarLevel from "./navBarLevel";
import { Autocomplete, Button, FormLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import Ribbon1 from "../src/image/ribbon1.png";
import Ribbon2 from "../src/image/ribbon2.png";
import Ribbon3 from "../src/image/ribbon3.png";
import Ribbon4 from "../src/image/ribbon4.png";

import { useNavigate } from "react-router-dom";


function Rank() {

    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/bank");
    }
    const handleBack = () => {
        navigate("/address");
    }

    return (
        <>
            <NavBarLevel />
            <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                <img src={Ribbon1} alt="Bronze" style={{ marginTop: 60}} />
                <FormLabel component="legend" style={{ color: 'black' ,fontSize: '22px',left:50,top:70}}>Bronze</FormLabel>
                <div>
                <FormLabel component="legend" style={{ color: 'black',right:20,top:100}}>สามารถทำรายการในธนาคารทั้งหมดได้ </FormLabel>
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
                    sx={{  right:20,top:100, }}  
                />
                </div>
                
            </div>
            <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                <img src={Ribbon2} alt="Silver"
                    style={{ marginTop: 100,marginRight:7 }} />
               <FormLabel component="legend" style={{ color: 'black' ,fontSize: '22px',left:38,top:110}}>Silver</FormLabel>
                <div>
                <FormLabel component="legend" style={{ color: 'black',right:20,top:140}}>สามารถทำรายการในธนาคารทั้งหมดได้ </FormLabel>
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
                    sx={{  right:20,top:140, }}  
                />
                </div>
            </div>
            <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                <img src={Ribbon3} alt="Gold"
                    style={{ marginTop: 100,marginRight:13 }} />
                <FormLabel component="legend" style={{ color: 'black' ,fontSize: '22px',left:34,top:110}}>Gold</FormLabel>
                <div>
                <FormLabel component="legend" style={{ color: 'black',right:12,top:140}}>สามารถทำรายการในธนาคารทั้งหมดได้ </FormLabel>
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
                    sx={{  right:12,top:140, }}  
                />
                </div>
            </div>
            <div style={{ display: "flex", alignitems: "center", justifyContent: 'center', }}>
                <img src={Ribbon4} alt="Platinum"
                    style={{ marginTop: 100,marginLeft:17 }} />
                 <FormLabel component="legend" style={{ color: 'black' ,fontSize: '22px',left:58,top:110}}>Platinum</FormLabel>
                <div>
                <FormLabel component="legend" style={{ color: 'black',right:30,top:140}}>สามารถทำรายการในธนาคารทั้งหมดได้ </FormLabel>
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">รายการ</InputAdornment>}
                    sx={{  right:30,top:140, }}  
                />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 50 }}>
                <Button variant="contained" size="large" color="error" onClick={handleBack}> ย้อนกลับ </Button>
                <Button variant="contained" size="large" color="success" onClick={handleSubmit}>เสร็จสิ้น</Button>
            </div>
        </>
    );
}
export default Rank;