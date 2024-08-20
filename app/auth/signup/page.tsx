import React from "react";
import Image from "next/image";
import SignUpForm from "./signUpForm";

const page = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={50}
          height={50}
          className="mx-auto h-10 w-auto mix-blend-color-burn"
          src="/images/revalogo.png"
          alt="Your Company"
        />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>
      <SignUpForm />
    </div>
  );
};

export default page;
