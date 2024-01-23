import React, { useState, useEffect } from 'react';


export let longdo;
export let map;

const LongdoMap = (props) => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const mapCallback = () => {
        longdo = window.longdo;
        map = new window.longdo.Map({
            placeholder: document.getElementById(props.id),
            language: 'th',
        });

        // Try to get the user's geolocation
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lon: longitude });

                // Center the map to the user's current location
                map.location({ lon: longitude, lat: latitude }, true);
                console.log(longitude,latitude)
            },
            (error) => {
                console.error('Error getting geolocation:', error);
            }

        );

        
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
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                    id={props.id}
                    style={{
                        width: '50%',
                        height: '50vh',
                        justifyContent: 'center',
                    }}
                ></div>
                <div style={{ marginTop: 10, textAlign: 'center' }}>
                    {currentPosition && (
                        <p>
                            Current Position: Latitude {currentPosition.lat}, Longitude {currentPosition.lon}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LongdoMap;
