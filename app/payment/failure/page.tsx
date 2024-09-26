import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentFailurePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="text-center">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <XCircle className="w-16 h-16 text-red-500" />
          <p className="text-center text-muted-foreground">
            We&apos;re sorry, but your payment could not be processed. Please
            try again or contact support.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/payment">Try Again</Link>
          </Button>
          <Button asChild>
            <Link href="/contactnpm ">Contact Support</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
