"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  Clock,
  UserPlus,
  XCircle,
  ArrowLeft,
  Calendar,
  User,
} from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaperContent from "@/app/researchpapers/[paper]/PaperContent";

type Paper = {
  article_id: string;
  paper_title: string;
  authors: string[];
  abstract: string;
  published_at: string;
  status:
    | "Pending"
    | "Accepted"
    | "Rejected"
    | "published"
    | "request_changes"
    | "submitted";
  keywords: string;
  paper_content?: string;
  reviewers: string[];
  reviews?: Review[];
};

type Review = {
  review: string;
  created_at: string;
  article_id: string;
  reviewer_id: string;
  status: string;
};

export default function Submissions() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  const getStatusIcon = (status: Paper["status"]) => {
    switch (status) {
      case "Accepted":
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Rejected":
      case "request_changes":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Pending":
      case "submitted":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Get papers published by the author
    getAuthorPapers();
  }, []);

  const handlePaperClick = (paper: Paper) => {
    setSelectedPaper(paper);
  };

  const handleBackClick = () => {
    setSelectedPaper(null);
  };

  const renderPaperDetail = () => {
    if (!selectedPaper) return null;
    return (
      <div className="w-full min-h-screen">
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
                  {new Date(selectedPaper.published_at).toLocaleDateString()}
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="text-sm font-semibold mb-2">Abstract:</h4>
              <p className="text-sm text-muted-foreground">
                {selectedPaper.abstract}
              </p>
            </div>

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

            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Full Text:</h4>
              <PaperContent
                maxChars={300}
                content={selectedPaper.paper_content as string}
              />
            </div>

            {selectedPaper.status === "request_changes" && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Feedback:</h4>
                <div className="text-sm line-clamp-2">
                  {selectedPaper.reviews &&
                    selectedPaper.reviews?.map((review, index) => {
                      return (
                        <div key={index}>
                          {review.review} {" - "}
                          On {new Date(review.created_at).toLocaleDateString()}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <h4 className="text-sm font-semibold mb-2">
                Assigned Reviewers:
              </h4>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{selectedPaper.reviewers.join(", ")}</span>
              </div>
            </div>
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
          </CardFooter>
        </Card>
      </div>
    );
  };

  return (
    <>
      {!selectedPaper ? (
        <div className="w-full min-h-dvh flex item-center justify-center">
          <Card className="w-full">
            <ScrollArea className="h-[calc(100vh-200px)] w-full p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Authors</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Reviewer</TableHead>
                    <TableHead>Edit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {papers.map((paper) => (
                    <TableRow key={paper.article_id}>
                      <TableCell>{paper.paper_title}</TableCell>
                      <TableCell>
                        {paper.authors[0]}
                        {", et. al"}
                      </TableCell>
                      <TableCell suppressHydrationWarning>
                        {new Date(paper.published_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            paper.status === "Pending" ||
                            paper.status === "submitted"
                              ? "outline"
                              : paper.status === "Accepted" ||
                                paper.status === "published"
                              ? "default"
                              : paper.status === "request_changes" ||
                                paper.status === "Rejected"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(paper.status)}
                            <span>{paper.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>{paper.reviewers[0]}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePaperClick(paper)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </div>
      ) : (
        renderPaperDetail()
      )}
    </>
  );
}
