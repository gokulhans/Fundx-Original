import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "@/util/axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignIn = ({ setIsUser, setisStartup, setisInvestor }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const navigate = useNavigate();

  // Define Yup schema for form validation
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
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
      const response = await axiosClient.post("/user/signin", data);

      if (response.status === 200) {
        // Sign-in successful
        setIsUser(true);
        console.log(response);
        localStorage.setItem("isUser", true);
        localStorage.setItem("userid", response.data.user._id);
        localStorage.setItem("type", response.data.user.type);
        localStorage.setItem("typeid", response.data.user.typeid);
        console.log("Sign-in successful");
        setIsLoading(false);
        if (response.data.user.type === "startup") {
          setisStartup(true);
        } else if (response.data.user.type === "investor") {
          setisInvestor(true);
        } else {
          setisStartup(false);
          setisInvestor(false);
        }
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      setShowError(error.response.data.message);
      setIsLoading(false);
      // Handle error, show message to user, etc.
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to create an account
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
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
          <Button className="w-full" type="submit" disabled={isLoading}>
            Sign In
          </Button>
          {showError && (
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              {showError}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mt-5">
          <Link
            className="text-sm underline text-gray-500 dark:text-gray-400"
            to={"/forgot-password"}
          >
            Forgot Password?
          </Link>
          <Link
            className="text-sm underline text-gray-500 dark:text-gray-400"
            to={"/signup"}
          >
            New User? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
