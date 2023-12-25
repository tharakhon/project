import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NavBank1 from './navbank1';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export let longdo;
export let map;

const LongdoMap = (props) => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');

    const mapCallback = () => {
        longdo = window.longdo;
        map = new window.longdo.Map({
            placeholder: document.getElementById(props.id),
            language: 'th',
        });
        var marker1 = new longdo.Marker({ lon: 101.2, lat: 12.8 },
            {
              title: 'Marker',
              icon: {
                url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
                offset: { x: 12, y: 45 }
              },
              detail: 'Drag me',
              visibleRange: { min: 2, max: 100 },
              draggable: true,
              weight: longdo.OverlayWeight.Top,
            });
            map.Overlays.add(marker1);
        console.log(marker1)
    };
    

    useEffect(() => {
        const existingScript = document.getElementById('longdoMapScript');
        const callback = props.callback;

        const loadScript = () => {
            const script = document.createElement('script');
            script.src = `https://api.longdo.com/map/?key=${props.mapKey}`;
            script.id = 'longdoMapScript';

            script.onload = () => {
                mapCallback();
                if (callback) callback();
            };

            document.body.appendChild(script);
        };

        if (!existingScript) {
            loadScript();
        } else {
            const checkInterval = setInterval(() => {
                if (window.longdo) {
                    clearInterval(checkInterval);
                    mapCallback();
                    if (callback) callback();
                }
            }, 100);
        }
        
    }, [props.id, props.mapKey, props.callback]);

    const handleSubmit = () => {
        navigate("/rank");
    }
    const handleBack = () => {
        navigate("/registerbank");
    }

    return (
        <div>
            <NavBank1 />
            <h1 style={{ textAlign: 'center' }}>ปักหมุดที่อยู่ของคุณ</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                    id={props.id}
                    style={{
                        width: '50%',
                        height: '50vh',
                        justifyContent: 'center',
                    }}
                ></div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 2, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="filled-multiline-static"
                        label="ใส่ที่อยู่ของคุณ"
                        multiline
                        rows={6}
                        variant="filled"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Box>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10}}>
                    <Button variant="contained" size="large" color="error" onClick={handleBack}> ย้อนกลับ </Button>
                    <Button variant="contained" size="large" color="success" onClick={handleSubmit}>เสร็จสิ้น</Button>
                </div>
            </div>
        </div>
    );
};

export default LongdoMap;
