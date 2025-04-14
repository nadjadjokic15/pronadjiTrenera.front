
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box 
      sx={{
        backgroundColor: "rgba(74, 73, 73, 0.749)", 
        color: "white", 
        padding: "1rem",
        textAlign: "center",
        position: "relative", 
        
        // bottom: 0,
        width: "100%",
        
         
      }}
    >
      <Typography variant="body2">
        Copyright Pronadji trenera 2025
      </Typography>
    </Box>
  );
};

export default Footer;
