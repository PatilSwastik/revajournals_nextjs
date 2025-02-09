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
  Upload,
} from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaperContent from "@/app/researchpapers/[paper]/PaperContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
  review: string;
  created_at: string;
  article_id: string;
  reviewer_id: string;
  status: string;
};

export default function Submissions() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedCopy, setEditedCopy] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEditedCopy(file);
    }
  };
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
  const getStatusIcon = (status: Paper["status"]) => {
    switch (status) {
      case "accepted":
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
      case "request_changes":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
      case "submitted":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case "to_review_author":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const submitEditedCopy = async () => {
    if (!editedCopy || !selectedPaper) return;
    const user = localStorage.getItem("user");

    if (!user) {
      return;
    }

    if (!JSON.parse(user).token && JSON.parse(user).userType !== "author") {
      return;
    }

    const formData = new FormData();
    formData.append("token", JSON.parse(user).token);
    formData.append("article_id", selectedPaper.article_id);
    formData.append("file", editedCopy);

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/author/uploadEdited", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        const data = await response.json();
        if (data.success) {
          setIsDialogOpen(false);
          getAuthorPapers();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
        console.log(data);
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
    if (paper.status === "to_review_author") {
      handleOpen(paper);
    }
  };

  const handleBackClick = () => {
    setSelectedPaper(null);
  };

  async function getEditedPaper(paperId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPaper/${paperId}/edited`
      );
      if (!response.ok) {
        // Parse error message if available
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `HTTP error! status: ${response.status}`
        );
      }
      // Check if content type is PDF
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/pdf")) {
        throw new Error("Received non-PDF content type: " + contentType);
      }

      const contentDisposition = response.headers.get("content-disposition");
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/["']/g, "")
        : `document-${paperId}.pdf`;

      // Convert the response to a blob
      const blob = await response.blob();

      // Create a new blob with the PDF type explicitly set
      const pdfBlob = new Blob([blob], { type: "application/pdf" });
      return pdfBlob;
    } catch (error) {
      console.error("Error fetching paper:", error);
      throw error;
    }
  }

  const handleOpen = async (paper: any) => {
    try {
      const pdfBlob = await getEditedPaper(paper.article_id);
      const objectUrl = URL.createObjectURL(pdfBlob);
      if (!iframeRef.current) return;
      iframeRef.current.src = objectUrl;
      URL.revokeObjectURL(objectUrl);
      iframeRef.current.classList.remove("hidden");
    } catch (error) {
      console.error("Error opening paper:", error);
    }
  };

  const handleAccept = async () => {
    if (!selectedPaper) return;
    const user = localStorage.getItem("user");

    if (!user) {
      return;
    }

    if (!JSON.parse(user).token && JSON.parse(user).userType !== "author") {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/author/acceptPaper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: JSON.parse(user).token,
        article_id: selectedPaper.article_id,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (data.success) {
          setSelectedPaper(null);
          getAuthorPapers();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderPaperDetail = () => {
    if (!selectedPaper) return null;
    return (
      <div className="w-full min-h-dvh">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={handleBackClick}
                className="mb-2 text-left w-32 flex items-center justify-between shadow-lg"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to List
              </Button>
              {selectedPaper.status === "to_review_author" && (
                <Button
                  variant="default"
                  className="flex items-center gap-2"
                  onClick={handleAccept}
                >
                  <CheckCircle className="h-4 w-4 text-green-300" />
                  Accept Paper
                </Button>
              )}

              {selectedPaper.status === "request_changes" && (
                <>
                  <Button
                    variant="default"
                    className="flex items-center gap-2"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Upload className="h-4 w-4 text-green-300" />
                    Submit Again
                  </Button>

                  <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle> Upload File </DialogTitle>
                        <DialogDescription>
                          Upload the edited copy of the paper.
                        </DialogDescription>
                      </DialogHeader>
                      <Input
                        id="paper"
                        type="file"
                        onChange={handleFileChange}
                      />

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button variant="default" onClick={submitEditedCopy}>
                          Submit
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>

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
                selectedPaper.status === "pending" ||
                selectedPaper.status === "submitted"
                  ? "outline"
                  : selectedPaper.status === "accepted" ||
                    selectedPaper.status === "published" ||
                    selectedPaper.status === "to_review_author"
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

        {selectedPaper.edited_upload && selectedPaper.status !== "accepted" && (
          <iframe
            ref={iframeRef}
            id="iframe"
            className="hidden"
            style={{ width: "100%", height: "100dvh" }}
          />
        )}
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
                            paper.status === "pending" ||
                            paper.status === "submitted"
                              ? "outline"
                              : paper.status === "accepted" ||
                                paper.status === "published"
                              ? "default"
                              : paper.status === "request_changes" ||
                                paper.status === "rejected" ||
                                paper.status === "to_review_author"
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
