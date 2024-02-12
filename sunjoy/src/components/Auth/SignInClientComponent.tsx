"use client";

import { Database } from "@/types/database.types";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SignInClientComponent = () => {
  const supabase = createClientComponentClient<Database>();

  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const email = (event.currentTarget.email as HTMLInputElement).value;
    const password = (event.currentTarget.password as HTMLInputElement).value;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="text-white flex flex-col gap-4 bg-slate-800 rounded-lg p-6 w-11/12 lg:w-1/4"
    >
      <h1 className="text-4xl font-medium">Sign In</h1>

      <section className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input className="text-black p-2" type="email" id="email" />
      </section>

      <section className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input className="text-black p-2" type="password" id="password" />
      </section>

      <button className="bg-white rounded-lg text-black hover:bg-slate-500 py-2 hover:text-white">
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignInClientComponent;
