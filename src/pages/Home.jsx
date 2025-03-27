
import slika1 from "../assets/slika1.jfif"
import slika4 from "../assets/slika4.jfif"
import slika3 from "../assets/slika3.jfif"
import React from 'react';
// import {  Container,Grid, Typography } from "@mui/material/Grid";
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


import { motion } from "framer-motion";

const Home = () => {
  return (
    <main>
      <Container maxWidth={false} sx={{
        backgroundColor:'rgba(74, 73, 73, 0.749)',
        color:"white",
        
        
       
        }}>
        
        <Grid container spacing={2}  alignItems="center" >
          <Grid item xs={12} md={6} >
            <Typography variant="h3.3" component="h1" gutterBottom sx={{color:"#b4ff43d2"}}>
              PERSONALNI TRENER NAMENJEN BAŠ ZA TEBE
            </Typography>
            <Typography variant="h4" className="mb-2" sx={{color:"#b4ff43d2",}} >
              Pronađi trenera jednostavno i brzo
            </Typography>
            <Typography variant="body1" sx={{fontSize:"1.2rem", }}>
              Ova aplikacija je napravljena da ti olakša put ka zdravijem i
              snažnijem životu. Bilo da si početnik ili iskusni sportista, ovde
              ćeš pronaći idealnog personalnog trenera koji će ti pomoći da
              postigneš svoj cilj.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{padding:4,marginTop:4}}>
            <Box
              component="img"
              src={slika1}
              alt="Personal Trainer"
              sx={{
                width: "90%",
                borderRadius:2,
                border:"3px solid #b4ff43d2"
            
              }}
            />
          </Grid>
        </Grid>

        
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            marginTop: 3,
            marginBottom: 3,
          }}
        >
          <motion.div
            className="marquee-container"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            style={{
              whiteSpace: "nowrap",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color:"#b4ff43d2" ,
              

            }}
          >
            MOTIVACIJA IZDRŽLJIVOST USPEH TRANSFORMACIJA ENERGIJA UPORNOST
          </motion.div>
        </Box>

        
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{
            backgroundColor:"#b4ff43d2",
            padding:4,
             color:"white",
             borderRadius:"5px",
             border:"10px double rgba(74,73,73,0.749)",
             }} > 
          <Grid item xs={12} md={6} >
            <Box
              component="img"
              src={slika4}
              alt="Trainer Search"
              sx={{
                width: "90%",
            
            borderRadius:2,
            border:"3px solid rgba(74, 73, 73, 0.749)"
                
        
              }}
            />
          </Grid>
           <Grid item xs={12} md={6}> 
            <Typography variant="h4" gutterBottom sx={{color:"rgba(74, 73, 73, 0.749)"}}>
              Pretražuj trenera prema lokaciji i ceni
            </Typography>
            <Typography variant="body1" sx={{fontSize:"1.2rem"}}>
              Bilo da si u većem gradu ili manjem naselju u skladu sa tvojim
              mogućnostima omogućavamo ti da nađeš trenera baš po tvojoj meri.
              Jednostavno odaberi lokaciju i cenovni rang i pronađi trenera.
            </Typography>
          </Grid>
        </Grid>
         
         <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            marginTop: 3,
            marginBottom: 3,
          }}
        >
          <motion.div
            className="marquee-container"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            style={{
              whiteSpace: "nowrap",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color:"#b4ff43d2" ,
             
              

            }}
          >
            MOTIVACIJA IZDRŽLJIVOST USPEH TRANSFORMACIJA ENERGIJA UPORNOST
          </motion.div>
        </Box>

        
        <Grid container spacing={3} alignItems="center" sx={{color:"white"}}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom sx={{color:"#b4ff43d2"}}>
              Tvoj prvi korak ka ostvarenju cilja
            </Typography>
            <ul style={{fontSize:"1.2rem",
                listStyle:"none",
                paddingLeft:"5px"
            }}>
              <li>Pretražuj i filtriraj</li>
              <li>Zakaži trening i kontaktiraj tvog omiljenog trenera</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6} sx={{padding:4,}}>
            <Box
              component="img"
              src={slika3}
              alt="Goal Achievement"
              sx={{
                width: "90%",
                borderRadius:2,
                border:"3px solid #b4ff43d2"
            
                
                
                
                
            
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};


export default Home;