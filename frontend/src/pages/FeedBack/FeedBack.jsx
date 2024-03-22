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

const FeedBack = () => {
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

  const validationSchema = yup.object().shape({
    feedback: yup.string().required("Feedback is required"),
    rating: yup.string().required("Rating is required"),
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
      const response = await axiosClient.post("/feedback", formData);
      console.log(response.data); // Log the response data
      // Display a success message to the user
      alert("Feedback submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Display an error message to the user
      alert("Error submitting feedback. Please try again later.");
    }
  };

  return (
    <>
      <Card className="w-full max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-col gap-1">
            <CardTitle>How satisfied are you with our service?</CardTitle>
            <CardDescription>
              Please rate your satisfaction with our customer service.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-5 items-center gap-2">
              <Label className="text-sm" htmlFor="rating">
                Rate us out of 10
              </Label>
              <Input
                {...register("rating")}
                id="rating"
                type="number"
                placeholder="Enter your rating."
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                className="min-h-[100px]"
                id="feedback"
                placeholder="How can we improve?"
                {...register("feedback")}
              />
            </div>
            {errors.rating && (
              <span className="text-red-600">{errors.rating.message}</span>
            )}
            {errors.feedback && (
              <span className="text-red-600">{errors.feedback.message}</span>
            )}
          </CardContent>
          <CardFooter className="flex">
            <Button className="ml-auto" type="submit">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Label htmlFor="complaint" className="p-2 font-bold text-lg my-8">
        All Feedbacks
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

export default FeedBack;
