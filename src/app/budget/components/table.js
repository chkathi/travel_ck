"use client";

import { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";

import { supabase } from "@/app/lib/supabaseClient";

export default function BudgetTable() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Spending").select("*");

      if (error) {
        console.error("Fetch error:", error);
        setError(error);
      } else {
        console.log("Fetched data:", data);
        setData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "75%",
        mx: "auto",
        mt: 3,
        p: 2,
        bgcolor: "#1e1e1e",
        color: "white",
      }}
    >
      {/* Table Header */}
      <Grid
        container
        spacing={2}
        sx={{ borderBottom: "2px solid white", pb: 1 }}
      >
        {["Expense Name", "Type", "Cost", "Description"].map(
          (header, index) => (
            <Grid item xs={3} key={index}>
              <Typography fontWeight="bold">{header}</Typography>
            </Grid>
          )
        )}
      </Grid>

      {/* Table Body */}
      {data.length > 0 ? (
        data.map((item) => (
          <Grid container spacing={4} key={item.id} sx={{ pt: 1 }}>
            <Grid item xs={3}>
              {item.expense_name}
            </Grid>
            <Grid item xs={3}>
              {item.expense_type}
            </Grid>
            <Grid item xs={3}>
              $ {parseFloat(item.cost).toFixed(2)}
            </Grid>
            <Grid item xs={3}>
              {item.description}
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          No data available
        </Typography>
      )}
    </Box>
  );
}
