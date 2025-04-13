import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const TripStart = ({ tripId }) => {
  const { state } = useLocation();
  const { driverCoords, destinationCoords } = state || {};
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
  });

  const mapRef = useRef(null);
  const ambulanceMarkerRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [distanceData, setDistanceData] = useState({ distance: '', duration: '' });

  useEffect(() => {
    // Initialize Socket.IO client
    const newSocket = io(import.meta.env.VITE_SOCKET_URL); // Use the correct environment variable
    setSocket(newSocket);
  
    // Join the trip room
    newSocket.emit('joinTrip', tripId);
  
    // Listen for ambulance location updates
    newSocket.on('ambulanceLocationUpdate', (location) => {
      if (ambulanceMarkerRef.current) {
        // Update marker position
        ambulanceMarkerRef.current.position = location;
        ambulanceMarkerRef.current.map = mapRef.current.state.map;
      } else {
        // Create a new marker if it doesn't exist
        ambulanceMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
          map: mapRef.current.state.map,
          position: location,
          title: 'Ambulance',
        });
      }
    });
  
    return () => {
      newSocket.disconnect();
    };
  }, [tripId]);

  useEffect(() => {
    if (!driverCoords || !destinationCoords) return;

    const fetchDriverLocation = async () => {
      // Simulate fetching driver's location every 10 seconds
      const interval = setInterval(async () => {
        try {
          // Replace this with actual driver's live coordinates
          const updatedDriverCoords = {
            lat: driverCoords.lat + Math.random() * 0.001, // Simulated movement
            lng: driverCoords.lng + Math.random() * 0.001,
          };

          // Send updated location to the backend
          socket.emit('ambulanceLocation', {
            tripId,
            location: updatedDriverCoords,
          });

          // Fetch distance and time from Google Maps Distance Matrix API
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${updatedDriverCoords.lat},${updatedDriverCoords.lng}&destinations=${destinationCoords.lat},${destinationCoords.lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
          );
          const data = await response.json();

          if (data.rows[0].elements[0].status === 'OK') {
            const { distance, duration } = data.rows[0].elements[0];
            setDistanceData({
              distance: distance.text,
              duration: duration.text,
            });
          }
        } catch (error) {
          console.error('Failed to fetch distance and time:', error);
        }
      }, 10000); // Every 10 seconds

      return () => clearInterval(interval);
    };

    fetchDriverLocation();
  }, [driverCoords, destinationCoords, socket, tripId]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* Google Maps */}
      <div className="flex-grow">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={driverCoords || { lat: 37.7749, lng: -122.4194 }} // Default to San Francisco
          zoom={10}
          onLoad={(map) => (mapRef.current = { state: { map } })}
        />
      </div>

      {/* Horizontal div */}
      <div className="w-full bg-gray-200 p-4 text-center">
        <p>Tracking Ambulance for Trip ID: {tripId}</p>
      </div>

      {/* Distance and Time Info */}
      <div className="w-full bg-gray-100 p-4 text-center">
        <p>Distance: {distanceData.distance}</p>
        <p>Estimated Time: {distanceData.duration}</p>
      </div>
    </div>
  );
};

export default TripStart;