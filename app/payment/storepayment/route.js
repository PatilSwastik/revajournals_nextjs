import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/storepayment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: body.data }),
  });

  return NextResponse.json({ message: "Payment data stored successfully" });
}
