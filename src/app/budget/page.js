"use client";

import { useState, useEffect } from "react";

import { supabase } from "@/app/lib/supabaseClient";
import Navbar from "../components/navbar";
import BudgetForm from "./components/form";
import BudgetTable from "./components/table";

export default function Budget() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsAuthorized(localStorage.getItem("isAuthorized") === "true");

    fetchData();
  }, []);

  const fetchData = async (tripId) => {
    if (!tripId) return;

    let { data, error } = await supabase
      .from("Spending")
      .select("*")
      .eq("trip_id", tripId);

    console.log("fetchData error:", error);
    console.log("fetchData data:", data);

    setData(data);
  };

  return (
    /* add action prop to initiate a route */
    <div>
      <Navbar isAuthorized={isAuthorized} />
      <h1>Budget Form</h1>

      <BudgetForm fetchData={fetchData} />
      <br />
      <BudgetTable data={data} />
    </div>
  );
}
