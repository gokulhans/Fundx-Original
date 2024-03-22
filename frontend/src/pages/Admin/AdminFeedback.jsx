import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "@/util/axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminHome from "./AdminHome";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch complaints from backend
    const fetchComplaints = async () => {
      try {
        const response = await axiosClient.get("/feedback");
        setFeedbacks(response.data.data); // Assuming response.data is an array of complaints
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
        Feedbacks
      </Label>
      {feedbacks.map((feedback, index) => (
        <Card key={index} className="my-2">
          <CardHeader className="p-2">
            <p>{feedback.feedback}</p>
          </CardHeader>
        </Card>
      ))}
    </>
  );
};

export default AdminFeedback;
