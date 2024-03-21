import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="m-4">
      <div className="dark:bg-[#1a252f] bg-blue-50 rounded-lg p-4 sm:p-8 text-[#2c3e50] dark:text-[#ffffff] max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <UsersIcon className="text-yellow-400 dark:text-yellow-300" />
              <p className="text-sm uppercase">
                Investors platform to fund startups
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">I am an Investor</h2>
            <p>
              Get access to thousands of verified startups to invest in & expand
              your investment portfolio.
            </p>
            <Button className="bg-[#2c3e50] hover:bg-[#1a252f] dark:bg-[#ffffff] dark:hover:bg-[#e0e0e0] text-white dark:text-[#2c3e50] w-full sm:w-auto">
              <Link to={"/investor-profile"}>Join as Investor</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RocketIcon className="text-yellow-400 dark:text-yellow-300" />
              <p className="text-sm uppercase">Founders apply now to raise</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">I am a Startup</h2>
            <p>
              Get access to thousands of accredited investors & bring value
              added capital to your cap table.
            </p>
            <Button className="bg-[#2c3e50] hover:bg-[#1a252f] dark:bg-[#ffffff] dark:hover:bg-[#e0e0e0] text-white dark:text-[#2c3e50] w-full sm:w-auto">
              <Link to={"/startup-profile"}>Join as Startup</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

function RocketIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
