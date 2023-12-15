import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NavBank1 from './navbank1';

export let longdo;
export let map;

export class LongdoMap extends Component {
    constructor(props) {
        super(props);
        this.mapCallback = this.mapCallback.bind(this);
    }

    mapCallback() {
        longdo = window.longdo;
        map = new window.longdo.Map({
            placeholder: document.getElementById(this.props.id),
            language: 'th',
        });
    }

    componentDidMount() {
        const existingScript = document.getElementById('longdoMapScript');
        const callback = this.props.callback;

        const loadScript = () => {
            const script = document.createElement('script');
            script.src = `https://api.longdo.com/map/?key=${this.props.mapKey}`;
            script.id = 'longdoMapScript';

            script.onload = () => {
                this.mapCallback();
                if (callback) callback();
            };

            document.body.appendChild(script);
        };

        if (!existingScript) {
            loadScript();
        } else {
            // If the script is already loaded, wait for it to be fully initialized
            const checkInterval = setInterval(() => {
                if (window.longdo) {
                    clearInterval(checkInterval);
                    this.mapCallback();
                    if (callback) callback();
                }
            }, 100);
        }
    }

    render() {
        return (
            <div >
                <NavBank1 />
                <h1 style={{ textAlign: 'center' }}>ปักหมุดที่อยู่ของคุณ</h1>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                    id={this.props.id}
                    style={{
                        width: '50%',
                        height: '50vh', // Adjusted height for better mobile view
                        justifyContent: 'center',
                    }}
                ></div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {mt: 2, width: '50ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="filled-multiline-static"
                        label="ใส่ที่อยู่ของคุณ"
                        multiline
                        rows={6} // Adjusted rows for better mobile view
                        variant="filled"
                    />
                </Box>
                </div>
            </div>
        );
    }
}
