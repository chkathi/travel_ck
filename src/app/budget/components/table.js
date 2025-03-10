"use client";

import { Grid, Box, Typography } from "@mui/material";

export default function BudgetTable({ data }) {
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
