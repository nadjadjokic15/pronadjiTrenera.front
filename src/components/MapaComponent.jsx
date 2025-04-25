import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import BASE_URL from '../api';


const geocodeAddress = async (address) => {
  const apiKey = 'cd08c5bddcb849319834341db9073559'; 
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}&language=en&pretty=1&no_annotations=1`;

  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};

const MapaComponent = () => {
  const [trainers, setTrainers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');


  const fetchTrainers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/trainers`);
      setTrainers(response.data);
    } catch (err) {
      setError('Error fetching trainers');
      console.error(err);
    }
  };

  
  useEffect(() => {
    const getTrainerLocations = async () => {
      const trainerLocations = await Promise.all(
        trainers.map(async (trainer) => {
          const coordinates = await geocodeAddress(trainer.location);
          return coordinates ? { ...trainer, coordinates } : null;
        })
      );

      setLocations(trainerLocations.filter(Boolean));
    };

    if (trainers.length > 0) {
      getTrainerLocations();
    }
  }, [trainers]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <MapContainer 
        center={[45.0, 19.0]} 
        zoom={6} 
        style={{ height: '400px', marginTop: '20px', marginBottom:'20px'}}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Iteriramo kroz trenere sa geolokacijama i dodajemo markere */}
        {locations.map((trainer) => (
          <Marker 
            key={trainer.id}
            position={[trainer.coordinates.lat, trainer.coordinates.lng]} 
            icon={new Icon({
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              <strong>{trainer.name} {trainer.surname}</strong>
              <p>{trainer.location}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapaComponent;
