import React from "react";
import Navbar1 from "./NavBar1";
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import Button from '@mui/material/Button';
function Main12(){
    return (
        <div>

            <Navbar1/>
            <div style={{display:'flex',margin:20,justifyContent:'space-between'}}>
            <FilterAltSharpIcon fontSize='large' color='info'  />
            <Button variant='contained' sx={{borderRadius:20,backgroundColor:'#D62828',color: 'white'}}>สร้างธนาคาร</Button></div>
        </div>
    );
}
export default Main12;