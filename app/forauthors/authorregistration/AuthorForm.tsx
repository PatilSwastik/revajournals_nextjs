"use client";
import { register } from "module";
import React, { useState } from "react";

const AuthorForm = () => {
  const [AuthorDetails, setAuthorDetails] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    position: "",
    institution: "",
    postalCode: "",
  });

  const InputClass = `w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;

  const labelClass = `block text-sm font-medium text-gray-900 `;

  function registerAuthor() {
    let user = localStorage.getItem("user") || "";
    if (user === "") {
      alert("You need to login to register an author.");
      return;
    }

    AuthorDetails.email = JSON.parse(user).email;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/auth/registerauthor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AuthorDetails: AuthorDetails,
        token: JSON.parse(user).token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div id={`author`}>
        <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 ">
          Author
        </h3>
        <div className="grid gap-4 mb-4 w-96 ">
          <div>
            <label htmlFor={`authorName`} className={labelClass}>
              Full Name of Author:
            </label>
            <input
              type="text"
              id={`authorName`}
              name={`authorName`}
              value={AuthorDetails.name}
              onChange={(e) => {
                setAuthorDetails({
                  ...AuthorDetails,
                  name: e.target.value,
                });
              }}
              className={InputClass}
            />
          </div>

          <div>
            <label htmlFor={`authorPhone`} className={labelClass}>
              Phone:
            </label>
            <input
              type="tel"
              id={`authorPhone`}
              name={`authorPhone`}
              value={AuthorDetails.phone}
              onChange={(e) =>
                setAuthorDetails({
                  ...AuthorDetails,
                  phone: e.target.value,
                })
              }
              className={InputClass}
            />
          </div>

          <div>
            <label htmlFor={"authorDepartment"} className={labelClass}>
              Department:
            </label>
            <input
              type="text"
              id={"authorDepartment"}
              name={"authorDepartment"}
              value={AuthorDetails.department}
              onChange={(e) =>
                setAuthorDetails({
                  ...AuthorDetails,
                  department: e.target.value,
                })
              }
              className={InputClass}
            />

            <select
              id={"authorPosition"}
              name={"authorPosition"}
              value={AuthorDetails.position}
              onChange={(e) =>
                setAuthorDetails({
                  ...AuthorDetails,
                  position: e.target.value,
                })
              }
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="UG">UG (Undergraduate)</option>
              <option value="PG">PG (Postgraduate)</option>
              <option value="Researcher">Research Scholar</option>
              <option value="PostDoc">Post Doctorate</option>
            </select>
          </div>

          <div>
            <label htmlFor={"authorInstitution"} className={labelClass}>
              Institution:
            </label>
            <input
              type="text"
              id={"authorInstitution"}
              name={"authorInstitution"}
              value={AuthorDetails.institution}
              onChange={(e) =>
                setAuthorDetails({
                  ...AuthorDetails,
                  institution: e.target.value,
                })
              }
              className={InputClass}
            />
          </div>

          <div>
            <label htmlFor={"authorPostalCode"} className={labelClass}>
              Postal Code:
            </label>

            <input
              type="text"
              id={"authorPostalCode"}
              name={"authorPostalCode"}
              value={AuthorDetails.postalCode}
              onChange={(e) =>
                setAuthorDetails({
                  ...AuthorDetails,
                  postalCode: e.target.value,
                })
              }
              className={InputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={(event) => registerAuthor()}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default AuthorForm;
