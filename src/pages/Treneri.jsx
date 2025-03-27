import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import Grid from '@mui/material/Grid';

const Treneri = () => {
  const [trainers, setTrainers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/trainers'); 
        setTrainers(response.data); 
        setLoading(false); 
      } catch (err) {
        setError('Failed to fetch trainers'); 
        setLoading(false);
      }
    };

    fetchTrainers(); 
  }, []); 

  return (
    <main>
      <Container maxWidth={false} sx={{ backgroundColor: 'rgba(74, 73, 73, 0.749)' }}>
        <Typography variant="h4" sx={{ marginBottom: 2, color: 'white' }}>
          Pronađi trenera po tvojoj meri
        </Typography>

        {loading && <Typography>Loading...</Typography>} 

        {error && <Typography color="error">{error}</Typography>} 

        <Grid container spacing={3}>
          {trainers.length > 0 ? (
            trainers.map((trainer) => (
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
                        {trainer.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {trainer.location}
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
