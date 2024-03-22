import React from "react";
import { Link } from "react-router-dom";

const WebsiteHome = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Trusted by Investors
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
              The Future of Funding
            </h1>
            <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Connect with the next generation of innovators. Our platform
              streamlines the investment process, so you can focus on
              discovering the best opportunities.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
            to={"/signin"}
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="/signin"
            >
              Sign Up
            </Link>
            {/* <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Learn More
            </Link> */}
          </div>
        </div>
      </div>
      <div className="container px-8 md:px-16 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter">Our Mission</h2>
            <p className="text-gray-500 mt-2">
              We are dedicated to revolutionizing the way investments are made,
              ensuring that every opportunity is accessible and transparent.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tighter">
              Why Choose Us?
            </h2>
            <p className="text-gray-500 mt-2">
              Our platform offers a seamless experience for both investors and
              innovators, bridging the gap between great ideas and funding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteHome;
