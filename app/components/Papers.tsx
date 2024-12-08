"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";

const Papers = () => {
  interface Volume {
    volume_id: number;
    volume_title: string;
    currentIssue: number;
    volume_year: string;
  }

  interface Article {
    article_id: number;
    paper_title: string;
    authors: string[];
    published_at: Date;
  }

  const [selectedIssue, setSelectedIssue] = useState(0);
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [selectedVolume, setSelectedVolume] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  function getAllArticles(volume_id: number, issue: number) {
    fetch(`http://localhost:5000/api/getarticles/${volume_id}/${issue}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function getAllVolumes() {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/getvolumes")
      .then((response) => response.json())
      .then((data) => {
        setVolumes(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    // Get all volumes
    getAllVolumes();
  }, []);

  return (
    <div className="w-full md:h-full flex flex-col gap-1 lg:flex-row">
      <div className="w-full h-32 lg:min-h-full lg:w-1/3 border lg:p-2 overflow-y-scroll lg:overflow-auto">
        <div className="w-full min-h-full rounded lg:overflow-hidden shadow-lg bg-white p-2">
          <div className="font-bold text-xl text-center mb-2">Issues</div>
          <div>
            {volumes.map((volume) => (
              <div key={volume.volume_id}>
                <div
                  className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <ChevronDown className="w-16 h-4" />
                  ) : (
                    <ChevronRight className="w-16 h-4" />
                  )}
                  <div className="w-64 flex items-center flex-row gap-2">
                    <Folder className="w-4 h-4 text-yellow-500" />
                    <span>{volume.volume_title}</span>
                  </div>
                  <div className="w-full flex justify-end text-sm">
                    {volume.volume_year}
                  </div>
                </div>
                {isOpen && (
                  <div className="ml-12">
                    {Array.from(
                      { length: volume.currentIssue },
                      (_, i) => i + 1
                    ).map((issue) => (
                      <div
                        key={issue}
                        className="flex gap-2  items-center p-2 border-b cursor-pointer"
                        onClick={() => {
                          setSelectedVolume(volume.volume_title);
                          setSelectedIssue(issue);
                          getAllArticles(volume.volume_id, issue);
                        }}
                      >
                        <File className="w-4 h-4 text-gray-500" />
                        <span className="text-sm"> Issue {issue}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="min-h-full w-full lg:w-2/3 border lg:p-2">
        <div className="w-full h-full rounded lg:overflow-hidden shadow-lg bg-white p-2">
          {selectedIssue > 0 && (
            <>
              <div className="font-bold text-l text-center mb-2">
                {selectedVolume} , Issue {selectedIssue} Articles
              </div>
              {articles.length > 0 && (
                <div>
                  {articles.map((article, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 border-b"
                    >
                      <div>
                        <div className="text-lg font-bold">
                          {article.paper_title}
                        </div>
                        <div className="flex flex-row gap-2">
                          {article.authors.map((author, index) => (
                            <div key={index} className="text-sm font-bold">
                              {author}{" "}
                              {index < article.authors.length - 1 && ","}
                            </div>
                          ))}
                        </div>
                        <div className="text-sm">
                          Year :{" "}
                          {article.published_at
                            ? String(
                                new Date(article.published_at).getFullYear()
                              )
                            : ""}
                        </div>

                        <Link href={`/researchpapers/${article.article_id}`}>
                          <button className="text-sm">Read More {"->"}</button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Papers;
