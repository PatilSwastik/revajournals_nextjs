"use client";
import React from "react";
import { generateTransactionId } from "../lib/utils";

const PaymentPage = () => {
  // Buy Subscription
  const buySubscription = async () => {
    let user = localStorage.getItem("user") || "";
    if (user === "") {
      alert("You need to login to buy a subscription.");
      return;
    }

    try {
      const transactionId = await generateTransactionId();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/phonepay/buy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(user).token,
            payment_type: "subscription",
            merchantId: "PGTESTPAYUAT",
            merchantTransactionId: transactionId,
            merchantUserId: "MUID123",
            name: JSON.parse(user).username,
            amount: 10000,
            mobileNumber: "9999999999",
            paymentInstrument: {
              type: "PAY_PAGE",
            },
          }),
        }
      );

      const data = await response.json();

      if (data.response.error) {
        alert(data.response.error.message);
        return;
      }

      // Open the payment page in a current tab
      window.location.href =
        data.response.data.instrumentResponse.redirectInfo.url;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="h-dvh flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">Payment Page</div>
        <div className="mt-4">
          <button
            onClick={buySubscription}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Buy Subscription
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
