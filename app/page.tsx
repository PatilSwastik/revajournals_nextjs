"use client";
import Image from "next/image";
import "@/app/css/index.css";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const forAuthors = [
    {
      title: "Indexing",
      description: "",
      href: "forauthors/indexing",
    },
    {
      title: "Publishing Information",
      description: "",
      href: "forauthors/publishing",
    },
    {
      title: "Disclosures & Ethics",
      description: "",
      href: "forauthors/disclosures",
    },
    {
      title: "Language Editing Services",
      description: "",
      href: "forauthors/language_edit_services",
    },
    {
      title: "Funding & Open Access Fees",
      description: "",
      href: "forauthors/funding",
    },
    {
      title: "Contact Us",
      description: "",
      href: "forauthors/contact",
    },
  ];

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/auth/signin";
      return;
    }

    if (JSON.parse(user).userType === "reviewer") {
      window.location.href = "/dashboard/reviewer";
    }

    if (JSON.parse(user).userType === "editor") {
      window.location.href = "/dashboard/editor";
    }
  }, []);

  return (
    <>
      <section className="w-full px-4 lg:px-12 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Elevate Your Research with Reva Journals
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Reva Journals is a prestigious community of scholars and
                  researchers dedicated to advancing knowledge and innovation.
                  Publish your groundbreaking work with us.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/submitmanuscript"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#01324b] px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-[#01324b]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Publish Now
                </Link>
              </div>
            </div>
            <Image
              src="/images/Designer2.jpeg"
              width={800}
              height={800}
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col items-center justify-center">
        <div className="w-full px-4 lg:px-12 items-start">
          <h2 className="text-3xl font-bold">For Authors</h2>
        </div>
        <div className="mb-32 grid text-start lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
          {forAuthors.map((instr, index) => (
            <Link
              key={index}
              href={instr.href}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className="mb-3 text-2xl text-start font-semibold">
                {instr.title}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm text-black">
                {instr.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full px-4 lg:px-12 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-start space-y-4">
              <GlobeIcon className="h-12 w-12 text-[#01324b]" />
              <h3 className="text-2xl font-bold">Global Reach</h3>
              <p className="text-muted-foreground text-justify">
                Reva Journals has a global audience, with readers and
                contributors from over 100 countries. Expand the impact of your
                research.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <UserPlusIcon className="h-12 w-12 text-[#01324b]" />
              <h3 className="text-2xl font-bold">Peer Review Process</h3>
              <p className="text-muted-foreground text-justify">
                Our rigorous peer review process ensures the highest standards
                of quality and integrity for every publication.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <BookIcon className="h-12 w-12 text-[#01324b]" />
              <h3 className="text-2xl font-bold">Author Resources</h3>
              <p className="text-muted-foreground text-justify">
                Reva Journals provides a wealth of resources to support authors,
                from writing and formatting guidelines to publication
                assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-12 py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Join the Reva Journals Community
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-justify">
                Reva Journals is a prestigious platform for scholars and
                researchers to share their groundbreaking work. Become a part of
                our vibrant community and contribute to the advancement of
                knowledge.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/submitmanuscript"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#01324b] px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-[#01324b]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Publish Now
              </Link>
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#01324b] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function UserPlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}
