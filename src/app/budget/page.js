"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import Navbar from "../components/navbar";
import BudgetForm from "./components/form";

export default function Budget() {
  const supabaseURL = process.env.NEXT_PUBLIC_SUPA_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPA_ANON;
  const [isAuthorized, setIsAuthorized] = useState(false);

  console.log("key:", supabaseURL);
  console.log("anon:", supabaseKey);

  const supabase = createClient(supabaseURL, supabaseKey);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsAuthorized(localStorage.getItem("isAuthorized") === "true");

    const fetchData = async () => {
      let { data, error } = await supabase.from("Spending").select("*");

      console.log("fetchData error:", error);
      console.log("fetchData data:", Spending);
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
    </div>
  );
}
