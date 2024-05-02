import './Map.css';
import React, { useEffect, useRef } from "react";

export default function Map({ lat, lng }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps script not loaded");
      return;
    }

    const center = lat && lng ? { lat, lng } : { lat: 37.564214, lng: 127.001699 };

    new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 20,
    })
    
  }, [lat, lng]);

  return (
    <div id="map" className="map" ref={mapRef}></div>
  );
}