import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const UserMap = () => {
  const latitud = parseFloat(localStorage.getItem("latitud")) || 19.4326; // Default CDMX
  const longitud = parseFloat(localStorage.getItem("longitud")) || -99.1332;

  const center = { lat: latitud, lng: longitud };

  const [driverPosition, setDriverPosition] = useState({ lat: 25.536102, lng: -103.356891 });
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API no está disponible.");
      return;
    }
    const fetchRoute = () => {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: driverPosition, // Punto inicial (repartidor)
          destination: center, // Punto final (usuario)
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            animateDriver(result.routes[0].legs[0].steps);
          } else {
            console.error("Error obteniendo la ruta:", status);
          }
        }
      );
    };

    const animateDriver = (steps) => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < steps.length) {
          setDriverPosition({
            lat: steps[index].end_location.lat(),
            lng: steps[index].end_location.lng(),
          });
          index++;
        } else {
          clearInterval(interval);
        }
      }, 2000); // Se mueve cada 2 segundos
    };

    fetchRoute();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBgza2x2pIRK3EV-n9QZiROIlt5NQqNpfI" libraries={["places", "routes", "directions"]}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
        {/* Marcador del usuario */}
        <Marker position={center} label="📍 Usuario" />
        
        {/* Marcador del repartidor en movimiento */}
        <Marker position={driverPosition} label="🚗 Repartidor" />
        
        {/* Dibujar la ruta */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default UserMap;
