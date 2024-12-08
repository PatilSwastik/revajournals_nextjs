import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const page = () => {
  return <AuthorDashboard />;
};

export default page;

function AuthorDashboard() {
  return (
    <div className="container mx-auto p-4 max-w-4xl min-h-dvh">
      <h1 className="text-3xl font-bold mb-6 text-center">Author Dashboard</h1>
      <p className="text-lg mb-8 text-center">
        Welcome to the author dashboard. Here you can manage your submissions,
        view the status of your papers, and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Submit a new paper</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Submit a new paper to the conference. You can submit multiple
              papers.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant={"outline"}>
              <Link href="/submitmanuscript" className="w-full">
                Submit Paper
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>View your papers</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              View all the papers you have submitted to the conference.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant={"outline"}>
              <Link href="author/submissions" className="w-full">
                View Papers
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
