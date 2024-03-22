import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import axiosClient from "@/util/axios";
import { logoutFunction } from "../LandingPage/LandingPage";
import Homescreen from "@/pages/SubAdmin/Homescreen";
import toast from "react-hot-toast";

const Investors = () => {
  const [investor, setInvestor] = useState([]);

  const [searchResult, setSearchResult] = useState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const investors = await axiosClient.get("investor");
      console.log(investors.data.data);
      setInvestor(investors.data.data);
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredData = investor.filter((entry) =>
      Object.values(entry).some((value) =>
        String(value).toLowerCase().includes(lowerCaseSearchTerm)
      )
    );

    setSearchResult(filteredData);
    console.log(filteredData);
  };
  const handleRemoveInvestor = async (id, name) => {
    const res = confirm(`Are you sure want to delete the Investor : ${name}`);
    if (res === true) {
      const res = await axiosClient.delete(`investor/${id}`);
      console.log(res);
      toast.success("Deleted success");
      window.location.reload();
      setFlag(!flag);
    }
  };

  return (
    <>
      <div className="lg:w-[80%] lg:pl-[10%]">
        <div className="flex flex-col ">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                    placeholder="Search investors..."
                    type="search"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-x-scroll">
            <div className="border shadow-sm rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">No</TableHead>
                    <TableHead>Full name</TableHead>
                    <TableHead>User id</TableHead>
                    <TableHead>Mobile no</TableHead>
                    <TableHead>Secondary no</TableHead>

                    <TableHead>Country</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Website URL</TableHead>

                    <TableHead>Profile created time</TableHead>
                    <TableHead className="w-[100px]">Restrict</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResult
                    ? searchResult.map((data, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.fullname}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data._id}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.mobileNumber}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.alternativeMobileNumber}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.country}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.location}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.gender}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.webSiteUrl}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.createdAt}
                            </TableCell>

                            <TableCell className="font-medium">
                              <Button
                                className="bg-red-500"
                                onClick={() =>
                                  handleRemoveInvestor(data._id, data.fullname)
                                }
                              >
                                Remove investor
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : investor.map((data, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.fullname}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data._id}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.mobileNumber}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.alternativeMobileNumber}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.country}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.location}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.gender}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.webSiteUrl}
                            </TableCell>
                            <TableCell className="font-medium">
                              {data.createdAt}
                            </TableCell>

                            <TableCell className="font-medium">
                              <Button
                                className="bg-red-500"
                                onClick={() =>
                                  handleRemoveInvestor(data._id, data.fullname)
                                }
                              >
                                Remove investor
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>
      <Homescreen />
    </>
  );
};

export default Investors;

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

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}
