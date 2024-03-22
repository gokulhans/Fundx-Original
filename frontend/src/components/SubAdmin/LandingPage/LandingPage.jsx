import React, { useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { DollarSignIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import axiosClient from "@/util/axios";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const [users, setUsers] = useState();
  const [investors, setInvestors] = useState();
  const [startups, setStartups] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await axiosClient.get("user/getAll");
      setUsers(usersData.data.length);

      const startupData = await axiosClient.get("startup/getAll");
      setStartups(startupData.data.length);

      const investorsData = await axiosClient.get("investor/getAll");
      setInvestors(investorsData.data.length);
    };
    fetchData();
  }, []);

  const logoutFunction = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="flex flex-col ">
    
      <div className="w-full h-[30vh] flex flex-col justify-center items-center ">
        <h1 className=" font-semibold text-4xl">Subadmin Panel Hub</h1>
        <h1 className="mt-5 font-normal text-lg">
          Streamline Control, Simplify Management{" "}
        </h1>
      </div>
      <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-2">
        {/* <Link to="/users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{users - 1}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
        </Link> */}
        <Link to="/subadmin/investors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Investors</CardTitle>
              <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{investors}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/subadmin/startups">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Startups</CardTitle>
              <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{startups}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export const logoutFunction = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("token");
  window.location.reload();
};
