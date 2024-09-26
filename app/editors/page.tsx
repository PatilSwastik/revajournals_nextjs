import React from "react";
import Image from "next/image";

const page = () => {
  const editors = [
    {
      id: 1,
      name: "Mr. Rahul Kapse",
      email: "demo@gmail.com",
      role: "Co-Founder Reva Technologies",
      extra: "Associate Professor Pillai HOC College Engineering & Technology",
    },
    {
      id: 2,
      name: "Ms. Vasanti K",
      email: "demo@gmail.com",
      role: "Corporate Advisory Board",
      extra: "Founder & CEO at Reva Technologies, Navi Mumbai",
    },
    {
      id: 3,
      name: "Dr. Rajashree G",
      email: "demo@gmail.com",
      role: "Advisory Board",
      extra:
        "Associate Professor, Pillai HOC College of Engineering & Technology",
    },
    {
      id: 4,
      name: "Dr. Nilesh Madhukar Patil",
      email: "demo@gmail.com",
      role: "Advisory Board",
      extra: "Associate Professor, D.J. Sanghvi College of Engineering, Mumbai",
    },
    {
      id: 5,
      name: "Dr. Aruna Pawate",
      email: "demo@gmail.com",
      role: "Advisory Board",
      extra:
        "Assistant Professor, Symbiosis Skills and Professional University Pune",
    },
    {
      id: 6,
      name: "Dr. Rohini Patil",
      email: "demo@gmail.com",
      role: "Advisory Board",
      extra: "Assistant Professor, Terna College of Engineering, Navi Mumbai",
    },
    {
      id: 7,
      name: "Dr. Manish Rana",
      email: "demo@gmail.com",
      role: "Advisory Board",
      extra:
        "Associate Professor, Thakur College of Engineering & Technology, Mumbai",
    },
    {
      id: 8,
      name: "Mr. Sagar Yashwantrao",
      email: "demo@gmail.com",
      role: " Partner Editor",
      extra:
        "Assistant Professor, Pillai HOC College of Engineering & Technology",
    },
  ];

  return (
    <div className="w-full min-h-dvh flex item-center justify-center">
      <div className=" p-4">
        <ul
          role="list"
          className="divide-y grid grid-cols-1 gap-4 w-full divide-gray-100"
        >
          {editors.map((editor, index) => (
            <li
              className="flex justify-between gap-x-6 py-5 rounded-sm bg-white px-3"
              key={index}
            >
              <div className="flex min-w-0 gap-x-4">
                <Image
                  width={48}
                  height={48}
                  className="flex-none rounded-full bg-gray-50"
                  src="/images/revalogo.png"
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {editor.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {editor.email}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{editor.role}</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {editor.extra}{" "}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
