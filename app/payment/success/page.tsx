import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function page() {
  // Get the payment status

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="text-center">Payment Successful</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
          <p className="text-center text-muted-foreground">
            Your payment has been processed successfully. Thank you for your
            purchase!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
