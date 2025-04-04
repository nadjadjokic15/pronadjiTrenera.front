

import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid, IconButton, Snackbar, Box } from '@mui/material';
import { Favorite } from '@mui/icons-material';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar status
  const [removedTrainer, setRemovedTrainer] = useState(null); // Trenutno uklonjeni trener

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (trainer) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== trainer.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
    setRemovedTrainer(trainer);
    setOpenSnackbar(true); 
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <main>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ marginBottom: 4, textAlign: 'center', color: 'white' }}
        >
          Moji omiljeni treneri
        </Typography>

        {favorites.length > 0 ? (
          <Grid container spacing={3}>
            {favorites.map((trainer) => (
              <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                <Card 
                  sx={{ 
                    maxWidth: 345, 
                    borderRadius: 2, 
                    boxShadow: 3, 
                    transition: 'transform 0.3s ease-in-out', 
                    '&:hover': { transform: 'scale(1.05)' },
                    marginBottom: 5,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={trainer.image_url}
                    alt={trainer.name}
                    sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
                  />
                  <CardContent>
                    <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
                      <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ fontWeight: 'bold' }}
                      >
                        {trainer.name} {trainer.surname}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                      {trainer.description}
                    </Typography>
                    <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                      <IconButton 
                        onClick={() => removeFavorite(trainer)} 
                        color="error" 
                        aria-label="remove favorite"
                      >
                        <Favorite />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ textAlign: 'center', color: 'white' }}>
            No favorites yet.
          </Typography>
        )}

        {/* Snackbar za obaveštenje kada je favorit uklonjen */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={`Removed ${removedTrainer ? removedTrainer.name : ''} from favorites`}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Container>
    </main>
  );
};

export default Favorites;
