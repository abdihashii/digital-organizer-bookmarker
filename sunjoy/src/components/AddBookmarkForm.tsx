"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addBookmark } from "@/app/actions";

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-black text-white hover:bg-slate-500 rounded-lg px-4 py-2 ${pending ? "cursor-not-allowed bg-slate-500" : ""}`}
      type="submit"
      aria-disabled={pending}
    >
      {pending ? "Adding..." : "Add"}
    </button>
  );
};

const AddBookmarkForm = () => {
  const [, formAction] = useFormState(addBookmark, null);

  return (
    <form action={formAction} className="space-x-2">
      <input
        className="border-2 border-slate-500 rounded-lg p-2"
        type="text"
        placeholder="URL"
        name="url"
      />

      <Submit />
    </form>
  );
};

export default AddBookmarkForm;
