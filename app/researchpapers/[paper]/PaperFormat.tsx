"use client";
import React, { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Download,
  FileText,
  Share2,
  Users,
  Lock,
  Car,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import PaperContent from "./PaperContent";

const PaperFormat = ({ paperId }: { paperId: string }) => {
  const [isOpenAccess, setOpenAccess] = React.useState(false);

  const toggleAccess = () => {
    setOpenAccess(!isOpenAccess);
  };

  const [paper, setPaper] = React.useState<any | null>(null);
  const [keywords, setKeywords] = React.useState<string[]>([]);

  //   Function to download paper
  async function downloadPaper() {
    // Check if paper is open access
    if (!isOpenAccess) {
      alert("This paper requires a subscription to download.");
      return;
    }

    // Check user subscription
    let userSubscribed = await checkSubscription();
    if (!userSubscribed) {
      alert("You need to subscribe to download this paper.");
    } else {
      fetch(`http://localhost:5000/api/download/${paperId}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${paper.paper_title}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  const checkSubscription = useCallback(async (): Promise<boolean> => {
    let user = localStorage.getItem("user") || "";

    if (user === "") {
      alert("You need to login to download this paper.");
      return false;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/checksubscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(user).token,
          }),
        }
      );

      const data = await response.json();

      if (data.subscribed) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }, []);

  const validateUser = useCallback(async () => {
    let userSubscribed = await checkSubscription();
    if (userSubscribed) {
      setOpenAccess(true);
    }
  }, [checkSubscription]);

  useEffect(() => {
    const fetchPaperAndCheckAccess = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getarticle/${paperId}`
        );
        const data = await response.json();

        if (data.paper_content) {
          // Remove Introduction and References
          let paperContent = data.paper_content.split("INTRODUCTION")[1];
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

          data.paper_content = paperContent;
        } else {
          data.paper_content = "No content available";
        }

        setPaper(data);
        setKeywords(data.keywords.split(" "));

        if (data.access_type === "open") {
          setOpenAccess(true);
        } else {
          await validateUser();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPaperAndCheckAccess();
  }, [paperId, validateUser]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {!paper ? (
        <>Loading</>
      ) : (
        <>
          <header className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {paper.paper_title}
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                by {paper.authors.map((auth: any) => auth.name).join(", ")}
              </p>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <Card>
                  <CardHeader>
                    <CardTitle>Abstract</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {paper.abstract}
                    </p>
                  </CardContent>
                </Card>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Keywords</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {isOpenAccess ? (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Full Paper Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PaperContent
                        maxChars={300}
                        content={paper.paper_content}
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Full Paper Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Alert>
                        <Lock className="h-4 w-4" />
                        <AlertTitle>Subscription Required</AlertTitle>
                        <AlertDescription>
                          This paper requires a subscription to access the full
                          content. Please subscribe or log in to read the entire
                          paper.
                        </AlertDescription>
                      </Alert>
                      <div className="mt-4">
                        <Link href="/payment">
                          <Button className="w-full">Subscribe Now</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>References</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {paper.refs
                        .split("\n")
                        .map((ref: string, index: number) => {
                          return <div key={index}>{ref}</div>;
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:w-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle>Paper Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Published in:
                        </span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Volume: {paper.volume_id}, Issue: {paper.issue_id},
                          Pages:
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Citations:
                        </span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <Button
                        className="w-full bg-[#01324b]"
                        onClick={downloadPaper}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Views
                        </span>
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          1,234
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Downloads
                        </span>
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          567
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Altmetric Score
                        </span>
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          42
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Toggle button for demonstration purposes */}
                <Button onClick={toggleAccess} className="mt-6 w-full">
                  Toggle Open Access (Demo)
                </Button>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default PaperFormat;
