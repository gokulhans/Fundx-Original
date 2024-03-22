import React, { useState, useEffect } from "react";
import axiosClient from "@/util/axios";
import { Link } from "react-router-dom";

const StartUpHome = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await axiosClient.get("/investor"); // Update the URL as per your backend route
        setInvestors(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-start justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Investor Showcase
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Explore our top investors and their profiles.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {investors.map((investor, index) => (
            <div className="p-4 w-full min-w-96" key={index}>
              <div className="bg-white dark:bg-gray-950 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 flex flex-col items-start">
                  <h3 className="text-xl font-bold mt-4">
                    {investor.firstname}
                  </h3>
                  <p className="text-sm text-center mt-2 text-gray-500 dark:text-gray-400">
                    {investor.summary}
                  </p>
                  <div className="flex flex-col items-center mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Country:
                    </p>
                    <p className="text-sm font-medium">{investor.country}</p>
                  </div>

                  <div className="flex flex-col items-center mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Mobile Number:
                    </p>
                    <p className="text-sm font-medium">
                      {investor.mobileNumber}
                    </p>
                  </div>
                  <div className="flex flex-col items-center mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Location:
                    </p>
                    <p className="text-sm font-medium">{investor.location}</p>
                  </div>
                  <Link
                    to={`/investor/${investor._id}`}
                    className="block w-full py-2 mt-6 rounded-md dark:bg-gray-700 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartUpHome;
