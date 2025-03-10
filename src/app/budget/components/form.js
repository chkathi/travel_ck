import { useState } from "react";
import Form from "next/form";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

import { supabase } from "@/app/lib/supabaseClient";

export default function BudgetForm({ fetchData }) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [cost, setCost] = useState(0.0);
  const [notes, setNotes] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(expenseName, expenseType, cost, notes);

    if (!expenseName || !expenseType || !cost) {
      setIsModalOpen(true);
    }
    const { data, error } = await supabase
      .from("Spending")
      .insert({
        expense_name: expenseName,
        expense_type: expenseType,
        cost: cost,
        description: notes,
      })
      .select();

    if (error) {
      console.log("error: ", error);
    } else {
      console.log(data);
    }
    setCost(0);
    setExpenseName("");
    setExpenseType("");
    setNotes("");
    fetchData();
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