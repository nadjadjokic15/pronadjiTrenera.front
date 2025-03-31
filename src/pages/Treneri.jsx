import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia,  } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Filteri from '../components/Filteri';
import Grid from '@mui/material/Grid';


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

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/trainers'); 
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

  return (
    <main>
      <Container maxWidth={false}  >
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

        <Grid container spacing={3}>
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
              <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={trainer.image_url}
                      alt={trainer.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{trainer.name} {trainer.surname}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {trainer.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {trainer.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: {trainer.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Location: {trainer.location}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography>No trainers found.</Typography>
          )}
        </Grid>
      </Container>
    </main>
  );
};

export default Treneri;
