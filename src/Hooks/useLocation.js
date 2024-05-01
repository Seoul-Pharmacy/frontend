import { useState, useEffect } from 'react';

/*사용자의 latitude와 longitude return*/
export default function useLocation() {
    const [location, setLocation] = useState({ lat: null, lng: null });

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log('Geolocation not supported by this browser.');
            return;
        } else {
            navigator.geolocation.getCurrentPosition((location) => {
                    setLocation({
                            lat: location.coords.latitude,
                            lng: location.coords.longitude
                    });
            },
            (error) => {
                console.error(error.message);
            });
        }
    }, []);

    return location;
}