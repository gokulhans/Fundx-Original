import React, { useEffect, useState } from "react";
import axiosClient from "@/util/axios";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import AdminHome from "./AdminHome";

const AdminComplaint = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints from backend
    const fetchComplaints = async () => {
      try {
        const response = await axiosClient.get("/complaint");
        setComplaints(response.data.data); // Assuming response.data is an array of complaints
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);
  return (
    <>
      <AdminHome />
      <Label htmlFor="complaint" className="p-2 font-bold text-lg my-8">
        Complaints
      </Label>
      {complaints.map((complaint, index) => (
        <Card key={index} className="my-2">
          <CardHeader className="p-2">
            <p>{complaint.complaint}</p>
          </CardHeader>
        </Card>
      ))}
    </>
  );
};

export default AdminComplaint;
