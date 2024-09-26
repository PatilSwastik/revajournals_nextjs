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

type Paper = {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  submissionDate: string;
  status: "Pending" | "Accepted" | "Rejected";
  keywords: string[];
  fullText: string;
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
    keywords: ["Artificial Intelligence", "Machine Learning", "Deep Learning"],
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "2",
    title: "The Impact of Climate Change on Biodiversity: A Global Perspective",
    authors: ["Alice Johnson", "Bob Williams"],
    abstract:
      "This study examines the effects of climate change on global biodiversity, analyzing data from various ecosystems and proposing potential mitigation strategies.",
    submissionDate: "2023-06-01",
    status: "Accepted",
    keywords: ["Climate Change", "Biodiversity", "Ecology"],
    fullText:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "3",
    title: "Quantum Computing: Challenges and Opportunities",
    authors: ["Eva Brown", "Charlie Davis"],
    abstract:
      "This paper explores the current state of quantum computing, discussing both the challenges faced in its development and the potential opportunities it presents for various industries.",
    submissionDate: "2023-06-10",
    status: "Rejected",
    keywords: ["Quantum Computing", "Computer Science", "Technology"],
    fullText:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
];

export default function ReviewerDashboard() {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  const handlePaperClick = (paper: Paper) => {
    setSelectedPaper(paper);
  };

  const handleBackClick = () => {
    setSelectedPaper(null);
  };

  const getStatusIcon = (status: Paper["status"]) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const renderPaperList = () => (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-4">
        {mockPapers.map((paper) => (
          <Card
            key={paper.id}
            className="cursor-pointer hover:bg-accent"
            onClick={() => handlePaperClick(paper)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{paper.title}</CardTitle>
              <CardDescription>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{paper.authors.join(", ")}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="h-4 w-4" />
                  <span suppressHydrationWarning>
                    {new Date(paper.submissionDate).toLocaleDateString()}
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
                  paper.status === "Pending"
                    ? "outline"
                    : paper.status === "Accepted"
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
      </div>
    </ScrollArea>
  );

  const renderPaperDetail = () => {
    if (!selectedPaper) return null;

    return (
      <Card>
        <CardHeader>
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="mb-2 text-left"
          >
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
          <Tabs defaultValue="abstract">
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
              <ScrollArea className="h-[400px]">
                <p className="text-sm text-muted-foreground">
                  {selectedPaper.fullText}
                </p>
              </ScrollArea>
            </TabsContent>
          </Tabs>
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Keywords:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedPaper.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Badge
            variant={
              selectedPaper.status === "Pending"
                ? "outline"
                : selectedPaper.status === "Accepted"
                ? "default"
                : "destructive"
            }
          >
            <div className="flex items-center space-x-1">
              {getStatusIcon(selectedPaper.status)}
              <span>{selectedPaper.status}</span>
            </div>
          </Badge>
          {selectedPaper.status === "Pending" && (
            <div className="space-x-2">
              <Button variant="outline">Reject</Button>
              <Button>Accept</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    );
  };

  async function getPapersForReviewer() {}

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
      <h1 className="text-3xl font-bold mb-6">Reviewer Dashboard</h1>
      {selectedPaper ? renderPaperDetail() : renderPaperList()}
    </div>
  );
}
