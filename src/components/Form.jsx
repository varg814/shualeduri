import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Toggle from "./Toggle";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().required("Can't be empty").email("Invalid Email"),
  password: yup
    .string()
    .required("Can't be empty")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Invalid Password"
    ),
});

const signupSchema = yup.object().shape({
  regemail: yup.string().required("Can't be empty").email("Invalid Email"),
  regpassword: yup
    .string()
    .required("Can't be empty")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Invalid Password"
    ),
  repeatedPassword: yup
    .string()
    .required("Can't be empty")
    .oneOf([yup.ref("regpassword"), null], "Passwords must match")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Invalid Password"
    ),
});

export default function Form({ onLogin }) {
  const loadUsers = () => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  };

  const [users, setUsers] = useState(loadUsers);
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = (e) => {
    e.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const onLoginSubmit = (data) => {
    const existingUser = users.find(
      (user) =>
        user.userEmail === data.email && user.userPassword === data.password
    );
    if (existingUser) {
      alert("User exists, login successful");
      reset();
      onLogin();
    } else {
      alert("User doesn't exist");
      reset();
    }
  };

  const onSignUpSubmit = (data) => {
    const existingUser = users.find((user) => user.userEmail === data.regemail);
    if (existingUser) {
      alert("User already exists");
      reset();
    } else {
      const newUser = {
        userEmail: data.regemail,
        userPassword: data.regpassword,
      };
      setUsers([...users, newUser]);
      alert("Account created successfully");
      reset();
    }
  };

  useEffect(() => {
    reset();
  }, [isLogin, reset]);

  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center bg-[#10141E]">
      <main
        className={`flex flex-col gap-[40px] bg-[#161D2F] p-[32px] rounded-[20px] w-[100%] max-w-[400px]`}
      >
        {isLogin ? (
          <h1 className="text-white">Login</h1>
        ) : (
          <h1 className="text-white">Sign Up</h1>
        )}

        {isLogin && (
          <form
            onSubmit={handleSubmit(onLoginSubmit)}
            className={`flex flex-col gap-[40px] w-[100%]`}
          >
            <div className="flex flex-col gap-[24px]">
              <Input
                className={`${
                  errors.email ? "border-[#FC4747]" : "border-[#5A698F]"
                } text-white pl-4 pt-0 pr-4 pb-4.5 border-b-[1px] focus:border-[#fff] outline-none placeholder-[#5A698F] focus:placeholder-[#fff]`}
                type="email"
                placeholder="Email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-[#FC4747]">{errors.email.message}</p>
              )}

              <Input
                className={`${
                  errors.password ? "border-[#FC4747]" : "border-[#5A698F]"
                } text-white pl-4 pt-0 pr-4 pb-4.5 border-b-[1px] focus:border-[#fff] outline-none placeholder-[#5A698F] focus:placeholder-[#fff]`}
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-[#FC4747]">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-[24px]">
              <Button
                children="Login to your account"
                className="text-white bg-[#FC4747] rounded-[6px] pt-[14px] pb-[14px] hover:bg-[#fff] hover:text-[#161D2F] cursor-pointer"
              />
              <Toggle text="Don’t have an account?" onClick={toggleMode}>
                Sign Up
              </Toggle>
            </div>
          </form>
        )}
        {!isLogin && (
          <form
            onSubmit={handleSubmit(onSignUpSubmit)}
            className={`flex flex-col gap-[40px]`}
          >
            <div className="flex flex-col gap-[24px]">
              <Input
                className={`${
                  errors.regemail ? "border-[#FC4747]" : "border-[#5A698F]"
                } text-white pl-4 pt-0 pr-4 pb-4.5 border-b-[1px] focus:border-[#fff] outline-none placeholder-[#5A698F] focus:placeholder-[#fff]`}
                type="email"
                placeholder="Email address"
                {...register("regemail")}
              />
              {errors.regemail && (
                <p className="text-[#FC4747]">{errors.regemail.message}</p>
              )}
              <Input
                className={`${
                  errors.regpassword ? "border-[#FC4747]" : "border-[#5A698F]"
                } text-white pl-4 pt-0 pr-4 pb-4.5 border-b-[1px] focus:border-[#fff] outline-none placeholder-[#5A698F] focus:placeholder-[#fff]`}
                type="password"
                placeholder="Password"
                {...register("regpassword")}
              />
              {errors.regpassword && (
                <p className="text-[#FC4747]">{errors.regpassword.message}</p>
              )}
              <Input
                className={`${
                  errors.repeatedPassword
                    ? "border-[#FC4747]"
                    : "border-[#5A698F]"
                } text-white pl-4 pt-0 pr-4 pb-4.5 border-b-[1px] focus:border-[#fff] outline-none placeholder-[#5A698F] focus:placeholder-[#fff]`}
                type="password"
                placeholder="Repeat password"
                {...register("repeatedPassword")}
              />
              {errors.repeatedPassword && (
                <p className="text-[#FC4747]">
                  {errors.repeatedPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-[24px]">
              <Button
                children="Create an account"
                className="text-white bg-[#FC4747] rounded-[6px] pt-[14px] pb-[14px] hover:bg-[#fff] hover:text-[#161D2F] cursor-pointer"
              />
              <Toggle text="Already have an account?" onClick={toggleMode}>
                Log In
              </Toggle>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
