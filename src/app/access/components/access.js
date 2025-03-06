import Form from "next/form";

import { useState } from "react";

export default function Access() {
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setPassword(e.target.value);

    if (password === process.env.ACCESS_CODE) {
      // Since access code worked enable a prop across components
      // 1. NavBar allows more options after password is submitted
      // 2. Acesss option disappears
      // 3. Change input type to password
    }
  }

  return (
    /* add action prop to initiate a route */
    <div>
      <h1>Access</h1>
      <Form className="rounded-xl border-2 px-2 py-2" onSubmit={handleSubmit}>
        {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
        <input value={password} />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
