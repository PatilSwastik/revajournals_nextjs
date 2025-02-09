"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FileText, Bell, Settings, ChevronRight } from "lucide-react";
type Paper = {
  article_id: string;
  paper_title: string;
  authors: string[];
  abstract: string;
  published_at: string;
  status:
    | "pending"
    | "accepted"
    | "rejected"
    | "published"
    | "request_changes"
    | "submitted"
    | "to_review_author";
  keywords: string;
  paper_content?: string;
  reviewers: string[];
  reviews?: Review[];
  edited_upload?: string;
  paper_upload: string;
};
type Review = {
  reviewer_id: string;
  review_content: string;
  review_date: string;
  review_id: string;
  review_status: string;
};
const page = () => {
  return <AuthorDashboard />;
};

export default page;

function AuthorDashboard() {
  const [papers, setPapers] = React.useState<Paper[]>([]);
  const [underReview, setUnderReview] = React.useState([]);
  const [accepted, setAccepted] = React.useState([]);
  const [revisionRequired, setRevisionRequired] = React.useState([]);

  // Mock data for demonstration
  const submissions = [
    {
      id: 1,
      title: "Advances in Quantum Computing",
      status: "Under Review",
      progress: 60,
    },
    {
      id: 2,
      title: "Climate Change Effects on Biodiversity",
      status: "Revision Required",
      progress: 40,
    },
    {
      id: 3,
      title: "Novel Approaches to Cancer Treatment",
      status: "Accepted",
      progress: 100,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      message:
        "Your manuscript 'Novel Approaches to Cancer Treatment' has been accepted.",
      date: "2023-06-15",
    },
    {
      id: 2,
      message:
        "Reviewer comments received for 'Climate Change Effects on Biodiversity'.",
      date: "2023-06-10",
    },
    {
      id: 3,
      message: "New reviewer assigned to 'Advances in Quantum Computing'.",
      date: "2023-06-05",
    },
  ];

  const getAuthorPapers = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      return;
    }

    if (!JSON.parse(user).token && JSON.parse(user).userType !== "author") {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/getpapersbyauthor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: JSON.parse(user).token,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        setPapers(data);

        // Get the count of papers under review
        const underReview = data.filter(
          (paper: any) =>
            paper.status === "pending" || paper.status === "submitted"
        );
        setUnderReview(underReview);

        // Get the count of papers accepted
        const accepted = data.filter(
          (paper: any) =>
            paper.status === "accepted" ||
            paper.status === "published" ||
            paper.status === "approved"
        );
        setAccepted(accepted);

        // Get the count of papers requiring revision
        const revisionRequired = data.filter(
          (paper: any) => paper.status === "request_changes"
        );
        setRevisionRequired(revisionRequired);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getProgressByStatus = (status: string) => {
    switch (status) {
      case "pending":
      case "submitted":
        return 25;
      case "request_changes":
        return 50;
      case "to_review_author":
        return 75;
      case "accepted":
        return 100;
      default:
        return 0;
    }
  };

  const getPaperStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Under Review";
      case "submitted":
        return "Under Review";
      case "request_changes":
        return "Revision Required";
      case "to_review_author":
        return "Revision Required";
      case "accepted":
        return "Accepted";
      default:
        return "Pending";
    }
  };

  useEffect(() => {
    // Get papers published by the author
    getAuthorPapers();
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-dvh">
      <h1 className="text-3xl font-bold mb-6">Author Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="author/submissions" className="block group">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Submissions
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="text-2xl font-bold">{papers.length}</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>
        </Link>
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-2xl font-bold">{underReview.length}</div>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-2xl font-bold">{accepted.length}</div>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revision Required
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-2xl font-bold">{revisionRequired.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Submissions</CardTitle>
            <CardDescription>
              Overview of your manuscript submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {papers.map((submission, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{submission.paper_title}</span>
                  <span className="text-sm text-muted-foreground">
                    {getPaperStatus(submission.status)}
                  </span>
                </div>
                <Progress
                  value={getProgressByStatus(submission.status)}
                  className="w-full"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader></CardHeader>
          <CardContent className="flex">
            <Card>
              <CardHeader>
                <CardTitle>Submit a new paper</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Submit a new paper to the conference. You can submit multiple
                  papers.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant={"default"}>
                  <Link href="/submitmanuscript" className="w-full">
                    Submit Paper
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>View your papers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View all the papers you have submitted to the conference.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant={"outline"}>
                  <Link href="author/submissions" className="w-full">
                    View Papers
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
