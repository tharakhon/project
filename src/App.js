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
import OrderBankUsers from './OrderBankUsers';
import Bookmark from './Bookmark';
import Changepage from './ChangPage';
import Borroww from './borrow2';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="login" element={<Login/>}/> 
        <Route path="register" element={<Register/>}/> 
        <Route path="main/:email" element={<Main12/>}/> 
        <Route path="profile/:email" element={<Profile/>}/>
        <Route path="registerbank/:email" element={<RegisterBank/>}/>
        <Route path="bank" element={<Bank/>}/>
        <Route path="bankuser" element={<BankUser/>}/>
        <Route path="openbankusers/:id" element={<OpenBankUsers/>}/>
        <Route path="addproduct" element={<Resource/>}/>
        <Route path="listbank" element={<ListBank/>}/>
        <Route path="listbankuser" element={<ListBankuser/>}/>
        <Route path="member" element={<Member/>}/>
        <Route path="orderbankusers/:id" element={<OrderBankUsers/>}/>
        <Route path="bookmark" element={<Bookmark/>}/>
        <Route path="changepage/:id" element={<Changepage/>}/>
        <Route path="borroww" element={<Borroww/>}/>
        </Routes>
      </BrowserRouter>
   
  );

}

export default App;