import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const UserMap = () => {
  // Obtener latitud y longitud de localStorage
  const latitud = parseFloat(localStorage.getItem("latitud")) || 19.4326; // Valor por defecto: CDMX
  const longitud = parseFloat(localStorage.getItem("longitud")) || -99.1332;

  // Configurar el centro del mapa
  const center = {
    lat: latitud,
    lng: longitud,
  };

  return (
    <LoadScript googleMapsApiKey="TU_API_KEY_AQUI"> 
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default UserMap;
