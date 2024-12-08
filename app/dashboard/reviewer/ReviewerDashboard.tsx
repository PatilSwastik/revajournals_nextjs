"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Calendar,
  User,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PaperContent from "@/app/researchpapers/[paper]/PaperContent";

type Paper = {
  article_id: string;
  paper_title: string;
  authors: string[];
  abstract: string;
  created_at: string;
  status:
    | "Pending"
    | "Accepted"
    | "Rejected"
    | "published"
    | "request_changes"
    | "submitted";
  keywords: string;
  paper_content?: string;
  reviews?: Review[];
};

type Review = {
  review: string;
  created_at: string;
  article_id: string;
  reviewer_id: string;
  status: string;
};

const getStatusIcon = (status: Paper["status"]) => {
  switch (status) {
    case "Accepted":
    case "published":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "Rejected":
    case "request_changes":
      return <XCircle className="h-4 w-4 text-red-800" />;
    default:
      return <Clock className="h-4 w-4 text-yellow-500" />;
  }
};

export default function ReviewerDashboard() {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [AssignedPapers, setAssignedPapers] = useState<Paper[]>([]);
  const [review, setReview] = useState("");

  const handleBackClick = () => {
    setSelectedPaper(null);
  };

  const handlePaperClick = (paper: Paper) => {
    setSelectedPaper(paper);
  };

  function sendBackPaper() {
    if (review.trim() === "") {
      alert("Please enter a reason for sending back the paper.");
      return;
    }

    // Update paper status
    if (selectedPaper) {
      // Send updated status to the server
      fetch("http://localhost:5000/api/reviewer/sendBackPaper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article_id: selectedPaper.article_id,
          status: "request_changes",
          review: review,
          token: JSON.parse(localStorage.getItem("user") as string).token,
        }),
      })
        .then(async (response) => {
          let data = (await response.json()) as { message: string };

          if (data.message === "success") {
            alert("Paper sent back to author successfully.");
            // Reload paper list
            setSelectedPaper(null);
          } else {
            alert("Error sending paper back to author.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function acceptPaper() {
    if (!selectedPaper) return;
    // Update paper status/
    fetch("http://localhost:5000/api/reviewer/acceptPaper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article_id: selectedPaper.article_id,
        status: "Accepted",
        token: JSON.parse(localStorage.getItem("user") as string).token,
      }),
    })
      .then(async (response) => {
        let data = (await response.json()) as { message: string };

        if (data.message === "success") {
          alert("Vote has been added Successfully.");
          // Reload paper list
          setSelectedPaper(null);
        } else {
          alert("Error sending vote.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const renderPaperDetail = () => {
    if (!selectedPaper) return null;

    return (
      <>
        <Card>
          <CardHeader>
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="mb-2 text-left w-32 flex items-center justify-between shadow-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to List
            </Button>
            <CardTitle>{selectedPaper.paper_title}</CardTitle>
            <CardDescription>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{selectedPaper.authors.join(", ")}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Calendar className="h-4 w-4" />
                <span suppressHydrationWarning>
                  {new Date(selectedPaper.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="abstract"
              id="paperDetails"
              key={"paperDetails"}
            >
              <TabsList>
                <TabsTrigger value="abstract">Abstract</TabsTrigger>
                <TabsTrigger value="fullText">Full Text</TabsTrigger>
              </TabsList>
              <TabsContent value="abstract">
                <p className="text-sm text-muted-foreground">
                  {selectedPaper.abstract}
                </p>
              </TabsContent>
              <TabsContent value="fullText">
                <PaperContent
                  maxChars={300}
                  content={selectedPaper.paper_content as string}
                />
              </TabsContent>
            </Tabs>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Keywords:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPaper.keywords.split(" ").map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedPaper.status === "request_changes" && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Feedback:</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {selectedPaper.reviews?.map((review, index) => {
                    return (
                      <div key={index}>
                        {review.review} {" - "}
                        On {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    );
                  })}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Badge
              variant={
                selectedPaper.status === "Pending" ||
                selectedPaper.status === "submitted"
                  ? "outline"
                  : selectedPaper.status === "Accepted" ||
                    selectedPaper.status === "published"
                  ? "default"
                  : "destructive"
              }
            >
              <div className="flex items-center space-x-1">
                {getStatusIcon(selectedPaper.status)}
                <span>{selectedPaper.status}</span>
              </div>
            </Badge>
            {selectedPaper.status === "Pending" ||
              (selectedPaper.status === "submitted" && (
                <div className="space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-red-500">Sent Back</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enter Feedback</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will Sent back the
                          paper to the author.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="reason" className="text-right">
                            Suggestions
                          </Label>
                          <Input
                            id="reason"
                            className="col-span-3"
                            value={review}
                            onChange={(event) => {
                              setReview(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          className="bg-red-700"
                          onClick={sendBackPaper}
                        >
                          Sent Back
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button className="bg-green-700" onClick={acceptPaper}>
                    Accept
                  </Button>
                </div>
              ))}
          </CardFooter>
        </Card>
      </>
    );
  };

  async function getPapersForReviewer() {
    // Fetch reviewer papers from the server
    let user = localStorage.getItem("user");
    if (!user) return;

    fetch("http://localhost:5000/api/reviewer/papers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: JSON.parse(user).token,
      }),
    })
      .then(async (response) => {
        let data = (await response.json()) as Paper[];

        data.forEach((paper) => {
          if (paper.paper_content) {
            // Remove Introduction and References
            let paperContent = paper.paper_content.split("INTRODUCTION")[1];
            paperContent = paperContent.split("REFERENCES")[0];
            paperContent = `<h2>Introduction</h2>${paperContent}`;
            paperContent = paperContent.replace("\n", "</br>");
            paperContent = paperContent.replace(
              "ACKNOWLEDGEMENT",
              "<h2>ACKNOWLEDGEMENT</h2>"
            );
            paperContent = paperContent.replace(
              "CONCLUSIONS",
              "<h2>Conclusions</h2>"
            );

            paper.paper_content = paperContent;
          } else {
            paper.paper_content = "No content available";
          }
        });

        setAssignedPapers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function renderPaperList() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assigned Papers</CardTitle>
        </CardHeader>
        <CardContent>
          {AssignedPapers.length > 0 && (
            <Tabs defaultValue="Pending" id="paper-list" key={"paper-list"}>
              <TabsList>
                <TabsTrigger value="Pending">
                  Pending (
                  {
                    AssignedPapers.filter(
                      (p) => p.status === "Pending" || p.status === "submitted"
                    ).length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger value="Accepted">
                  Accepted (
                  {
                    AssignedPapers.filter(
                      (p) => p.status === "Accepted" || p.status === "published"
                    ).length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger value="Rejected">
                  Sent Back (
                  {
                    AssignedPapers.filter(
                      (p) =>
                        p.status === "Rejected" ||
                        p.status === "request_changes"
                    ).length
                  }
                  )
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Pending">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <FilteredPaperList
                    papers={AssignedPapers}
                    status={["Pending", "submitted"]}
                  />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="Accepted">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <FilteredPaperList
                    papers={AssignedPapers}
                    status={["Accepted", "published"]}
                  />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="Rejected">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <FilteredPaperList
                    papers={AssignedPapers}
                    status={["Rejected", "request_changes"]}
                  />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    );
  }

  function FilteredPaperList({
    papers,
    status,
  }: {
    papers: Paper[];
    status: string[];
  }) {
    return (
      <>
        {papers
          .filter((paper) => status.includes(paper.status))
          .map((paper, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:bg-accent"
              onClick={() => handlePaperClick(paper)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{paper.paper_title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{paper.authors.join(", ")}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span suppressHydrationWarning>
                      {new Date(paper.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {paper.abstract}
                </p>
              </CardContent>
              <CardFooter>
                <Badge
                  variant={
                    paper.status === "Pending" || paper.status === "submitted"
                      ? "outline"
                      : paper.status === "Accepted" ||
                        paper.status === "published"
                      ? "default"
                      : "destructive"
                  }
                >
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(paper.status)}
                    <span>{paper.status}</span>
                  </div>
                </Badge>
              </CardFooter>
            </Card>
          ))}
      </>
    );
  }

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      alert("You need to login to access this page.");
      window.location.href = "/";
    }

    if (user) {
      let userType = JSON.parse(user).userType;
      if (userType !== "reviewer") {
        alert("You do not have permission to access this page.");
        window.location.href = "/";
      }
    }

    // Fetch reviewer papers
    getPapersForReviewer();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {selectedPaper ? renderPaperDetail() : renderPaperList()}
    </div>
  );
}
