import React from "react";

const page = () => {
  const disclosures = [
    {
      title: "Reva Journals",
      content:
        "At Reva Journals, we adhere to rigorous ethical standards to ensure the integrity and trustworthiness of published research. Authors, reviewers, and editors are expected to uphold the following ethical principles.",
    },
    {
      title: "Plagiarism",
      content:
        "Authors must ensure that their work is original and properly cited, avoiding all forms of plagiarism.",
    },
    {
      title: "Data Integrity",
      content:
        "Authors should accurately report their research findings and provide access to underlying data when possible. Any data fabrication or falsification is strictly prohibited.",
    },
    {
      title: "Authorship",
      content:
        "All individuals who have made significant contributions to the research must be listed as authors. Proper acknowledgment of contributions is essential to maintaining transparency and fairness.",
    },
    {
      title: "Conflicts of Interest",
      content:
        "Authors, reviewers, and editors must disclose any conflicts of interest that could influence the interpretation or evaluation of the research. Financial conflicts, personal relationships, or institutional affiliations that may bias the work should be declared.",
    },
    {
      title: "Ethical Treatment of Subjects",
      content:
        "Research involving human or animal subjects must comply with ethical guidelines and regulatory standards. Authors should provide evidence of obtaining informed consent from human participants and demonstrate adherence to animal welfare protocols.",
    },
  ];

  return (
    <div className=" h-dvh py-8">
      {disclosures.map((disclosure, index) => (
        <div key={index}>
          <h2>{disclosure.title}</h2>
          <p>{disclosure.content}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
