import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "@/util/axios";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const SingleStartup = () => {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        const response = await axiosClient.get(`/startup/${id}`); // Update the URL as per your backend route
        console.log(response.data.data);
        setStartup(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStartupDetails();
  }, [id]);

  const Connect = async (userid) => {
    console.log("called");
    const response = await axiosClient.post("/connect", {
      investor: localStorage.getItem("typeid"),
      startup: userid,
    });
    toast.success("Connection Request Sent successfully");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!startup) return <div>Startup not found</div>;

  return (
    <div className="dark bg-gray-900 w-full py-12">
      <div className="container grid md:gap-6 px-4 md:px-6">
        <div className="flex flex-col mt-3 gap-2 min-[400px]:grid md:gap-4 lg:grid-cols-2 xl:gap-8">
          <div className="mx-auto flex items-center justify-center rounded-lg overflow-hidden border border-gray-200 border-gray-200 bg-white shadow-sm w-full max-w-sm md:max-w-md lg:max-w-sm lg:border-0 lg:rounded-tl-lg lg:rounded-bl-lg dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950">
            <img
              alt="Startup Image"
              className="w-full h-full object-cover"
              src={startup.picture}
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex flex-col mt-3 justify-center gap-2 p-4 md:p-8">
            <h1 className="text-3xl font-bold tracking-tighter lg:text-4xl text-gray-50">
              {startup.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By {startup.fullname} · {startup.createdAt}
            </p>
            <p className="text-base leading-loose text-gray-600 md:text-xl dark:text-gray-400">
              {startup.description}
            </p>
            <div className="flex flex-col mt-3 gap-2">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Location:
                  </p>
                  <p className="text-sm font-medium">{startup.location}</p>
                </div>
                <div className="flex flex-col mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Country:
                  </p>
                  <p className="text-sm font-medium">{startup.country}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Website:
                  </p>
                  <p className="text-sm font-medium">{startup.website}</p>
                </div>
                <div className="flex flex-col mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    LinkedIn URL:
                  </p>
                  <p className="text-sm font-medium">{startup.linkedInUrl}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Company Name:
                  </p>
                  <p className="text-sm font-medium">{startup.companyName}</p>
                </div>
                <div className="flex flex-col mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Occupation:
                  </p>
                  <p className="text-sm font-medium">{startup.occupation}</p>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <Button
                size="lg"
                onClick={() => {
                  Connect(startup._id);
                }}
              >
                Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStartup;
