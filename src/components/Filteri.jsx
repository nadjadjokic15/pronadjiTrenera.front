


import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem,Grid} from '@mui/material';
// import {Grid} from '@mui/material/Grid'
const Filteri = ({ 
  searchQuery, 
  setSearchQuery, 
  priceFilter, 
  setPriceFilter, 
  locationFilter, 
  setLocationFilter, 
  typeFilter, 
  setTypeFilter, 
  locationOptions, 
  typeOptions 
}) => {
  return (
    <Box sx={{ marginBottom: 3, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
      
      
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <TextField
          label="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            maxWidth: 500,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#b4ff43d2', 
              },
              '&:hover fieldset': {
                borderColor: '#b4ff43d2', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#b4ff43d2', 
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white', 
            },
            '& .MuiInputBase-input': {
              color: 'white', 
            }
          }}
        />
      </Box>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Max Price"
            type="number"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b4ff43d2', 
                },
                '&:hover fieldset': {
                  borderColor: '#b4ff43d2', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#b4ff43d2', 
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white', 
              },
              '& .MuiInputBase-input': {
                color: 'white', 
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b4ff43d2', 
                },
                '&:hover fieldset': {
                  borderColor: '#b4ff43d2', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#b4ff43d2', 
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white', 
              },
              '& .MuiInputBase-input': {
                color: 'white', 
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined" sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#b4ff43d2', 
              },
              '&:hover fieldset': {
                borderColor: '#b4ff43d2', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#b4ff43d2', 
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white', 
            },
            '& .MuiInputBase-input': {
              color: 'white', 
            }
          }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              label="Type"
            >
              <MenuItem value="">All Types</MenuItem>
              {typeOptions.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filteri;

