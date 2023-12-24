import React from 'react';
import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main12 from './main1';
import Profile from './profile';
import Register from './register';
import RegisterBank from './registerBank';
import Bank from './ฺBank';
import MapShow from './mapShow';
import BankUser from './BankUser';
import OpenBankUsers from './OpenBankUsers';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="login" element={<Login/>}/> 
        <Route path="register" element={<Register/>}/> 
        <Route path="main" element={<Main12/>}/> 
        <Route path="profile" element={<Profile/>}/>
        <Route path="registerbank" element={<RegisterBank/>}/>
        <Route path="bank" element={<Bank/>}/>
        <Route path="map" element={<MapShow/>}/>
        <Route path="bankuser" element={<BankUser/>}/>
        <Route path="openbankusers" element={<OpenBankUsers/>}/>
        </Routes>
      </BrowserRouter>
   
  );

}

export default App;