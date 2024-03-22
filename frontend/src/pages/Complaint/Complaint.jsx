import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "@/util/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Complaint = () => {
  // Define Yup schema for form validation
  // const [complaints, setComplaints] = useState([]);

  // useEffect(() => {
  //   // Fetch complaints from backend
  //   const fetchComplaints = async () => {
  //     try {
  //       const response = await axiosClient.get("/complaint");
  //       setComplaints(response.data.data); // Assuming response.data is an array of complaints
  //     } catch (error) {
  //       console.error("Error fetching complaints:", error);
  //     }
  //   };

  //   fetchComplaints();
  // }, []);

  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    complaint: yup.string().required("Complaint is required"),
  });

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      userid: localStorage.getItem("userid"),
    };
    try {
      // Send POST request to the server
      const response = await axiosClient.post("/complaint", formData);
      console.log(response.data); // Log the response data
      // Display a success message to the user
      alert("Complaint submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      // Display an error message to the user
      alert("Error submitting complaint. Please try again later.");
    }
  };

  // JSX for the complaint form
  return (
    <>
      <Card className="w-full max-w-lg p-2">
        <form
          className="grid gap-2 p-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label htmlFor="complaint" className="p-2 font-bold">
            Complaint
          </Label>
          <Textarea
            {...register("complaint")}
            id="complaint"
            placeholder="Enter your complaint."
          />
          {errors.complaint && <div>{errors.complaint.message}</div>}
          <Button className="justify-center w-full" type="submit">
            Submit
          </Button>
        </form>
      </Card>
      {/* <Label htmlFor="complaint" className="p-2 font-bold text-lg my-8">
        All Complaints
      </Label>
      {complaints.map((complaint, index) => (
        <Card key={index} className="my-2">
          <CardHeader className="p-2">
            <p>{complaint.complaint}</p>
          </CardHeader>
        </Card>
      ))} */}
    </>
  );
};

export default Complaint;
