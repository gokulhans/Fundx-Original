import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "@/util/axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setIsUser, setisStartup, setisInvestor }) => {
  const [errorMessage, setErrorMessage] = useState("");
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
    try {
      const response = await axiosClient.post("/user/signin", data);

      if (response.status === 200) {
        // Sign-in successful
        setIsUser(true);
        console.log(response);
        localStorage.setItem("isUser", true);
        localStorage.setItem("username", response.data.user._id);
        localStorage.setItem("type", response.data.user.type);
        console.log("Sign-in successful");
        if (response.data.user.type == "startup") {
          setisStartup(true);
        } else if (response.data.user.type == "investor") {
          setisInvestor(true);
        } else {
          setisStartup(false);
          setisInvestor(false);
        }
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      setErrorMessage(error.response.data.message);
      // Handle error, show message to user, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={`form-input mt-1 block w-full ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className={`form-input mt-1 block w-full ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <div className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </div>
        )}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </div>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
};

export default SignIn;
