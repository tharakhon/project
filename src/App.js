import React from 'react';
import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main12 from './main1';
import Profile from './profile';
import Register from './register';
import RegisterBank from './registerBank';
import Bank from './ฺBank';
import BankUser from './BankUser';
import OpenBankUsers from './OpenBankUsers';
import Resource from './Makeresource';
import Rank from './Ranking';
import ListBank from './ListBank';
import ListBankuser from './ListBankUser';
import Member from './membank';
import Address from './Address';

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
        <Route path="address" element={<Address/>}/>
        <Route path="bankuser" element={<BankUser/>}/>
        <Route path="openbankusers/:id" element={<OpenBankUsers/>}/>
        <Route path="addproduct" element={<Resource/>}/>
        <Route path="rank" element={<Rank/>}/>
        <Route path="listbank" element={<ListBank/>}/>
        <Route path="listbankuser" element={<ListBankuser/>}/>
        <Route path="member" element={<Member/>}/>
        </Routes>
      </BrowserRouter>
   
  );

}

export default App;