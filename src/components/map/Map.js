import './Map.css';
import React, { useEffect, useRef } from "react";

const { kakao } = window;

export default function Map({ lat, lng }) {
  const latRef = useRef(lat || 37.564214);
  const lngRef = useRef(lng || 127.001699);

  useEffect(()=>{
      const container = document.getElementById('map');
      const options = { center: new kakao.maps.LatLng(latRef.current, lngRef.current), level: 1 };
      const map = new kakao.maps.Map(container, options);
      const marker = new kakao.maps.Marker({
        position: options.center
    });
    marker.setMap(map);
  },[lat, lng]);

  return (
      <div id="map" className="map"></div>
  );
}