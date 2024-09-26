"use client";
import React from "react";
import "@/app/css/about_us.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const page = () => {
  const domains = [
    { name: "Algorithms and Data Structures" },
    { name: "Artificial Intelligence" },
    { name: "Biometrics and Computer Forensics" },
    { name: "Computer and Communication Networks" },
    { name: "Computer and Network Performance" },
    { name: "Computer Architecture" },
    { name: "Computer Graphics" },
    { name: "Computer Vision" },
    { name: "Computational Biology and Bioinformatics" },
    { name: "Computers and Networks for Health Systems" },
    { name: "Computers and Networks in Supply Chains and Manufacturing" },
    { name: "Cyber-Physical Systems" },
    { name: "Database Systems and Theory" },
    { name: "Distributed and Cloud Computing" },
    { name: "Document and Handwriting Processing" },
    { name: "Economics and Computation" },
    { name: "Energy Consumption and Harvesting Computers & Networks" },
    { name: "High Performance Computing" },
    { name: "Human-Computer Interface" },
    { name: "Information Retrieval" },
    { name: "Information Theory" },
    { name: "Internet Computing and Data Mining" },
    { name: "Machine learning" },
    { name: "Mathematical Programming and Combinatorial Optimization" },
    { name: "Modeling and Simulation" },
    { name: "Programming Languages" },
    { name: "Quantum AI/ ML" },
    { name: "Robotics" },
    { name: "Social Networks" },
    { name: "Software Engineering" },
    { name: "Speech and Signal Processing" },
    { name: "Soft Computing" },
  ];
  return (
    <div className="flex py-8">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 flex flex-col items-center justify-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                About Reva Journals
              </h1>
              <p className="max-w-[900px] text-justify text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Reva Journals is an extension of the research and development
                centre of Reva Technologies which helps to achieve the mission
                of Reva technologies that is “Escalate the Tech Revolution in to
                Reality” by publishing the young researchers innovation and
                research in the field of Computer science and Engineering
                including multidisciplinary aspects of other Engineering and
                Science disciplines.
              </p>
              <div></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Our Aim</h2>
              <p className="max-w-[900px] text-black text-justify md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                REVA JOURNALS is a broad-based, peer-reviewed journal that
                publishes original research in all disciplines of computer
                science and Engineering including multidisciplinary branches,
                and various interdisciplinary aspects.
              </p>
              <Accordion type="single" collapsible className="w-full p-0">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-medium text-xl">
                    Disciplines
                  </AccordionTrigger>
                  <AccordionContent>
                    {domains.map((domain, index) => {
                      return (
                        <h3 className="text-xl font-bold" key={index}>
                          {domain.name}
                        </h3>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="max-w-[900px] text-black text-justify md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                At REVA JOURNALS, our mission is to “Escalate Tech Revolution
                into Reality and to serve as a catalyst for intellectual
                advancement by providing a comprehensive platform for scholarly
                discourse and dissemination of research findings. We are
                dedicated to fostering an inclusive environment that encourages
                collaboration, innovation, and diversity of thought across
                various industry and academic disciplines. Through rigorous peer
                review processes and a commitment to academic and industrial
                excellence, we aim to empower researchers, educators, and
                practitioners to make meaningful contributions to their
                respective fields and address the challenges facing society
                today.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
              <p className="max-w-[900px] text-black text-justify md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Our vision at REVA JOURNALS is to be a global leader in
                scholarly publishing, recognized for our unwavering dedication
                to advancing knowledge and driving positive change in the world.
                We aspire to cultivate a vibrant community of researchers and
                scholars, united by a shared passion for discovery and
                intellectual inquiry. By leveraging cutting-edge technology and
                embracing emerging trends in industry and academic publishing,
                we seek to revolutionize the way knowledge is created,
                disseminated, and applied. Ultimately, we envision a future
                where access to high-quality research is universal, empowering
                individuals and institutions to address complex societal issues
                and shape a more equitable and sustainable world.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
