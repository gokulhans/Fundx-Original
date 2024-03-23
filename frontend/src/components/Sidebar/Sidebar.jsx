import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {localStorage.getItem("type") == "investor" ? (
        <div className="fixed left-0 top-0 h-full w-48 flex flex-col justify-center items-start p-4 py-8">
          <ul className="flex flex-col gap-2 bg-gray-800 p-4 w-36 rounded">
            <Link
              to={"/"}
              className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
            >
              Home
            </Link>
            <Link
              to={"/startups"}
              className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
            >
              All Startups
            </Link>
            <Link
              to={"/investors"}
              className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
            >
              All Investors
            </Link>
            <Link
              to={`/investor/${localStorage.getItem("typeid")}`}
              className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
            >
              Profile
            </Link>
            {/* <Link className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700">
              Edit Profile
            </Link> */}
            <Link
              className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
              to={"/requests"}
            >
              Requests
            </Link>
            <Link
              to={"/feedback"}
              className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
            >
              Feedback
            </Link>
            <Link
              to={"/complaint"}
              className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
            >
              Complaints
            </Link>
          </ul>
        </div>
      ) : (
        <>
          <div className="fixed left-0 top-0 h-full w-48 flex flex-col justify-center items-start p-4 py-8">
            <ul className="flex flex-col gap-2 bg-gray-800 p-4 w-36 rounded">
              <Link
                to={"/"}
                className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
              >
                Home
              </Link>
              <Link
                to={"/startups"}
                className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
              >
                All Startups
              </Link>
              <Link
                to={"/investors"}
                className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
              >
                All Investors
              </Link>
              <Link
                to={`/startup/${localStorage.getItem("typeid")}`}
                className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
              >
                Profile
              </Link>
              {/* <Link className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700">
                Edit Profile
              </Link> */}
              <Link
                to={"/requests"}
                className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
              >
                Requests
              </Link>
              <Link
                to={"/feedback"}
                className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
              >
                Feedback
              </Link>
              <Link
                to={"/complaint"}
                className="text-white text-sm font-bold p-1 px-3 rounded border shadow-md bg-gray-700"
              >
                Complaints
              </Link>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
