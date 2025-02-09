import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  UserIcon,
  LockOpenIcon,
  MoveLeft,
  ChevronLeft,
} from "lucide-react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

const PaperList = () => {
  const [data, setData] = React.useState([]);
  const [selectedPaper, setSelectedPaper] = React.useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    setFile(files[0]);
  };

  useEffect(() => {
    getAllPapers();
  }, []);
  async function getAllPapers() {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/editor/getAllPapers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: JSON.parse(localStorage.getItem("user") as string).token,
      }),
    })
      .then(async (response) => {
        let data = await response.json();
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      editor: "!bg-yellow-100 !text-yellow-800",
      published: "!bg-green-100 !text-green-800",
      accepted: "!bg-green-100 !text-green-800",
      rejected: "!bg-red-100 !text-red-800",
      pending: "!bg-blue-100 !text-blue-800",
    };
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  async function getPaper(paperId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPaper/${paperId}`
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

  const handleOpen = (paper: any) => async () => {
    setSelectedPaper(paper);
    try {
      const pdfBlob = await getPaper(paper.article_id);
      const objectUrl = URL.createObjectURL(pdfBlob);
      const iframe = document.querySelector("#iframe") as HTMLIFrameElement;
      if (!iframe) return;
      iframe.src = objectUrl;
      URL.revokeObjectURL(objectUrl);
      iframe.classList.remove("hidden");
    } catch (error) {
      console.error("Error opening paper:", error);
    }
  };

  const submitEditedCopy = () => {
    if (!file || !selectedPaper) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);
    formData.append("article_id", selectedPaper.article_id as string);
    formData.append("paper_upload", selectedPaper.paper_upload);
    formData.append(
      "token",
      JSON.parse(localStorage.getItem("user") as string).token
    );

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/editor/submitEditedManuscript`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then(async (response) => {
        if (response.ok) {
          toast.success("Edited copy submitted successfully");
          setDialogOpen(false);
          setSelectedPaper(null);
          getAllPapers();
        } else {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.error || `HTTP error! status: ${response.status}`
          );
        }
      })
      .catch((error) => {
        console.error("Error submitting edited copy:", error);
      });
  };

  return (
    <>
      {data && data.length > 0 ? (
        !selectedPaper &&
        data.map((paper: any, index) => (
          <Card
            key={paper.article_id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleOpen(paper)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold">
                    {paper.paper_title}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{paper.short_title}</p>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="secondary"
                    className={getStatusColor(paper.status)}
                  >
                    {paper.status.toUpperCase()}
                  </Badge>
                  {paper.access_type === "closed" ? (
                    <LockClosedIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <LockOpenIcon className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">{paper.abstract}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {paper.keywords
                    .split(",")
                    .map((keyword: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword.trim()}
                      </Badge>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <UserIcon className="h-4 w-4" />
                    <span>
                      Authors:{" "}
                      {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                          .map((i) => paper[`author_${i}`])
                          .filter(Boolean).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Created: {formatDate(paper.created_at)}</span>
                  </div>
                  {paper.published_at && (
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Published: {formatDate(paper.published_at)}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-lg text-gray-500">No papers available</p>
        </div>
      )}

      {selectedPaper && (
        <div className="h-full w-full flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <Button onClick={() => setSelectedPaper(null)} variant="ghost">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
            <Button variant="outline" onClick={() => setDialogOpen(true)}>
              Submit Paper
            </Button>
            <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle> Upload File </DialogTitle>
                  <DialogDescription>
                    Upload the edited copy of the paper.
                  </DialogDescription>
                </DialogHeader>
                <Input id="paper" type="file" onChange={handleFileChange} />

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="default" onClick={submitEditedCopy}>
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <iframe
            id="iframe"
            className="hidden"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </>
  );
};

export default PaperList;
