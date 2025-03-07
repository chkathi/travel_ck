"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/navbar";

export default function Budget() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsAuthorized(localStorage.getItem("isAuthorized") === "true");
  }, []);

  return (
    /* add action prop to initiate a route */
    <div>
      <Navbar isAuthorized={isAuthorized} />
      <h1>flight and hotel</h1>
    </div>
  );
}
