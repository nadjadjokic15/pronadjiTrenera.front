
import React, { useState, useEffect } from "react";
import { Button, Typography, Grid, Paper, List, ListItem, ListItemText, Select, MenuItem, InputLabel, FormControl, TextField } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AppointmentForm = () => {
  const [appointment_date, setAppointmentDate] = useState(""); // Datum termina
  const [trainerId, setTrainerId] = useState(""); // ID odabranog trenera
  const [trainers, setTrainers] = useState([]); // Lista trenera
  const [appointments, setAppointments] = useState([]); // Lista termina
  const [error, setError] = useState(""); 
  const [message, setMessage] = useState(""); 

  const token = sessionStorage.getItem("authToken"); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = jwtDecode(token);
        let response;
        if (user.role === "client") {
          response = await axios.get(`http://localhost:5001/api/users/${user.id}/appointments`, {
            headers: {
             'Authorization': `Bearer ${token}`, 
            },
          });
        } else {
          response = await axios.get(`http://localhost:5001/api/trainers/${user.id}/appointments`, {
            headers: {
              'Authorization': `Bearer ${token}`, 
            },
          });
        }
        console.log(response.data);
        setAppointments(response.data.appointments);
      } catch (err) {
        console.error(err);
        setError("Greška prilikom učitavanja termina.");
      }
    };

    const fetchTrainers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/trainers", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setTrainers(response.data); 
      } catch (err) {
        console.error(err);
        setError("Greška prilikom učitavanja trenera.");
      }
    };

    fetchAppointments();
    fetchTrainers();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!appointment_date || !trainerId) {
      setError("Datum termina i trener su obavezni.");
      return;
    }

    try {
      
      const response = await axios.post(
        "http://localhost:5001/api/appointments", 
        { appointment_date, trainerId },
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        }
      );
      setMessage("Termin je uspešno zakazan!");
      setError("");

      
      setAppointments((prevAppointments) => [...prevAppointments, response.data]);

      
      setAppointmentDate(""); 
      setTrainerId(""); 

    } catch (err) {
      console.error(err);
      setError("Došlo je do greške prilikom zakazivanja termina.");
      setMessage("");
    }
  };


const handleCancelAppointment = async (appointmentId) => {
    console.log("Otkazivanje termina sa ID: ", appointmentId); 
    try {
      const response = await axios.put(
        `http://localhost:5001/api/appointments/cancel/${appointmentId}`,
        { }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        }
      );
      console.log("Response from backend:", response.data);
       
      setMessage("Termin je otkazan.");
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: "cancelled" } : appointment
        )
      );
    } catch (err) {
      console.error("Error during canceling:", err.response ? err.response.data : err.message);
      setError("Došlo je do greške prilikom otkazivanja termina.");
    }
  };
  

  return (
    <Paper sx={{ padding: 4, maxWidth: 500, margin: "auto", backgroundColor: "#b4ff43d2", color: "rgb(74,73,73,0.749)", marginBottom: "20px" }}>
      <Typography variant="h5" component="h2" gutterBottom color="rgb(74,73,73,0.749)">
        Zakazivanje termina
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Odaberite datum termina
            </Typography>
            <TextField
              fullWidth
              label="Datum i vreme termina"
              type="datetime-local"
              value={appointment_date}
              onChange={(e) => setAppointmentDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="trainer-label">Odaberite trenera</InputLabel>
              <Select
                labelId="trainer-label"
                value={trainerId}
                onChange={(e) => setTrainerId(e.target.value)}
                label="Odaberite trenera"
              >
                {trainers.map((trainer) => (
                  <MenuItem key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          
          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Grid>
          )}

          
          {message && (
            <Grid item xs={12}>
              <Typography variant="body2" color="primary">
                {message}
              </Typography>
            </Grid>
          )}

          
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "rgb(74,73,73,0.749)", "&:hover": { backgroundColor: "#333" } }}
              type="submit"
              fullWidth
            >
              Zakazivanje termina
            </Button>
          </Grid>
        </Grid>
      </form>

      
      <Typography variant="h6" component="h3" sx={{ marginTop: 3 }}>
        Moji termini
      </Typography>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={ `${appointment.id}-${appointment.appointment_date}`}>
            <ListItemText
              primary={`Termin: ${new Date(appointment.appointment_date).toLocaleString()} - ${appointment.role}: ${appointment.username}`}
              secondary={`Status: ${appointment.status}`}
            />
            {appointment.status === "scheduled" && (
              <Button
                variant="contained"
                sx={{ backgroundColor: "rgb(74,73,73,0.749)", color: "white", "&:hover": { backgroundColor: "#333" } }}
                onClick={() => handleCancelAppointment(appointment.id)}
              >
                Otkazi
              </Button>
            )}
            {appointment.status === "cancelled" && (
              <Typography variant="body2" color="textSecondary">
                Termin otkazan
              </Typography>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AppointmentForm;
