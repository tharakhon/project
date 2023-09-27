import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleLogin, GoogleLogout, useGoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Navbar from './NavBar';
import Button from '@mui/material/Button';

function Login() {

    const clientId = "80445697984-hft4hh6kkictok8q22lm89nunm1l8vt7.apps.googleusercontent.com"

    const [profile, setProfile] = useState([]);

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
        console.log('success', res)
    }

    const onFailure = (res) => {
        console.log('failed', res)
    }

    const logOut = () => {
        setProfile(null);
    }

    return (
        <div>
            {profile ? (
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
                            <TextField

                                id="outlined-required"
                                label="Name"
                                defaultValue={profile.name}
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
                                id="outlined-required"
                                label="Tel"
                                defaultValue=" "
                            />
                        </div>
                    </Box>
                    <Button variant="contained" sx={{ backgroundColor: '#07C27F' }}>เสร็จสิ้น</Button>
                    <GoogleLogout clientId={clientId} buttonText='LOG OUT' onLogoutSuccess={logOut} />
                </div>
            ) : (<div className="App">
                <header className="App-header">
                    <img src="https://cdn.pic.in.th/file/picinth/368067465_2030957793916000_1185052255972145640_n-1.png" alt="โลโก้แอพ" />
                    <GoogleLogin
                        clientId={clientId}
                        buttonText='LOG IN WITH GOOGLE'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
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
                                LOG IN WITH GOOGLE
                            </button>
                        )}
                    />
                </header>
            </div>
            )}
        </div>
    );
}

export default Login;