import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";

export async function POST(req, res) {
  const data = await req.formData();

  const merchantId = data.get("merchantId");
  const transactionId = data.get("transactionId");

  const st = `/pg/v1/status/${merchantId}/${transactionId}${process.env.SALT_KEY}`;
  const dataSha256 = sha256(st);

  const checksum = dataSha256 + "###" + process.env.SALT_INDEX;

  const options = {
    method: "GET",

    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": merchantId,
    },

    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
  };

  const response = await axios.request(options);

  if (response.data.code === "PAYMENT_SUCCESS") {
    // Save the transaction details in the database
    const storeResponse = await fetch(
      "http://localhost:3000/payment/storepayment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: response.data.data,
        }),
      }
    );
    if (!storeResponse.ok) {
      console.error("Failed to store payment details.");
      return NextResponse.redirect("http://localhost:3000/payment/failure", {
        status: 301,
      });
    }

    const storeData = await storeResponse.json();

    return NextResponse.redirect("http://localhost:3000/payment/success", {
      status: 301,
      data: response.data.data,
    });
  } else {
    return NextResponse.redirect("http://localhost:3000/payment/failure", {
      status: 301,
    });
  }
}
