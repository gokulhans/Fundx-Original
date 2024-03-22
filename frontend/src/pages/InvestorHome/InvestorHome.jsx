import React, { useState, useEffect } from "react";
import axiosClient from "@/util/axios";
import { Link } from "react-router-dom";

const InvestorHome = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axiosClient.get("/startup"); // Update the URL as per your backend route
        setStartups(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Startup Showcase
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Discover the most innovative startups in the world.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 items-stretch justify-center md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            startups.map((startup, index) => (
              <div className="p-4" key={index}>
                <div className="bg-white dark:bg-gray-950 shadow-lg rounded-lg overflow-hidden">
                  <img
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-t-lg object-cover object-center"
                    src={startup.picture}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mt-4">{startup.name}</h3>
                    <p className="text-sm text-center mt-2 text-gray-500 dark:text-gray-400">
                      {startup.description}
                    </p>
                    <Link
                      to={`/startup/${startup._id}`}
                      className="block w-full py-2 mt-4 rounded-md dark:bg-gray-700 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default InvestorHome;
