"use client";
import Image from "next/image";
import Link from "next/link";
import Authentication from "./_components/Authentication";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";
import { toast } from "sonner";

export default function Home() {
  const user = useAuthContext();

  const handleConvertNow = (e: any) => {
    if (!user?.user?.email) {
      e.preventDefault();
      toast("Please login first by clicking on Get Started");
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between w-full bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 dark:bg-neutral-800 dark:border-neutral-700">
        <Link href={"/"} className="flex items-center">
          <Image src={"/logo.svg"} alt="logo" width={150} height={150} />
        </Link>

        <div className="flex items-center gap-x-4">
          {!user?.user?.email ? (
            <Authentication>
              <div className="flex items-center gap-x-2 cursor-pointer font-medium text-gray-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-500">
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                Get Started
              </div>
            </Authentication>
          ) : (
            <ProfileAvatar />
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-screen flex flex-col items-center mt-20 md:mt-0 md:justify-center text-center">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              Turn Your Wireframes Into
              <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                {" "}
                Production-Ready Code
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg text-gray-600 dark:text-neutral-400">
              Upload your wireframe image and let our AI instantly generate clean, developer-friendly code. Save hours of work and focus on building great products.
            </p>

            <div className="mt-8 gap-3 flex justify-center">
              <Link
                href="/dashboard"
                onClick={handleConvertNow}
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
              >
                Convert Now
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
