import React from "react";
import PaperFormat from "./PaperFormat";

const page = ({ params }: { params: { paper: string } }) => {
  return <PaperFormat paperId={params.paper} />;
};

export default page;
