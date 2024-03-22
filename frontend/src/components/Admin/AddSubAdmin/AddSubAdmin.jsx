import React from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "@/util/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddSubAdmin = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),

    password: yup.string().min(4).max(10).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    axiosClient
      .post("/subadmin/create", data)
      .then((data) => {
        console.log(data);
        toast.success("Sub admin created");
        navigate("/admin/subadminS");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Add Sub-Admin</CardTitle>
            <CardDescription>
              Enter the information of the sub-admin you want to add.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter name" {...register("name")} />
              <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                {errors.name?.message}
              </p>{" "}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter email"
                type="email"
                {...register("email")}
              />
              <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                {errors.email?.message}
              </p>{" "}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter password"
                type="password"
                {...register("password")}
              />
              <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                {errors.password?.message}
              </p>{" "}
            </div>
            {/* <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select id="role">
          <option>Editor</option>
          <option>Author</option>
            <option>Moderator</option>
            </Select>
        </div> */}
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddSubAdmin;
