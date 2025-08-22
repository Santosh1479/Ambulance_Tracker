import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import io from "socket.io-client";

// Use your ambulance logo image path here
const ambulanceIcon = new L.Icon({
  iconUrl: "/ambulance.png", // Place ambulance.png in public folder
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const defaultCenter = [12.9716, 77.5946];

const TripPage = () => {
  const { id } = useParams();
  const [vehiclePos, setVehiclePos] = useState(defaultCenter);
  const [route, setRoute] = useState([]);
  const [destination, setDestination] = useState([12.9889, 77.5331]);

  // Connect to backend WebSocket for live location and update every 5 seconds
  useEffect(() => {
    const socket = io("http://localhost:3000");
    let interval;
    socket.on(`trip_location_${id}`, (data) => {
      setVehiclePos([data.lat, data.lng]);
    });

    // Request location update every 5 seconds
    interval = setInterval(() => {
      socket.emit("request_location", { tripId: id });
    }, 5000);

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, [id]);

  async function fetchRoute(start, end) {
    const apiKey = import.meta.env.VITE_MAPS_API_KEY;
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
  }

  useEffect(() => {
    async function getRoute() {
      if (!vehiclePos || !destination) return;
      try {
        const coords = await fetchRoute(vehiclePos, destination);
        setRoute(coords);
      } catch (err) {
        console.error("Failed to fetch route", err);
      }
    }
    getRoute();
  }, [vehiclePos, destination]);

  return (
    <div>
      <h2>Trip Page</h2>
      <p>Trip ID: {id}</p>
      <MapContainer center={vehiclePos} zoom={13} style={{ height: "600px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Ambulance marker with custom icon */}
        <Marker position={vehiclePos} icon={ambulanceIcon}>
          <Popup>Ambulance</Popup>
        </Marker>
        {/* Destination marker */}
        <Marker position={destination}>
          <Popup>Destination</Popup>
        </Marker>
        {/* Route polyline */}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default TripPage;