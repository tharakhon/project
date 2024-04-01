import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleLogin, GoogleLogout, } from 'react-google-login';
import { gapi } from 'gapi-script';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navbar from './NavBar';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import logo from '../src/image/Logo.png';
import Swal from 'sweetalert2';



function Register() {

  const clientId = "80445697984-hft4hh6kkictok8q22lm89nunm1l8vt7.apps.googleusercontent.com"

  const [flag, setflag] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [userList, setUserList] = useState([]);
  const [fullname, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [userImage, setUserImage] = useState(null);
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient)
  }, [])

  const onSuccess = (res) => {
    setProfile(res.profileObj)
    console.log('success', res.profileObj)
    setflag(true);


  }

  const onFailure = (res) => {
    console.log('failed', res)
  }

  const logOut = () => {
    setProfile(null);
    setflag(false);
  }

  useEffect(() => {

    console.log(email);

    Axios.get(`http://localhost:5000/readimage/${email}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data[0].email);
        // Assuming the image data is present in the response data
        setUserImage(response.data[0].image);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [email]);
  const addUser = () => {

    if (fullname.trim() === '' || tel.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        text: 'โปรดกรอกข้อมูลให้ครบทุกช่อง',
      });
      return;
    }

    if (tel.length < 9 || tel.length > 10) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ถูกต้อง',
        text: 'เบอร์โทรศัพท์ต้องมีความยาวระหว่าง 9 ถึง 10 ตัว',
      });
      return; 
    }

    Swal.fire({
      title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("http://localhost:5000/create", {
          image: profile.imageUrl,
          email: profile.email,
          fullname: fullname,
          tel: tel,
        }).then(() => {
          setUserList([
            ...userList,
            {
              image: profile.imageUrl,
              email: email,
              fullname: fullname,
              tel: tel,
            },
          ]);
          navigate(`/`);
          Swal.fire({
            icon: 'success',
            title: 'บันทึกเรียบร้อยแล้ว',
            showConfirmButton: false,
            timer: 1500
          });
        }).catch(error => {
          console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองอีกครั้ง',
          });
        });
      }
    });
  };


  return (
    <div>
      {flag ? (
        <div>
          <Navbar />
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 5,
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ display: 'flex', flexDirection: 'column', width: '50ch' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={profile.imageUrl} style={{ width: '30ch', height: '25ch', marginBottom: 10 }} />
              </div>
              <TextField
                required
                id="outlined-required"
                label="Name"
                defaultValue=''
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              />
              <br />
              <TextField
                disabled
                id="outlined-disabled"
                label="Email"
                defaultValue={profile.email}
              />
              <br />
              <TextField
                required
                id="outlined-required"
                label="Tel"
                value={tel}
                onChange={(event) => {
                  if (!isNaN(event.target.value)) {
                    if (event.target.value.length <= 10) {
                      setTel(event.target.value);
                    }
                  }
                }}
                inputProps={{ pattern: "[0-9]*" }}
              />
            </div>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <GoogleLogout clientId={clientId} buttonText='LOG OUT' onLogoutSuccess={logOut} />
            <Button variant="contained" sx={{ backgroundColor: '#07C27F' }} onClick={addUser} >บันทึกข้อมูล</Button>
          </div>
        </div>
      ) : (<div className="App">
        <header className="App-header">
          <img src={logo} alt="โลโก้แอพ" style={{ width: 400 }} />
          <GoogleLogin
            clientId={clientId}
            buttonText='LOG IN WITH GOOGLE'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{
                  backgroundColor: '#f90101', /* เปลี่ยนสีพื้นหลังเป็นสีแดง*/
                  color: '#ffffff', /*เปลี่ยนสีตัวอักษรเป็นสีขาว*/
                  fontSize: '20px', /* เปลี่ยนขนาดตัวอักษร*/
                  width: '600px', /* กำหนดความกว้าง */
                  height: '75px', /* กำหนดความสูง */
                  margin: '50px', /*กำหนดระยะห่าง */
                  cursor: 'pointer', /* ทำให้เมาส์เป็นรูปแบบของมือ*/
                }}
              >
                สมัครเข้าสู่ระบบด้วยบัญชี google
              </button>
            )}
          />
        </header>
      </div>
      )}
    </div>
  );
}

export default Register;