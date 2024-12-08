"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, Book, PenTool, Trash2 } from "lucide-react";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    token: "",
    username: "",
    email: "",
    isReviewer: false,
    isAuthor: false,
  });
  const [showReviewerForm, setShowReviewerForm] = useState(false);
  const [showAuthorForm, setShowAuthorForm] = useState(false);

  const [AuthorDetails, setAuthorDetails] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    position: "",
    institution: "",
    postalCode: "",
  });

  const [ReviewerDetails, setReviewerDetails] = useState({
    email: "",
    name: "",
    department: "",
    position: "",
    degree: "",
    institution: "",
  });

  const handleBecomeReviewer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Disable Button
    document.getElementById("auth-submit")?.setAttribute("disabled", "true");

    ReviewerDetails.email = userData.email;
    ReviewerDetails.name = userData.username;

    // Check if user is already an reviewer
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/auth/validateReviewer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: userData.token,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.isReviewer === true) {
          setUserData({ ...userData, isReviewer: true });
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });

    // Register user as author
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/auth/registerreviewer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ReviewerDetails: ReviewerDetails,
          token: userData.token,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Reviewer registered successfully") {
          setUserData({ ...userData, isReviewer: true });
        }
        setShowAuthorForm(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  const handleBecomeAuthor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Disable Button
    document.getElementById("rev-submit")?.setAttribute("disabled", "true");

    AuthorDetails.email = userData.email;
    AuthorDetails.name = userData.username;

    // Check if user is already an author
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/auth/validateAuthor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: userData.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuthor === true) {
          setUserData({ ...userData, isAuthor: true });
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });

    // Register user as author
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/auth/registerauthor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AuthorDetails: AuthorDetails,
        token: userData.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Author registration successful") {
          setUserData({ ...userData, isAuthor: true });
        }

        if (data.message === "Author already registered") {
          alert("You are already an author");
          setUserData({ ...userData, isAuthor: true });
        }

        setShowAuthorForm(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user") || "");
    setUserData(user);

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/auth/getAllUserAttributes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: user.token,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.isReviewer === true && data.isAuthor === true) {
          setUserData({ ...user, isReviewer: true, isAuthor: true });
          return;
        }

        if (data.isReviewer === true) {
          setUserData({ ...user, isReviewer: true });
        }

        if (data.isAuthor === true) {
          setUserData({ ...user, isAuthor: true });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {userData && (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <User className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="font-medium">{userData.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {userData.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Author Status</CardTitle>
              <CardDescription>Manage your author role</CardDescription>
            </CardHeader>
            <CardContent>
              {userData.isAuthor ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    You are already an author
                  </p>
                </div>
              ) : (
                <div>
                  <Button onClick={() => setShowAuthorForm(!showAuthorForm)}>
                    <PenTool className="mr-2 h-4 w-4" />
                    Become an Author
                  </Button>
                  {showAuthorForm && (
                    <form
                      onSubmit={handleBecomeAuthor}
                      className="mt-4 space-y-4"
                    >
                      <div>
                        <Label htmlFor={`authorPhone`}>Phone:</Label>
                        <Input
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
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor={"authorDepartment"}>Department:</Label>
                        <Input
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
                          required
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
                          required
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
                        <Label htmlFor={"authorInstitution"}>
                          Institution:
                        </Label>
                        <Input
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
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor={"authorPostalCode"}>Postal Code:</Label>

                        <Input
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
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="author-terms" required />
                        <Label htmlFor="author-terms">
                          I agree to the author terms and conditions
                        </Label>
                      </div>
                      <Button type="submit" id="auth-submit">
                        Submit Author Application
                      </Button>
                    </form>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Reviewer Status</CardTitle>
              <CardDescription>Manage your reviewer role</CardDescription>
            </CardHeader>
            <CardContent>
              {userData.isReviewer ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    You are already a reviewer
                  </p>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={() => setShowReviewerForm(!showReviewerForm)}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    Become a Reviewer
                  </Button>
                  {showReviewerForm && (
                    <form
                      onSubmit={handleBecomeReviewer}
                      className="mt-4 space-y-4"
                    >
                      <div>
                        <Label htmlFor={"reviewerDepartment"}>
                          Department:
                        </Label>
                        <Input
                          type="text"
                          id={"reviewerDepartment"}
                          name={"reviewerDepartment"}
                          value={ReviewerDetails.department}
                          onChange={(e) =>
                            setReviewerDetails({
                              ...ReviewerDetails,
                              department: e.target.value,
                            })
                          }
                          required
                        />

                        <select
                          id={"reviewerPosition"}
                          name={"reviewerPosition"}
                          value={ReviewerDetails.position}
                          onChange={(e) =>
                            setReviewerDetails({
                              ...ReviewerDetails,
                              position: e.target.value,
                            })
                          }
                          required
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
                        <Label htmlFor={"authorInstitution"}>
                          Institution:
                        </Label>
                        <Input
                          type="text"
                          id={"reviewerInstitution"}
                          name={"reviewerInstitution"}
                          value={ReviewerDetails.institution}
                          onChange={(e) =>
                            setReviewerDetails({
                              ...ReviewerDetails,
                              institution: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="terms" required />
                        <Label htmlFor="terms">
                          I agree to the reviewer terms and conditions
                        </Label>
                      </div>
                      <Button type="submit" id="rev-submit">
                        Submit Reviewer Application
                      </Button>
                    </form>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
