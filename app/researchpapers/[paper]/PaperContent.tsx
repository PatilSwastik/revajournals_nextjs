import { useState } from "react";

const PaperContent = ({
  content,
  maxChars = 100,
}: {
  content: string;
  maxChars: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const text = content;
  const shortText = text.slice(0, maxChars);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: isExpanded ? text : shortText + "...",
        }}
      ></div>
      {text.length > maxChars && (
        <button
          className="underline font-bold text-blue-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </>
  );
};

export default PaperContent;
