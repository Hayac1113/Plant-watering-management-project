import React, { useState } from "react";
import router, { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import BaseLayout from "@/components/BaseLayout";

const registerValidation = z.object({
  username: z.string().min(5),
  password: z.string().min(10),
});

type registerFormData = z.infer<typeof registerValidation>;

const Register = () => {
  //   const router = useRouter();
  const onSubmit = async (data: registerFormData) => {
    try {
      const response = await axios.post("http://localhost:3001/registers", {
        username: data.username,
        password: data.password,
      });
      // Navigate to home after successful created
      router.push("/");
      console.log("User is created:", response.data);
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormData>({
    resolver: zodResolver(registerValidation),
  });

  return (
    <>
      <BaseLayout children={undefined} />
      <main className="flex justify-between">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            type="text"
            id="username"
            placeholder=" Min. 5 characters"
          />
          {errors.username && <p>{errors.username.message}</p>}

          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder=" Min. 10 characters"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <button type="submit">Register</button>
        </form>
      </main>
    </>
  );
};

export default Register;
