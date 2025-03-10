import { useState, useEffect } from "react";
import Form from "next/form";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import { supabase } from "@/app/lib/supabaseClient";

export default function BudgetForm({ fetchData }) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [cost, setCost] = useState(0.0);
  const [notes, setNotes] = useState("");
  const [tripId, setTripId] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      let { data, error } = await supabase.from("Trip").select("*");

      if (error) {
        console.error("Error fetching trips:", error);
        return;
      }

      console.log("Trip data:", data);
      setTrips(data);

      if (tripId === -1 && data.length > 0) {
        setTripId(data[0].id);
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    fetchData(tripId);
  }, [tripId]);

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(expenseName, expenseType, cost, notes, tripId);

    if (!expenseName || !expenseType || !cost) {
      setIsModalOpen(true);
    }
    const { data, error } = await supabase
      .from("Spending")
      .insert({
        expense_name: expenseName,
        expense_type: expenseType,
        cost: cost,
        notes: notes,
        trip_id: tripId,
      })
      .select();

    if (error) {
      console.log("error: ", error);
    } else {
      console.log(data);
    }

    fetchData(tripId);

    setCost(0);
    setExpenseName("");
    setExpenseType("");
    setNotes("");
  }

  const handleCostChange = (e) => {
    const value = parseFloat(e.target.value);

    if (!isNaN(value)) {
      setCost(value);
    } else {
      setCost(0);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Expense Name"
            variant="outlined"
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required // makes sure the values are not null
          />

          <TextField
            id="outlined-basic"
            label="Expense Type"
            variant="outlined"
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
            required
          />
          <TextField
            id="outlined-basic"
            label="Cost"
            variant="outlined"
            type="number"
            min="0"
            step="0.01"
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={cost}
            onChange={handleCostChange}
            onBlur={() => setCost(parseFloat(cost).toFixed(2))}
            required
          />
          <TextField
            id="outlined-basic"
            label="Notes (Optional)"
            type="text"
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <Select
            labelId="trip-select-label"
            value={tripId}
            label="Select Trip"
            onChange={(e) => {
              console.log("selected trip: ", e.target.value);
              setTripId(e.target.value);
            }}
          >
            {trips.map((trip) => (
              <MenuItem
                key={trip.id}
                className="text-black bg-white"
                value={trip.id}
              >
                {`${trip.destination} ${trip.arrival_date}`}
              </MenuItem>
            ))}
          </Select>
        </div>

        <button type="submit"> Add Expense </button>
      </Form>

      {/* Modal to show if fields are empty */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <p>All required fields must be filled out to submit the form.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// To Do's
// - create drop down for each trip in the database
// - by selecting the trip you enable fetchSpendingData for that specific trip
