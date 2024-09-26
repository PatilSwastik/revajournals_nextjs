"use client";
import React from "react";
import Link from "next/link";

const SignUpForm = () => {
  // Get all the data from the form and send it to the server
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const accountType = formData.get("accountType") as string;
    const password = formData.get("password") as string;
    const cpassword = formData.get("cpassword") as string;

    const validAccountTypes = ["reader", "author", "reviewer"];
    if (!validAccountTypes.includes(accountType)) {
      alert("Invalid account type");
      return;
    }

    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }

    fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, accountType }),
    })
      .then((response) => {
        if (response.ok) {
          let res = response.json();
          res.then((data) => {
            alert(data.message);
            window.location.href = "/auth/signin";
          });
        } else {
          let res = response.json();
          res.then((data) => {
            alert(data.message);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name and Last Name
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              required
              className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#01324b] sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#01324b] sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="accountType"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select User Type
          </label>
          <div className="mt-2">
            <select
              id="accountType"
              name="accountType"
              required
              className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#01324b] sm:text-sm sm:leading-6"
            >
              <option value="reader">Reader</option>
              <option value="author">Author</option>
              <option value="reviewer">Reviewer</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#01324b] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="cpassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="cpassword"
              name="cpassword"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#01324b] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#01324b] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#30637d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01324b]"
          >
            Sign Up
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member ?{" "}
        <Link
          href="/auth/signin"
          className="font-semibold leading-6 text-[#01324b] hover:text-[#30637d]"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
