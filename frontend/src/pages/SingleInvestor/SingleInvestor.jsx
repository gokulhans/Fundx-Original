import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "@/util/axios";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const SingleInvestor = () => {
  const { id } = useParams();
  const [investor, setInvestor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestorDetails = async () => {
      try {
        const response = await axiosClient.get(`/investor/${id}`); // Update the URL as per your backend route
        setInvestor(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInvestorDetails();
  }, [id]);

  const Connect = async (userid) => {
    const response = await axiosClient.post("/connect", {
      startup: localStorage.getItem("typeid"),
      investor: userid,
    });
    if (response.status === 200) {
      toast.success("Connection Request Sent successfully");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!investor) return <div>Investor not found</div>;

  return (
    <div className="dark bg-gray-900 w-full py-12">
      <div className="container grid md:gap-6 px-4 md:px-6">
        <div className="flex flex-col mt-3 gap-2 min-[400px]:grid md:gap-4 lg:grid-cols-2 xl:gap-8">
          <div className="flex flex-col mt-3 justify-center gap-2 p-4 md:p-8">
            <h1 className="text-3xl font-bold tracking-tighter lg:text-4xl text-gray-50">
              {investor.firstname}
            </h1>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
              LinkedIn URL: {investor.linkedInUrl}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
              Mobile Number: {investor.mobileNumber}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
              Description: {investor.description}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
              Assets Over 2 Crore: {investor.assetsOver2Cr}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
              Country: {investor.country}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
              Gender: {investor.gender}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
              Location: {investor.location}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
              Professional Headline: {investor.professionalHeadline}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
              Website URL: {investor.webSiteUrl}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
              Summary: {investor.summary}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-3 mb-8">
              Alternative Mobile Number: {investor.alternativeMobileNumber}
            </p>
            {/* Add more details here */}
            <div className="mt-auto">
              <Button size="lg" onClick={() => Connect(investor._id)}>
                Connect With {investor.firstname}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleInvestor;
