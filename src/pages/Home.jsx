import slika8 from "../assets/slika8.jpg"
import slika6 from "../assets/slika6.jpg"
import slika7 from "../assets/slika7.webp"
import React from 'react';


import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


import { motion } from "framer-motion";
const images=[slika8, slika7, slika6]

const Home = () => {
  const repeatedImages = [...images, ...images, ...images, ...images];
  return (
    <main>
   
      <Container maxWidth={false} sx={{
        
        justifyContent:'center',
        
        
        color:'white',}}>
        
        <Grid container spacing={2}  alignItems="center" 
        >
          <Grid item xs={12} md={6} >
            <Typography variant="h3.3" component="h1" gutterBottom sx={{color:"#b4ff43d2",}}>
              PERSONALNI TRENER NAMENJEN TEBI
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
          <Grid item xs={12} md={6} 
          sx={{padding:4,marginTop:4,alignItems:'center', justifyContent:'center'}}
          >
            <Box
              component="img"
              src={slika8}
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
              src={slika6}
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
              <li>✅ Pretražuj i filtriraj</li>
              <li>✅ Zakaži trening i kontaktiraj tvog omiljenog trenera</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6} sx={{padding:4,}}>
            <Box
              component="img"
              src={slika7}
              alt="Goal Achievement"
              sx={{
                width: "90%",
                borderRadius:2,
                border:"3px solid #b4ff43d2"
            
                
                
                
                
            
              }}
            />
          </Grid>
        </Grid>

      
      <Box sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        marginTop: 5,
        height: '200px',
      }}>
        <Box
          sx={{
            display: 'flex',
            animation: 'marquee 8s linear infinite',
          }}
        >
          {repeatedImages.map((src, index) => (
            <Box
              key={index}
              component="img"
              src={src}
              alt={`Slika ${index}`}
              sx={{
                width: '300px',
                 margin: 0,
                padding: 0,
              }}
            />
          ))}
        </Box>
      </Box>

      
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      </Container>
      
    </main>
  );
};


export default Home;
