"use client";

import React, { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Calendar,
  User,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  UserPlus,
} from "lucide-react";

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

const mockReviewers: Reviewer[] = [
  {
    id: "1",
    name: "Dr. Emily Green",
    expertise: ["Ecology", "Climate Science"],
    assignedPapers: 1,
  },
  {
    id: "2",
    name: "Prof. Michael Quantum",
    expertise: ["Quantum Physics", "Computer Science"],
    assignedPapers: 1,
  },
  {
    id: "3",
    name: "Dr. Sarah AI",
    expertise: ["Artificial Intelligence", "Machine Learning"],
    assignedPapers: 0,
  },
];

export default function AdminDashboard() {
  const [papers, setPapers] = useState<Paper[]>(mockPapers);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [reviewers] = useState<Reviewer[]>(mockReviewers);

  const handlePaperClick = (paper: Paper) => {
    setSelectedPaper(paper);
  };

  const handleBackClick = () => {
    setSelectedPaper(null);
  };

  const handleAssignReviewer = (paperId: string, reviewerId: string) => {
    setPapers(
      papers.map((paper) => {
        if (paper.id === paperId) {
          const assignedReviewer =
            reviewers.find((r) => r.id === reviewerId)?.name || null;
          return { ...paper, assignedReviewer, status: "Under Review" };
        }
        return paper;
      })
    );
    setSelectedPaper(null);
  };

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

  const renderPaperList = () => (
    <Card>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Authors</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Reviewer</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {papers.map((paper) => (
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
  );

  const renderPaperDetail = () => {
    if (!selectedPaper) return null;

    return (
      <Card>
        <CardHeader>
          <Button variant="ghost" onClick={handleBackClick} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Button>
          <CardTitle>{selectedPaper.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{selectedPaper.authors.join(", ")}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Calendar className="h-4 w-4" />
              <span suppressHydrationWarning>
                {new Date(selectedPaper.submissionDate).toLocaleDateString()}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">Abstract</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {selectedPaper.abstract}
          </p>
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">Status:</h3>
            <Badge
              variant={
                selectedPaper.status === "Pending"
                  ? "outline"
                  : selectedPaper.status === "Accepted"
                  ? "default"
                  : selectedPaper.status === "Under Review"
                  ? "secondary"
                  : "destructive"
              }
            >
              <div className="flex items-center space-x-1">
                {getStatusIcon(selectedPaper.status)}
                <span>{selectedPaper.status}</span>
              </div>
            </Badge>
          </div>
          {selectedPaper.assignedReviewer && (
            <p className="mt-2">
              <span className="font-semibold">Assigned Reviewer:</span>{" "}
              {selectedPaper.assignedReviewer}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <h3 className="font-semibold mb-2">Assign Reviewer</h3>
            <Select
              onValueChange={(value) =>
                handleAssignReviewer(selectedPaper.id, value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a reviewer" />
              </SelectTrigger>
              <SelectContent>
                {reviewers.map((reviewer) => (
                  <SelectItem key={reviewer.id} value={reviewer.id}>
                    {reviewer.name} ({reviewer.assignedPapers} assigned)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="papers">
        <TabsList className="mb-4">
          <TabsTrigger value="papers">Papers</TabsTrigger>
          <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
        </TabsList>
        <TabsContent value="papers">
          {selectedPaper ? renderPaperDetail() : renderPaperList()}
        </TabsContent>
        <TabsContent value="reviewers">
          <Card>
            <CardHeader>
              <CardTitle>Reviewers</CardTitle>
              <CardDescription>Manage and view all reviewers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Assigned Papers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviewers.map((reviewer) => (
                    <TableRow key={reviewer.id}>
                      <TableCell>{reviewer.name}</TableCell>
                      <TableCell>{reviewer.expertise.join(", ")}</TableCell>
                      <TableCell>{reviewer.assignedPapers}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
