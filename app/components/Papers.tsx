"use client";
import React, { useState } from "react";

const Papers = () => {
  const [isSelected, setSelectedIssue] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const issues = [
    {
      issue: "Issue 1",
      volume: "Volume 1",
      year: "2024",
    },
    {
      issue: "Issue 2",
      volume: "Volume 1",
      year: "2024",
    },
  ];

  const articles = [
    {
      title: "Article title",
      author: "Author 1",
      publishedDate: "2024-01-01",
    },
    {
      title: "Article title",
      author: "Author 2",
      publishedDate: "2024-02-02",
    },
  ];

  return (
    <div className="w-full md:h-full flex flex-col gap-1 lg:flex-row">
      <div className="w-full h-32 lg:min-h-full lg:w-1/3 border lg:p-2 overflow-y-scroll lg:overflow-auto">
        <div className="w-full min-h-full rounded lg:overflow-hidden shadow-lg bg-white p-2">
          <div className="font-bold text-xl text-center mb-2">Issues</div>
          <div>
            {issues.map((issue, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 border-b cursor-pointer"
                onClick={() => {
                  setSelectedIndex(index);
                  setSelectedIssue(true);
                }}
              >
                <div>
                  <div className="text-sm">
                    {issue.volume} , {issue.issue}
                  </div>
                </div>
                <div className="text-sm">{issue.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="min-h-full w-full lg:w-2/3 border lg:p-2">
        <div className="w-full h-full rounded lg:overflow-hidden shadow-lg bg-white p-2">
          {isSelected && (
            <>
              <div className="font-bold text-l text-center mb-2">
                {issues[selectedIndex].volume} , {issues[selectedIndex].issue}{" "}
                Articles
              </div>
              <div>
                {articles.map((article, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b"
                    onClick={() => {
                      setSelectedIndex(index);
                      setSelectedIssue(true);
                    }}
                  >
                    <div>
                      <div className="text-sm">{article.title}</div>
                      <div className="text-sm">{article.author}</div>
                      <button className="text-sm">Read More {"->"}</button>
                    </div>
                    <div className="text-sm">{article.publishedDate}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Papers;
