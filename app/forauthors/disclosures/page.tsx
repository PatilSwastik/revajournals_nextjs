import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Book,
  Users,
  AlertTriangle,
  Heart,
  FileText,
} from "lucide-react";

const EthicalPrinciple: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <Card className="mb-4">
    <CardHeader className="flex flex-row items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 text-primary">
        {icon}
      </div>
      <CardTitle className="!m-0">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

export default function page() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Reva Journals Disclosure Page
      </h1>
      <p className="text-lg mb-8 text-center">
        At Reva Journals, we adhere to rigorous ethical standards to ensure the
        integrity and trustworthiness of published research. Authors, reviewers,
        and editors are expected to uphold the following ethical principles.
      </p>

      <EthicalPrinciple
        title="Plagiarism"
        description="Authors must ensure that their work is original and properly cited, avoiding all forms of plagiarism."
        icon={<Book />}
      />

      <EthicalPrinciple
        title="Data Integrity"
        description="Authors should accurately report their research findings and provide access to underlying data when possible. Any data fabrication or falsification is strictly prohibited."
        icon={<FileText />}
      />

      <EthicalPrinciple
        title="Authorship"
        description="All individuals who have made significant contributions to the research must be listed as authors. Proper acknowledgment of contributions is essential to maintaining transparency and fairness."
        icon={<Users />}
      />

      <EthicalPrinciple
        title="Conflicts of Interest"
        description="Authors, reviewers, and editors must disclose any conflicts of interest that could influence the interpretation or evaluation of the research. Financial conflicts, personal relationships, or institutional affiliations that may bias the work should be declared."
        icon={<AlertTriangle />}
      />

      <EthicalPrinciple
        title="Ethical Treatment of Subjects"
        description="Research involving human or animal subjects must comply with ethical guidelines and regulatory standards. Authors should provide evidence of obtaining informed consent from human participants and demonstrate adherence to animal welfare protocols."
        icon={<Heart />}
      />

      <div className="mt-8 p-4 bg-blue-50 rounded-lg flex items-start space-x-4">
        <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
        <p className="text-sm text-blue-700">
          These ethical principles are fundamental to maintaining the highest
          standards of academic integrity and research quality. All parties
          involved in the publication process are expected to adhere to these
          guidelines to ensure the credibility and reliability of published work
          in Reva Journals.
        </p>
      </div>
    </div>
  );
}
