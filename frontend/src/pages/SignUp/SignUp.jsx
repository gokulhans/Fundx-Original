import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "@/util/axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = ({ setIsUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const navigate = useNavigate();

  // Define Yup schema for form validation
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Use Yup resolver for validation
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axiosClient.post("/user/signup", data);
      console.log(response);
      localStorage.setItem("userid", response.data.user._id);
      localStorage.setItem("type", response.data.user.type);
      setIsUser(true);
      localStorage.setItem("isUser", true);
      console.log("Form submitted successfully");
      setIsLoading(false);
      navigate("/");
      // Reset form fields or perform any other actions upon successful submission
    } catch (error) {
      console.error("Error submitting form data:", error);
      setShowError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to create an account
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="first-name">Name</Label>
            <Input
              id="first-name"
              placeholder="John"
              {...register("name")}
              required
            />
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              {errors.name?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john@example.com"
              required
              type="email"
              {...register("email")}
            />
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              {errors.email?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="********"
              required
              type="password"
              {...register("password")}
            />
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              {errors.password?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              placeholder="********"
              required
              type="password"
              {...register("confirmPassword")}
            />
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              {errors.confirmPassword?.message}
            </p>
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            Sign Up
          </Button>
          {showError && (
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              {showError}
            </p>
          )}
        </form>
        <div className="flex justify-center items-center">
          <Link
            className="text-sm underline text-gray-500 dark:text-gray-400"
            to={"/signin"}
          >
            Already a User? Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
