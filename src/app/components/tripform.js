import Form from "next/form";
import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

export default function TripForm() {
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trip Data:", trip);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Plan Your Trip
      </Typography>
      <Form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Destination"
          name="destination"
          value={trip.destination}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Start Date & Time"
          type="datetime-local"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          label="End Date & Time"
          type="datetime-local"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}
