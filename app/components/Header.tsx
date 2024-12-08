"use client";

import React, { use } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const navigation = {
    pages: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Editorial Board", href: "/editors" },
      { name: "View Articles", href: "/researchpapers" },
    ],
  };
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(false);
  const [name, setName] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);

  function SearchFunc() {
    if (query === "") {
      setSearchOpen(!searchOpen);
    } else {
      // Redirect to search page
      window.location.href = `/search?q=${query}`;

      // Serach Functionality
      setSearchOpen(!searchOpen);
    }
  }

  useEffect(() => {
    // Retrieve User details from local storage
    const user = localStorage.getItem("user");
    if (user) {
      // Redirect to home page
      setUser(true);
      let short_name = String(JSON.parse(user).username);
      setName(short_name);

      // Check if user is author
      if (JSON.parse(user).userType === "author") {
        setIsAuthor(true);
      }
    }
  }, []);

  return (
    <header className="header relative text-black">
      <nav aria-label="Top" className="mx-auto px-4">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="ml-4 gap-2 flex items-center lg:ml-0">
              <Link href="/">
                <span className="sr-only">REVA JOURNALS</span>
                <Image
                  height={50}
                  width={50}
                  src="/images/revalogo.png"
                  alt="REVA JOURNALS"
                  className="max-h-8 lg:max-h-12 w-auto"
                />
              </Link>
              <h3 className="mt-0 mb-0 lg:text-2xl font-bold hidden md:block">
                REVA JOURNALS
              </h3>
            </div>

            {/* Flyout menus */}
            <div className="hidden lg:ml-8 lg:flex items-center gap-10 lg:self-stretch">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#01324b] px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-[#01324b]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="/submitmanuscript"
              >
                Submit Manuscript
              </Link>
              <div className="flex h-full space-x-8">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-b-2 hover:border-primary-foreground"
                  >
                    {page.name}
                  </Link>
                ))}
                {isAuthor && (
                  <Link
                    href="/dashboard/author"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-b-2 hover:border-primary-foreground"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>

            <div className="ml-auto flex items-center">
              {/* Auth */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {name.split(" ")[0][0]}
                          {name.split(" ")[1][0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile/edit"
                        className="cursor-pointer flex w-full items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Edit Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        let res = confirm("Are you sure you want to logout?");
                        if (res) {
                          localStorage.removeItem("user");
                          setUser(false);
                          window.location.href = "/";
                        }
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    href="/auth/signin"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sign in
                  </Link>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <Link
                    href="/auth/signup"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Create account
                  </Link>
                </div>
              )}

              {/* Search */}
              <div className="flex lg:ml-6">
                {/* Expanded Search */}
                {searchOpen && (
                  <div className="absolute top-14 left-0 w-full items-center">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      type="text"
                      placeholder="Search"
                      className="border-b outline-none h-12 w-full searchBarAppearance"
                    />
                  </div>
                )}
                <div className="p-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="h-6 w-6"
                    onClick={SearchFunc}
                  />
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            {open && (
              <div
                className={`fixed inset-0 z-10 transition-opacity ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="absolute inset-y-0 right-0 max-w-full flex flex-col w-full bg-white shadow-lg">
                  <div className="p-6 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center">
                      <Image
                        height={50}
                        width={50}
                        src="/images/revalogo.png"
                        alt="REVA JOURNALS"
                        className="h-12 w-auto"
                      />
                      <span className="logo-name">REVA JOURNALS</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-md p-2 text-gray-400"
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="p-6 flex flex-col gap-6">
                    <a
                      href="#"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-[#01324b] px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-[#01324b]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Submit Manuscript
                    </a>
                    <div className="flex flex-col gap-4">
                      {navigation.pages.map((page) => (
                        <Link
                          href={page.href}
                          key={page.name}
                          onClick={() => setOpen(false)}
                          className="text-lg font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </Link>
                      ))}
                      {isAuthor && (
                        <Link
                          href="/dashboard/author"
                          className="text-lg font-medium text-gray-700 hover:text-gray-800"
                        >
                          Dashboard
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-200 flex items-center justify-between">
                    {user ? (
                      <button
                        onClick={() => {
                          let res = confirm("Are you sure you want to logout?");
                          if (res) {
                            localStorage.removeItem("user");
                            setUser(false);
                          }
                        }}
                      >
                        Logout
                      </button>
                    ) : (
                      <div className="w-full flex justify-around items-center">
                        <Link
                          href="/auth/signin"
                          onClick={() => setOpen(false)}
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Sign in
                        </Link>
                        <span
                          aria-hidden="true"
                          className="h-6 w-px bg-gray-200"
                        />
                        <Link
                          href="/auth/signup"
                          onClick={() => setOpen(false)}
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Create account
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
