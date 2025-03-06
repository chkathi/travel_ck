"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "next/form";

import Image from "next/image";
import Navbar from "../components/navbar";

export default function Home() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    // setPassword(e.target.value);

    if (password === process.env.NEXT_PUBLIC_ACCESS_CODE) {
      // Since access code worked enable a prop across components
      // 1. NavBar allows more options after password is submitted
      // 2. Acesss option disappears
      // 3. Change input type to password

      setIsAuthorized(true);
    }

    console.log("Tried!", password, process.env.NEXT_PUBLIC_ACCESS_CODE);
  }

  useEffect(() => {
    console.log("Authority Updated : ", isAuthorized);
    localStorage.setItem("isAuthorized", isAuthorized);

    if (isAuthorized) {
      router.push("/");
    }
  }, [isAuthorized]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar isAuthorized={isAuthorized} />
      <div>
        <h1>Access</h1>
        <Form className="rounded-xl border-2 px-2 py-2">
          {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
