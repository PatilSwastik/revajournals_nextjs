"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Calendar, User } from "lucide-react";

type Paper = {
  article_id: string;
  paper_title: string;
  short_title: string;
  major_domain: string;
  //   authors: number[];
  abstract: string;
  published_at: string;
  volume_id: number;
  issue_id: number;
  keywords: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Paper[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);

  useEffect(() => {
    let query = searchParams.get("q");
    setQuery(query || "");
    fetch(`http://localhost:5000/api/search?q=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching papers:", error));
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would update the URL and trigger a new search here

    fetch(`http://localhost:5000/api/search?q=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => console.error("Error fetching search results:", error));
  };

  return (
    <div className="w-full h-dvh mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search papers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </form>

      {results && results.length === 0 ? (
        <p>No results found. Try a different search term.</p>
      ) : (
        <div className="space-y-6">
          {results &&
            results.map((paper) => (
              <Card key={paper.article_id}>
                <CardHeader>
                  <CardTitle>{paper.paper_title}</CardTitle>
                  {/* <CardDescription>{paper.authors.join(", ")}</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {paper.abstract}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.keywords.split(" ").map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(paper.published_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-1 h-4 w-4" />
                      Volume {paper.volume_id}, Issue {paper.issue_id}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href={`/researchpapers/${paper.article_id}`}>
                      Read Full Paper
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
