import React from "react";
import logo from "../src/image/Logo.png";
function NavBarLevel() {
    return (
        <div>
            <header style={{ display: 'flex', backgroundColor: '#07C27F', justifyContent:'center',}}>
                    <img src={logo} style={{ padding: 20, height: 80, width: 80, }} />
                    <h1 style={{ color: 'white', padding: 15 }}>Level Banking</h1>
            </header>
        </div>
    );
}
export default  NavBarLevel;