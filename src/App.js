import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Navbar from './NavBar';
import Button from '@mui/material/Button';
import { GoogleLogin, GoogleLogout, useGoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

function App() {
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
      <Navbar />
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding:5,
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ display: 'flex', flexDirection: 'column' ,width:'50ch'}}>
          <TextField id="outlined-basic" label="ชื่อ-นามสกุลจริง" variant="outlined" sx={{margin:1}}/>
          <TextField id="outlined-basic" label="Email" variant="outlined"sx={{margin:1}}>{profile.name}</TextField>
          <TextField id="outlined-basic" label="เบอร์โทร" variant="outlined" sx={{margin:1}}/>
        </div>
      </Box>
      <Button variant="contained" sx={{backgroundColor: '#07C27F'}}>เสร็จสิ้น</Button>
      
    </div>
  );
}

export default App;
