"use client";
import React from "react";
import { Download, Info, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateTransactionId } from "@/app/lib/utils";

export default function page() {
  function downloadTemplate() {
    const link = document.createElement("a");
    link.href = "/papers/REVA_JOURNAL_TEMPLATE.docx";
    link.download = "REVA_JOURNAL_TEMPLATE.docx";
    link.click();
  }

  function downloadCopyrightForm() {
    const link = document.createElement("a");
    link.href = "/papers/REVA_JOURNAL_COPYRIGHT_FORM.docx";
    link.download = "REVA_JOURNAL_COPYRIGHT_FORM.docx";
    link.click();
  }

  async function buyAPC() {
    // Payment gateway integration

    // Check if user is logged in
    let user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to pay APC");
      return;
    }

    // validate user as author
    fetch("http://localhost:5000/api/auth/validateauthor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: JSON.parse(user).token,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (!data.isAuthor) {
          alert(
            "You need your author profile complete to pay APC, you will be redirected to the author registration page."
          );
          window.location.href = "/forauthors/authorregistration";
          return;
        }

        // Check if user is already paid
        const res = await fetch("http://localhost:5000/api/checkapc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(user).token,
          }),
        });

        const result = await res.json();
        if (result.subscribed) {
          alert("You have already paid the APC fee.");
          return;
        }

        const apcFees = {
          UGStudents: 5000,
          PGStudents: 7000,
          ResearchScholar: 8000,
          ForeignAuthors: 100,
        };

        let amount = 8397.91;
        if (data.position === "UG") {
          amount = apcFees.UGStudents;
        } else if (data.position === "PG") {
          amount = apcFees.PGStudents;
        } else if (data.position === "Researcher") {
          amount = apcFees.ResearchScholar;
        } else {
          amount = apcFees.ForeignAuthors;
        }

        const transactionId = await generateTransactionId();
        // Buy APC
        fetch("http://localhost:5000/api/phonepay/buy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(user).token,
            payment_type: "publishing",
            merchantId: "PGTESTPAYUAT",
            merchantTransactionId: transactionId,
            merchantUserId: "MUID123",
            name: JSON.parse(user).username,
            amount: amount,
            mobileNumber: "9999999999",
            paymentInstrument: {
              type: "PAY_PAGE",
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Open the payment page in a current tab
            window.location.href =
              data.response.data.instrumentResponse.redirectInfo.url;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="w-9/12 container mx-auto p-4 space-y-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Reva Journals</h1>
        <div className="w-full flex justify-center gap-4">
          <Button variant="outline" onClick={() => downloadTemplate()}>
            <Download className="mr-2 h-4 w-4" /> Download Template
          </Button>
          <Button variant="outline" onClick={() => downloadCopyrightForm()}>
            <Download className="mr-2 h-4 w-4" /> Download Copyright Form
          </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Publication Methods</CardTitle>
          <CardDescription>
            Reva Journals is a hybrid open access publication venue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="regular">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="regular">Regular Publishing</TabsTrigger>
              <TabsTrigger value="openaccess">Open Access</TabsTrigger>
            </TabsList>
            <TabsContent value="regular">
              <p>
                Articles are published and made accessible to subscribing
                institutions and individuals of Reva Journals. Non-subscribers
                may access specific articles by paying for access.
              </p>
            </TabsContent>
            <TabsContent value="openaccess">
              <p>
                Upon acceptance, authors or their funding bodies will cover an
                Article Processing Fee (APF). Following payment, the final
                version of the published article becomes freely accessible to
                all readers.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>APC Fees</CardTitle>
          <Button variant="outline" onClick={() => buyAPC()}>
            <Banknote className="mr-2 h-4 w-4" /> Pay APC
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>UG Students</TableCell>
                <TableCell>₹5000 INR</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PG Students</TableCell>
                <TableCell>₹7000 INR</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Research Scholar</TableCell>
                <TableCell>₹8000 INR</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Foreign Authors</TableCell>
                <TableCell>$100 USD</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
            <p className="text-sm">
              Authors may be required to take specific measures to ensure
              compliance with open access mandates from funders and
              institutions. If your research is funded by an organization that
              mandates immediate open access, such as according to Plan S
              principles, it is advisable to choose the gold open access option.
              In such cases, we will guide you towards a compliant publishing
              method whenever feasible.
            </p>
          </div>
          <div className="flex items-start space-x-2 mt-4">
            <Info className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
            <p className="text-sm">
              For authors opting for the subscription-based publication method,
              it is necessary to adhere to the {`journal's`} standard licensing
              terms, including policies related to self-archiving. These
              licensing terms take precedence over any other terms asserted by
              the author or any third party regarding any version of the
              manuscript.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
