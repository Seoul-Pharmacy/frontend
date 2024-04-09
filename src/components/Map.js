import React, { useCallback, useEffect, useRef } from "react";

export default function Map() {
  const mapRef = useRef(null);

  const initMap = useCallback(() => {
    new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.564214, lng: 127.001699 },
      zoom: 11,
    });
  }, [mapRef]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <div
      className="map"
      style={{ width: "500px", height: "300px" }}
      ref={mapRef}
    ></div>
  );
}