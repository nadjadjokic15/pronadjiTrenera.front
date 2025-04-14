import React from "react";
import AppointmentForm from "../components/AppointmentForm"; 
import { Container, Box, Typography } from "@mui/material";

const AppointmentPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{color:"#b4ff43d2"}}>
          Zakazivanje termina
        </Typography>
        
        <AppointmentForm />
      </Box>
    </Container>
  );
};

export default AppointmentPage;
