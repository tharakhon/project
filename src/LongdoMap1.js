import React, { useState, useEffect } from 'react';

export let longdo;
export let map;

const LongdoMap1 = (props) => {
    const [markers, setMarkers] = useState([]);

    const mapCallback = () => {
        longdo = window.longdo;
        map = new window.longdo.Map({
            placeholder: document.getElementById(props.id),
            language: 'th',
        });
        
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
    

    // Function to add markers to the map
   // Function to add markers to the map
   
const addMarkers = (markerList) => {
    
    if (map && map.Overlays && markerList.length > 0) {
        const newMarkers = markerList.map((marker, index) => {
            console.log(newMarkers);
            const newMarker = new longdo.Marker(
                { lon: marker.lon, lat: marker.lat },
                {
                    icon: {
                        url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
                        offset: { x: 32, y: 64 }
                    }
                }
            );
            map.Overlays.add(newMarker);
            return newMarker;
        });
        setMarkers(newMarkers);
        console.log(newMarkers); // เพิ่มบรรทัดนี้เพื่อตรวจสอบค่าของ markers
    } else {
        console.log("map1 or map1.Overlays is undefined or markerList is empty");
    }
};


    // Sample marker data list
    const markerList = [
        { lat: 13.602987, lon: 100.627512 },
        { lat: 13.7279, lon: 100.5241 },
        { lat: 13.7069, lon: 100.537 },
        // Add more marker data as needed
    ];

    // Add markers when component mounts
    useEffect(() => {
        addMarkers(markerList);
    }, [markerList]);

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
            </div>
        </div>
    );
};

export default LongdoMap1;
