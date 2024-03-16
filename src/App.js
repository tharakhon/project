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
import ListBank from './ListBank';
import ListBankuser from './ListBankUser';
import Member from './membank';
import OrderBankUsers from './OrderBankUsers';
import Changepage from './ChangPage';
import Borroww from './borrow2';
import Review from './review';
import OpenBank from './openBank';
import Notifications from './Notifications';
import OrderBankSale from './OrderBankSales';
import AllReviewcstom from './Allreviewcustom';
import Reviewcustom from './writecomment';
import Reviewbank from './writereview';
import ReviewbankChage from './writereviewChage';
import ReviewbankSale from './writereviewSale';

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
        <Route path="bankuser" element={<BankUser/>}/>
        <Route path="openbankusers" element={<OpenBankUsers/>}/>
        <Route path="addproduct" element={<Resource/>}/>
        <Route path="listbank" element={<ListBank/>}/>
        <Route path="listbankuser" element={<ListBankuser/>}/>
        <Route path="member" element={<Member/>}/>
        <Route path="orderbankusers" element={<OrderBankUsers/>}/>
        <Route path="changepage" element={<Changepage/>}/>
        <Route path="borroww" element={<Borroww/>}/>
        <Route path="review" element={<Review/>}/>
        <Route path="openbank" element={<OpenBank/>}/>
        <Route path="notifications" element={<Notifications/>}/>
        <Route path="orderbankusersale" element={<OrderBankSale/>}/>
        <Route path="allreviewcstom" element={<AllReviewcstom/>}/>
        <Route path="reviewcustom" element={<Reviewcustom/>}/>
        <Route path="reviewbank" element={<Reviewbank/>}/>
        <Route path="reviewbankchage" element={<ReviewbankChage/>}/>
        <Route path="reviewbanksale" element={<ReviewbankSale/>}/>
        </Routes>
      </BrowserRouter>
   
  );

}

export default App;