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

    const fetchData = async () => {
      let { data, error } = await supabase.from("Spending").select("*");

      console.log("fetchData error:", error);
      console.log("fetchData data:", data);
    };

    setData(data);
    setError(error);

    fetchData();
  }, []);

  return (
    /* add action prop to initiate a route */
    <div>
      <Navbar isAuthorized={isAuthorized} />
      <h1>Budget Form</h1>
      <BudgetForm />
      <br />

      <BudgetTable />
    </div>
  );
}
