import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosClient from "@/util/axios";

const StartupProfileForm = ({ setisStartup }) => {
  const [showError, setShowError] = useState(null);
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    fullname: yup.string().required("Full Name is required"),
    linkedInUrl: yup.string().url("Enter a valid LinkedIn URL").nullable(),
    mobileNumber: yup
      .string()
      .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number")
      .nullable(),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    occupation: yup.string().required("Occupation is required"),
    companyName: yup.string().required("Company Name is required"),
    description: yup.string().nullable(),
    country: yup.string().required("Country is required"),
    gender: yup.string().required("Gender is required"),
    location: yup.string().nullable(),
    website: yup.string().url("Enter a valid website URL").nullable(),
    alternativeMobileNumber: yup
      .string()
      .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number")
      .nullable(),
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
    const pictureBase64 = await convertToBase64(image);
    const formDataWithImage = {
      ...data,
      userid: localStorage.getItem("userid"),
      picture: pictureBase64,
    };
    try {
      const response = await axiosClient.post("/startup", formDataWithImage);
      console.log(response.data.data._id);
      localStorage.setItem("typeid", response.data.data._id);
      toast.success("Startup Profile Completed Successfully !");
      // const { username, id, token, email } = data.data;
      localStorage.setItem("type", "startup");
      setisStartup(true);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form data:", error);
      setShowError(error.response.data.message);
      // Handle error, show message to user, etc.
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="flex w-full max-w-xl my-5 mb-12 flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        className="w-full max-w-xl mx-auto space-y-6 bg-white dark:bg-gray-800 shadow-md rounded-md p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Startup Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to complete Startup Profile
          </p>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="picture">Profile Picture</Label>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="name"
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="fullname"
            placeholder="Enter your full name"
            {...register("fullname")}
          />
          {errors.fullname && (
            <p className="text-red-500">{errors.fullname.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="linkedInUrl">LinkedIn URL</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="linkedInUrl"
            placeholder="Enter your LinkedIn URL"
            {...register("linkedInUrl")}
          />
          {errors.linkedInUrl && (
            <p className="text-red-500">{errors.linkedInUrl.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="mobileNumber"
            placeholder="Enter your mobile number"
            {...register("mobileNumber")}
          />
          {errors.mobileNumber && (
            <p className="text-red-500">{errors.mobileNumber.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="dateOfBirth"
            type="date"
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="occupation">Role</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="occupation"
            placeholder="Enter your role"
            {...register("occupation")}
          />
          {errors.occupation && (
            <p className="text-red-500">{errors.occupation.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="companyName"
            placeholder="Enter your company name"
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="text-red-500">{errors.companyName.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="description">Company Details</Label>
          <Textarea
            className="bg-gray-100 dark:bg-gray-700"
            id="description"
            placeholder="Enter Company Details"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <label htmlFor="country" className="block text-sm font-medium">
            Country
          </label>
          <select
            id="country"
            {...register("country")}
            className={`py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 ${
              errors.country ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Country</option>
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
            <option value="uk">United Kingdom</option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <label htmlFor="gender" className="block text-sm font-medium ">
            Gender
          </label>
          <select
            id="gender"
            {...register("gender")}
            className={`py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 ${
              errors.gender ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="location"
            placeholder="Enter your location"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="website">Website Link</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="website"
            type="url"
            placeholder="Enter your website link"
            {...register("website")}
          />
          {errors.website && (
            <p className="text-red-500">{errors.website.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="alternativeMobileNumber">
            Alternative Mobile Number
          </Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="alternativeMobileNumber"
            placeholder="Enter alternative mobile number"
            {...register("alternativeMobileNumber")}
          />
          {errors.alternativeMobileNumber && (
            <p className="text-red-500">
              {errors.alternativeMobileNumber.message}
            </p>
          )}
        </div>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
      {showError && <p className="text-red-500">{showError}</p>}
    </div>
  );
};

export default StartupProfileForm;
