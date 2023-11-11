import React from "react";
import logo from "../src/Logo.png";

function NavBank1() {
    return (
        <div>
            <header style={{ display: 'flex', backgroundColor: '#07C27F', justifyContent:'center',}}>
                    <img src={logo} style={{ padding: 20, height: 80, width: 80, }} />
                    <h1 style={{ color: 'white', padding: 15 }}>Banking</h1>
            </header>
        </div>
    );
}
export default NavBank1;