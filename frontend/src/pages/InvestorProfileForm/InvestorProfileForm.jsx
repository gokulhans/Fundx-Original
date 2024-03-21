import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosClient from "@/util/axios";

const InvestorProfileForm = ({ setisInvestor }) => {
  const [showError, setShowError] = useState(null);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    linkedInUrl: yup
      .string()
      .required("LinkedIn URL is required")
      .url("Enter a valid LinkedIn URL"),
    firstname: yup.string().required("First Name is required"),
    mobileNumber: yup
      .string()
      .required("Mobile Number is required")
      .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
    description: yup.string().required("Description is required"),
    assetsOver2Cr: yup.string().required("Assets Over 2 Cr is required"),
    country: yup.string().required("Country is required"),
    gender: yup.string().required("Gender is required"),
    location: yup.string().required("Location is required"),
    professionalHeadline: yup
      .string()
      .required("Professional Headline is required"),
    webSiteUrl: yup
      .string()
      .required("Website URL is required")
      .url("Enter a valid website URL"),
    summary: yup.string().required("Summary is required"),
    alternativeMobileNumber: yup
      .string()
      .required("Alternative Mobile Number is required")
      .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("/investor", data);
      toast.success("Investor Profile Completed Successfully !");
      localStorage.setItem("type", "investor");
      setisInvestor(true);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form data:", error);
      setShowError(error.response.data.message);
    }
  };

  return (
    <div className="flex w-full max-w-xl my-5 mb-12 flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        className="w-full max-w-xl mx-auto space-y-6 bg-white dark:bg-gray-800 shadow-md rounded-md p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Investor Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to complete Investor Profile
          </p>
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
          <Label htmlFor="firstname">First Name</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="firstname"
            placeholder="Enter your first name"
            {...register("firstname")}
          />
          {errors.firstname && (
            <p className="text-red-500">{errors.firstname.message}</p>
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
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="bg-gray-100 dark:bg-gray-700"
            id="description"
            placeholder="Enter description"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="assetsOver2Cr">Assets Over 2 Cr</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="assetsOver2Cr"
            placeholder="Enter assets over 2 Cr"
            {...register("assetsOver2Cr")}
          />
          {errors.assetsOver2Cr && (
            <p className="text-red-500">{errors.assetsOver2Cr.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="country">Country</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="country"
            placeholder="Enter country"
            {...register("country")}
          />
          {errors.country && (
            <p className="text-red-500">{errors.country.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="gender">Gender</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="gender"
            placeholder="Enter gender"
            {...register("gender")}
          />
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="location"
            placeholder="Enter location"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="professionalHeadline">Professional Headline</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="professionalHeadline"
            placeholder="Enter professional headline"
            {...register("professionalHeadline")}
          />
          {errors.professionalHeadline && (
            <p className="text-red-500">
              {errors.professionalHeadline.message}
            </p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="webSiteUrl">Website URL</Label>
          <Input
            className="bg-gray-100 dark:bg-gray-700"
            id="webSiteUrl"
            placeholder="Enter website URL"
            {...register("webSiteUrl")}
          />
          {errors.webSiteUrl && (
            <p className="text-red-500">{errors.webSiteUrl.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            className="bg-gray-100 dark:bg-gray-700"
            id="summary"
            placeholder="Enter summary"
            {...register("summary")}
          />
          {errors.summary && (
            <p className="text-red-500">{errors.summary.message}</p>
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

export default InvestorProfileForm;
