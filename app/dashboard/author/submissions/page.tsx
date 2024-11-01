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
import { CheckCircle, Clock, UserPlus, XCircle } from "lucide-react";

type Paper = {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  submissionDate: string;
  status: "Pending" | "Under Review" | "Accepted" | "Rejected";
  assignedReviewer: string | null;
};

type Reviewer = {
  id: string;
  name: string;
  expertise: string[];
  assignedPapers: number;
};

const mockPapers: Paper[] = [
  {
    id: "1",
    title: "Advancements in Artificial Intelligence: A Comprehensive Review",
    authors: ["John Doe", "Jane Smith"],
    abstract:
      "This paper provides a comprehensive review of recent advancements in artificial intelligence, focusing on machine learning algorithms and their applications in various fields.",
    submissionDate: "2023-05-15",
    status: "Pending",
    assignedReviewer: null,
  },
  {
    id: "2",
    title: "The Impact of Climate Change on Biodiversity: A Global Perspective",
    authors: ["Alice Johnson", "Bob Williams"],
    abstract:
      "This study examines the effects of climate change on global biodiversity, analyzing data from various ecosystems and proposing potential mitigation strategies.",
    submissionDate: "2023-06-01",
    status: "Under Review",
    assignedReviewer: "Dr. Emily Green",
  },
  {
    id: "3",
    title: "Quantum Computing: Challenges and Opportunities",
    authors: ["Eva Brown", "Charlie Davis"],
    abstract:
      "This paper explores the current state of quantum computing, discussing both the challenges faced in its development and the potential opportunities it presents for various industries.",
    submissionDate: "2023-06-10",
    status: "Accepted",
    assignedReviewer: "Prof. Michael Quantum",
  },
];

export default function Submissions() {
  const [papers, setPapers] = useState<Paper[]>([]);

  const getStatusIcon = (status: Paper["status"]) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Under Review":
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

    fetch("http://localhost:5000/api/getpapersbyauthor", {
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
    // Fetch papers from API

    // Get papers published by the author
    getAuthorPapers();
  }, []);

  return (
    <div className="w-full min-h-dvh flex item-center justify-center">
      <Card className="w-full">
        <ScrollArea className="h-[calc(100vh-200px)] w-full">
          <Table className="">
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
              {mockPapers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell>{paper.title}</TableCell>
                  <TableCell>{paper.authors.join(", ")}</TableCell>
                  <TableCell suppressHydrationWarning>
                    {new Date(paper.submissionDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        paper.status === "Pending"
                          ? "outline"
                          : paper.status === "Accepted"
                          ? "default"
                          : paper.status === "Under Review"
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
                  <TableCell>
                    {paper.assignedReviewer || "Not assigned"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      // onClick={() => handlePaperClick(paper)}
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
  );
}
