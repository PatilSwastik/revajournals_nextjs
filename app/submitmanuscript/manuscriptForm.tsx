"use client";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

const ManuscriptForm = () => {
  const [currentPage, setcurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [manuscript, setManuscript] = useState<File | null>(null);
  const [plagiarism, setPlagiarism] = useState<File | null>(null);
  const [copyright, setCopyright] = useState<File | null>(null);
  const [payment, setPayment] = useState<File | null>(null);
  const [accessType, setAccessType] = useState<String>();

  // Paper Details
  const [paperDetails, setPaperDetails] = useState({
    title: "",
    shortTitle: "",
    keywords: "",
    abstract: "",
    majorDomain: "",
    references: "",
  });

  // This is the form for submitting a manuscript
  function handlePaperDetailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("paper-title");
    const shortTitle = data.get("short-title");
    const keywords = data.get("keywords");
    const abstract = data.get("abstract");
    const majorDomain = data.get("major-domain");
    const references = data.get("references");

    // Validate the form data
    if (
      !title ||
      !shortTitle ||
      !keywords ||
      !abstract ||
      !majorDomain ||
      !references
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Save the data object to the local storage
    localStorage.setItem(
      "paperDetails",
      JSON.stringify({
        title,
        shortTitle,
        keywords,
        abstract,
        majorDomain,
        references,
      })
    );

    // Update the current index
    currentTracking(currentPage + 1);
    setcurrentPage(currentPage + 1);
  }

  // Author
  const [AuthorDetails, setAuthorDetails] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    institution: "",
    postalCode: "",
  });

  const [authorData, setAuthorData] = useState<Author[]>([]);

  // Function to submit the author details
  function authorDetailSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    // Validate the form data
    if (
      !AuthorDetails.name ||
      !AuthorDetails.email ||
      !AuthorDetails.phone ||
      !AuthorDetails.department ||
      !AuthorDetails.position ||
      !AuthorDetails.institution ||
      !AuthorDetails.postalCode
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Validate the email
    if (!AuthorDetails.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    // Validate the phone number
    if (
      AuthorDetails.phone.length !== 10 ||
      isNaN(Number(AuthorDetails.phone))
    ) {
      alert("Please enter a valid phone number");
      return;
    }

    // Update the author count
    setAuthorData([...authorData, AuthorDetails]);

    // Save the data object to the local storage
    localStorage.setItem("authors", JSON.stringify(authorData));

    // Reset the form
    setAuthorDetails({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      institution: "",
      postalCode: "",
    });
  }

  // Function to delete the selected author
  function deleteSelectedAuthor(index: number) {
    setAuthorData(authorData.filter((_, i) => i !== index));
  }

  // This is the form for submitting author information
  function handleAuthorSubmit() {
    // Check if the author count is less than 1 or greater than 10
    if (authorData.length < 1 || authorData.length > 10) {
      alert("You must have at least one author and at most 10 authors");
      return;
    }

    // Save the data object to the local storage
    localStorage.setItem("authors", JSON.stringify(authorData));

    // Update the current index
    currentTracking(currentPage + 1);
    setcurrentPage(currentPage + 1);
  }

  // Reviewers
  const [reviewerDetails, setReviewerDetails] = useState({
    name: "",
    email: "",
    position: "",
    degree: "",
    institution: "",
    department: "",
  });
  const [reviewerData, setReviewerData] = useState<Reviewer[]>([]);

  // Function to submit the reviewer details
  function reviewerDetailSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    // Validate the form data
    if (
      !reviewerDetails.name ||
      !reviewerDetails.email ||
      !reviewerDetails.position ||
      !reviewerDetails.degree ||
      !reviewerDetails.institution ||
      !reviewerDetails.department
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Validate the email
    if (!reviewerDetails.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    // Check if email is already in the list
    let emailExists = reviewerData.some(
      (reviewer) => reviewer.email === reviewerDetails.email
    );

    if (emailExists) {
      alert("Email already exists in the list");
      return;
    }

    // Update the reviewer count
    setReviewerData([...reviewerData, reviewerDetails]);

    // Save the data object to the local storage
    localStorage.setItem("reviewers", JSON.stringify(reviewerData));

    // Reset the form
    setReviewerDetails({
      name: "",
      email: "",
      position: "",
      degree: "",
      institution: "",
      department: "",
    });
  }

  // Function to delete the selected reviewer
  function deleteSelectedReviewer(index: number) {
    setReviewerData(reviewerData.filter((_, i) => i !== index));
  }

  // This is the form for submitting reviewer information
  function handleReviewerSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    // Check if the reviewer count is less than 3 or greater than 5
    if (reviewerData.length < 3 || reviewerData.length > 5) {
      alert("You must have at least 3 reviewers and at most 5 reviewers");
      return;
    }

    // Save the data object to the local storage
    localStorage.setItem("reviewers", JSON.stringify(reviewerData));

    // Update the current index
    currentTracking(currentPage + 1);
    setcurrentPage(currentPage + 1);
  }

  // Document Submission
  const handleManuscriptChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setManuscript(file);
  };

  const handlePlagiarismChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setPlagiarism(file);
  };

  const handleCopyrightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setCopyright(file);
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPayment(file);
  };

  const handleAccessTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccessType(event.target.value);
  };

  // This is the form for submitting documents
  async function handleDocumentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!manuscript || !plagiarism || !copyright || !payment || !accessType) {
      alert("Please fill in all fields");
      return;
    }

    // check author position and process to payment

    // Send the data to the server
    let token = JSON.parse(localStorage.getItem("user") || "").token;
    let DataToSend = {
      token,
      paperDetails,
      authorData,
      reviewerData,
      accessType,
    };

    // Send only files to the server
    let formData = new FormData();
    formData.append("files", manuscript);
    formData.append("files", plagiarism);
    formData.append("files", copyright);
    formData.append("files", payment);
    formData.append("DataToSend", JSON.stringify(DataToSend));

    // Send the data to the server
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/submitfiles", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.success) {
              alert("Paper submitted successfully");
              // window.location.href = "/";
            } else {
              alert("Error submitting paper");
            }
          });
        } else {
          alert("Error submitting paper");
        }
      })
      .catch((error) => {
        alert("Error submitting paper");
      });
  }

  // Function to handle previous button click
  function handlePrevious() {
    if (currentPage === 0) {
      return;
    }

    if (currentPage === 1) {
      let data = localStorage.getItem("paperDetails");
      if (data) {
        setPaperDetails(JSON.parse(data));
      }
    }

    setcurrentPage(currentPage - 1);
    currentTracking(currentPage - 1);
  }

  // Function to Update the tracking of the form
  function currentTracking(currIndex: number) {
    const steps = document.querySelectorAll("ol li");

    steps.forEach((step, index) => {
      if (index === currIndex) {
        step.classList.add("text-blue-600");
      } else {
        step.classList.remove("text-blue-600");
      }
    });
  }

  // Check if the user is logged in If not, redirect to the login page
  React.useEffect(() => {
    let user = localStorage.getItem("user") || "";
    // Send request to the server to check if the user is logged in
    if (user === "") {
      window.location.href = "/auth/signin";
    } else {
      let parsedUser = JSON.parse(user);

      if (!parsedUser) {
        window.location.href = "/auth/signin";
      }
      let token = parsedUser.token || "";
      let email = parsedUser.email || "";
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email }),
      }).then((response) => {
        if (response.ok) {
          let res = response.json();
          res.then((data) => {
            if (!data.isValid) {
              // window.location.href = "/auth/signin";
            } else {
              setIsLoading(false);
              // Check if the user has already filled the form
              let paperDetails = localStorage.getItem("paperDetails");
              let authors = localStorage.getItem("authors");
              let reviewers = localStorage.getItem("reviewers");
              if (paperDetails) {
                setPaperDetails(JSON.parse(paperDetails));
              }
              if (authors) {
                setAuthorData(JSON.parse(authors));
              }
              if (reviewers) {
                setReviewerData(JSON.parse(reviewers));
              }
            }
          });
        } else {
          // window.location.href = "/auth/signin";
        }
      });
      setIsLoading(false);
    }
  }, []);

  const InputClass = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;

  const labelClass = `block text-sm font-medium text-gray-900 `;

  return (
    <>
      {isLoading ? (
        <div className="px-4 lg:px-12 flex flex-col items-center h-dvh py-8 w-full">
          <div>Loading...</div>
        </div>
      ) : (
        <div className="px-4 lg:px-12 flex flex-col items-center  py-8 w-full">
          <div className="w-full p-4 flex items-center justify-center">
            <ol className="flex w-3/4 justify-center">
              <li className="flex w-1/4 items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                  </svg>
                </div>
              </li>
              <li className="flex w-1/4 items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 14"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                    <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
                  </svg>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                  </svg>
                </div>
              </li>
            </ol>
          </div>

          {currentPage > 0 && (
            <div className="mb-4 w-3/4 flex justify-between underline">
              <button
                onClick={handlePrevious}
                disabled={currentPage == 0}
                className="flex flex-row gap-2"
              >
                <ArrowLeft className="w-6 h-6" /> Previous
              </button>
            </div>
          )}

          {/* Paper Details */}
          {currentPage === 0 && (
            <form className="w-2/4" onSubmit={handlePaperDetailSubmit}>
              <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 ">
                Paper Details
              </h3>
              <div className="grid gap-4 mb-4 ">
                <div>
                  <label htmlFor="paper-title" className={labelClass}>
                    Paper Title
                  </label>
                  <input
                    type="text"
                    name="paper-title"
                    id="paper-title"
                    value={paperDetails.title}
                    onChange={(e) =>
                      setPaperDetails({
                        ...paperDetails,
                        title: e.target.value,
                      })
                    }
                    className={InputClass}
                  />
                </div>
                <div>
                  <label htmlFor="short-title" className={labelClass}>
                    Short Title
                  </label>
                  <input
                    type="text"
                    name="short-title"
                    id="short-title"
                    value={paperDetails.shortTitle}
                    onChange={(e) =>
                      setPaperDetails({
                        ...paperDetails,
                        shortTitle: e.target.value,
                      })
                    }
                    className={InputClass}
                  />
                </div>
                <div>
                  <label htmlFor="keywords" className={labelClass}>
                    Keywords
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    id="keywords"
                    value={paperDetails.keywords}
                    onChange={(e) =>
                      setPaperDetails({
                        ...paperDetails,
                        keywords: e.target.value,
                      })
                    }
                    className={InputClass}
                  />
                </div>{" "}
                <div>
                  <label htmlFor="abstract" className={labelClass}>
                    Abstract
                  </label>
                  <textarea
                    name="abstract"
                    id="abstract"
                    value={paperDetails.abstract}
                    onChange={(e) =>
                      setPaperDetails({
                        ...paperDetails,
                        abstract: e.target.value,
                      })
                    }
                    rows={10}
                    className={InputClass}
                  />
                </div>
                <div>
                  <label htmlFor="major-domain" className={labelClass}>
                    Major Domain
                  </label>
                  <input
                    type="text"
                    name="major-domain"
                    id="major-domain"
                    value={paperDetails.majorDomain}
                    onChange={(e) =>
                      setPaperDetails({
                        ...paperDetails,
                        majorDomain: e.target.value,
                      })
                    }
                    className={InputClass}
                  />
                </div>
                <div>
                  <label htmlFor="references" className={labelClass}>
                    References
                  </label>
                  <textarea
                    name="references"
                    id="references"
                    value={paperDetails.references}
                    onChange={(e) =>
                      setPaperDetails({
                        ...paperDetails,
                        references: e.target.value,
                      })
                    }
                    rows={10}
                    className={InputClass}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Next Step: Author Information
              </button>
            </form>
          )}

          {/* Author Information Minimum 1 Maximum 10 */}
          {currentPage === 1 && (
            <form className="w-2/4" method="POST">
              <h3>Author Information</h3>
              {/* Allows dynamic div addition for multiple authors */}
              <div>
                <div id={`author`} className="author-wrapper">
                  <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 ">
                    Author
                  </h3>
                  <div className="grid gap-4 mb-4 ">
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
                      <label htmlFor={`authorEmail`} className={labelClass}>
                        Email:
                      </label>
                      <input
                        type="email"
                        id={`authorEmail`}
                        name={`authorEmail`}
                        value={AuthorDetails.email}
                        onChange={(e) => {
                          setAuthorDetails({
                            ...AuthorDetails,
                            email: e.target.value,
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
                      <label
                        htmlFor={"authorDepartment"}
                        className={labelClass}
                      >
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
                      <label
                        htmlFor={"authorInstitution"}
                        className={labelClass}
                      >
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
                      <label
                        htmlFor={"authorPostalCode"}
                        className={labelClass}
                      >
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
                    onClick={(event) => authorDetailSubmit(event)}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Author
                  </button>
                </div>

                {authorData.map((author, index) => {
                  return (
                    <div
                      key={index}
                      className="p-4 border rounded-lg border-black mt-4"
                    >
                      <div className="w-full flex justify-between items-center">
                        <h3 className="text-xl font-bold">
                          Author {index + 1}{" "}
                        </h3>

                        <button
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          onClick={() => deleteSelectedAuthor(index)}
                        >
                          {" "}
                          Delete Author{" "}
                        </button>
                      </div>
                      {/* All Author Details */}
                      <div>
                        <p>Name : {author.name}</p>
                        <p>Email : {author.email}</p>
                        <p>Phone : {author.phone}</p>
                        <p>Department : {author.department}</p>
                        <p>Position : {author.position}</p>
                        <p>Institution : {author.institution}</p>
                        <p>Postal Code : {author.postalCode}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                <button
                  onClick={handleAuthorSubmit}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {" "}
                  Next Step: Reviewer Information{" "}
                </button>
              </div>
            </form>
          )}

          {/* Reviewer Information Minimum 3 Maximum 5 */}
          {currentPage === 2 && (
            <form className="w-2/4" method="POST">
              <h3>Reviewer Information</h3>
              {/* Allows dynamic div addition for multiple authors */}
              <div>
                <div id={`reviewer`} className="reviewer-wrapper">
                  <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 ">
                    Suggest Reviewer
                  </h3>
                  <div className="grid gap-4 mb-4 ">
                    <div>
                      <label htmlFor={`reviewerName`} className={labelClass}>
                        Full Name of Reviewer:
                      </label>
                      <input
                        type="text"
                        id={`reviewerName`}
                        name={`reviewerName`}
                        className={InputClass}
                        value={reviewerDetails.name}
                        onChange={(e) => {
                          setReviewerDetails({
                            ...reviewerDetails,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor={`reviewerEmai`} className={labelClass}>
                        Email:
                      </label>
                      <input
                        type="email"
                        id={`reviewerEmai`}
                        name={`reviewerEmai`}
                        className={InputClass}
                        value={reviewerDetails.email}
                        onChange={(e) => {
                          setReviewerDetails({
                            ...reviewerDetails,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`reviewerPosition`}
                        className={labelClass}
                      >
                        Position:
                      </label>
                      <input
                        type="tel"
                        id={`reviewerPosition`}
                        name={`reviewerPosition`}
                        className={InputClass}
                        value={reviewerDetails.position}
                        onChange={(e) => {
                          setReviewerDetails({
                            ...reviewerDetails,
                            position: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor={"reviewerDegree0"} className={labelClass}>
                        Degree:
                      </label>

                      <input
                        type="text"
                        id={"reviewerDegree0"}
                        name={"reviewerDegree0"}
                        className={InputClass}
                        value={reviewerDetails.degree}
                        onChange={(e) => {
                          setReviewerDetails({
                            ...reviewerDetails,
                            degree: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={"reviewerInstitution0"}
                        className={labelClass}
                      >
                        Institution:
                      </label>
                      <input
                        type="text"
                        id={"reviewerInstitution0"}
                        name={"reviewerInstitution0"}
                        className={InputClass}
                        value={reviewerDetails.institution}
                        onChange={(e) => {
                          setReviewerDetails({
                            ...reviewerDetails,
                            institution: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={"reviewerDepartment0"}
                        className={labelClass}
                      >
                        Department:
                      </label>
                      <input
                        type="text"
                        id={"reviewerDepartment0"}
                        name={"reviewerDepartment0"}
                        className={InputClass}
                        value={reviewerDetails.department}
                        onChange={(e) => {
                          setReviewerDetails({
                            ...reviewerDetails,
                            department: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={reviewerDetailSubmit}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Reviewer
                  </button>
                </div>
              </div>

              {reviewerData.map((reviewer, index) => {
                return (
                  <div
                    key={index}
                    className="p-4 border rounded-lg border-black mt-4"
                  >
                    <div className="w-full flex justify-between items-center">
                      <h3 className="text-xl font-bold">
                        Reviewer {index + 1}{" "}
                      </h3>

                      <button
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => deleteSelectedReviewer(index)}
                      >
                        {" "}
                        Delete Reviewer{" "}
                      </button>
                    </div>

                    <div>
                      <p>Name : {reviewer.name}</p>
                      <p>Email : {reviewer.email}</p>
                      <p>Position : {reviewer.position}</p>
                      <p>Degree : {reviewer.degree}</p>
                      <p>Institution : {reviewer.institution}</p>
                      <p>Department : {reviewer.department}</p>
                    </div>
                  </div>
                );
              })}

              <div className="mt-4">
                <button
                  onClick={(event) => handleReviewerSubmit(event)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {" "}
                  Next Step: Document Submission{" "}
                </button>
              </div>
            </form>
          )}

          {/* Uplaod Documents */}
          {currentPage === 3 && (
            <form className="w-2/4" onSubmit={handleDocumentSubmit}>
              <h3>Upload Documents</h3>
              <div>
                <div className="mb-2">
                  <label htmlFor="manuscript" className={labelClass}>
                    Uplaod Manuscript
                  </label>
                  <input
                    type="file"
                    name="manuscript"
                    id="manuscript"
                    className={InputClass}
                    onChange={handleManuscriptChange}
                  />
                  {manuscript && <p>Selected file: {manuscript.name}</p>}
                </div>
                <div className="mb-2">
                  <label htmlFor="plagiarism" className={labelClass}>
                    Uplaod Plagiarism Report
                  </label>
                  <input
                    type="file"
                    name="plagiarism"
                    id="plaigiarism"
                    className={InputClass}
                    onChange={handlePlagiarismChange}
                  />
                  {plagiarism && <p>Selected file: {plagiarism.name}</p>}
                </div>
                <div className="mb-2">
                  <label htmlFor="copyright" className={labelClass}>
                    Uplaod Copyright Form
                  </label>
                  <input
                    type="file"
                    name="copyright"
                    id="copyright"
                    className={InputClass}
                    onChange={handleCopyrightChange}
                  />
                  {copyright && <p>Selected file: {copyright.name}</p>}
                </div>
                <div className="mb-2">
                  <label htmlFor="payment" className={labelClass}>
                    Uplaod Payment Receipt
                  </label>
                  <input
                    type="file"
                    name="payment"
                    id="payment"
                    className={InputClass}
                    onChange={handlePaymentChange}
                  />
                  {payment && <p>Selected file: {payment.name}</p>}
                </div>
                <div>
                  <p>To check plagiarism, click the button below:</p>
                  <button
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Check Plagiarism
                  </button>
                </div>
                <div className="py-4 flex gap-4">
                  <label htmlFor="openAccess">Open Access:</label>
                  <input
                    type="radio"
                    id="openAccess"
                    name="accessType"
                    value="open"
                    onChange={handleAccessTypeChange}
                  />

                  <label htmlFor="closedAccess">Closed Access:</label>
                  <input
                    type="radio"
                    id="closedAccess"
                    name="accessType"
                    value="closed"
                    onChange={handleAccessTypeChange}
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {" "}
                    Submit Paper{" "}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default ManuscriptForm;

type Author = {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  institution: string;
  postalCode: string;
};

type Reviewer = {
  name: string;
  email: string;
  position: string;
  degree: string;
  institution: string;
  department: string;
};
