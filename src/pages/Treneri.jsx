
import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Grid, IconButton, Pagination, Link } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Filteri from '../components/Filteri';
import MapaComponent from '../components/MapaComponent'; // Mapa komponenta

const Treneri = () => {
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [priceFilter, setPriceFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [locationOptions, setLocationOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const trainersPerPage = 6;

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/trainers');
        setTrainers(response.data);
        setFilteredTrainers(response.data);

        const uniqueLocations = [...new Set(response.data.map(trainer => trainer.location))];
        const uniqueTypes = [...new Set(response.data.map(trainer => trainer.type))];

        setLocationOptions(uniqueLocations);
        setTypeOptions(uniqueTypes);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trainers');
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  useEffect(() => {
    let filtered = trainers;

    if (priceFilter) {
      filtered = filtered.filter(trainer => trainer.price <= priceFilter);
    }
    if (locationFilter) {
      filtered = filtered.filter(trainer => trainer.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }
    if (typeFilter) {
      filtered = filtered.filter(trainer => trainer.type.toLowerCase().includes(typeFilter.toLowerCase()));
    }
    if (searchQuery) {
      filtered = filtered.filter(trainer => 
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        trainer.surname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTrainers(filtered);
  }, [priceFilter, locationFilter, typeFilter, searchQuery, trainers]);

  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = filteredTrainers.slice(indexOfFirstTrainer, indexOfLastTrainer);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const toggleFavorite = (trainer) => {
    const updatedFavorites = favorites.some(fav => fav.id === trainer.id)
      ? favorites.filter(fav => fav.id !== trainer.id)
      : [...favorites, trainer];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <main>
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="h4" sx={{ marginBottom: 2, color: 'white' }}>
            Pronađi trenera po tvojoj meri
          </Typography>

          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          <Filteri
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            locationOptions={locationOptions}
            typeOptions={typeOptions}
          />

          <Grid container spacing={3} justifyContent="center" alignItems="center">
            {currentTrainers.length > 0 ? (
              currentTrainers.map((trainer) => (
                <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card sx={{
                      maxWidth: 345,
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={trainer.image_url}
                        alt={trainer.name}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                          {trainer.name} {trainer.surname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {trainer.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {trainer.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price: {trainer.price} USD
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Location: {trainer.location}
                        </Typography>

                        <IconButton
                          onClick={() => toggleFavorite(trainer)}
                          color={favorites.some(fav => fav.id === trainer.id) ? 'primary' : 'default'}
                        >
                          {favorites.some(fav => fav.id === trainer.id) ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>

                       
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))
            ) : (
              <Typography>No trainers found.</Typography>
            )}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Pagination
              count={Math.ceil(filteredTrainers.length / trainersPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>

          
          <MapaComponent trainers={filteredTrainers} />
        </Box>
      </Container>
    </main>
  );
};

export default Treneri;
