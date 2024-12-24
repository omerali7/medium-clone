import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUser } from "../react-query/queriesAndMutation";
import { User } from "../api/user";
import { useUserContext } from "../context/UserContext";

export default function SignUpForm() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    setAuthenticated,
    setUser,
  } = useUserContext();

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [globalError, setGlobalError] = useState<boolean>(false);

  const navigate = useNavigate();

  const { mutateAsync: createUser, isPending } = useCreateUser();

  async function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !password || !email) {
      setEmailError(true);
      setNameError(true);
      setPasswordError(true);
      return;
    }

    if (password.length < 6) {
      setPasswordError(true);
      return;
    }

    const user: User = {
      name,
      email,
      password,
    };

    const createdUser = await createUser(user);

    if (createdUser) {
      setAuthenticated(true);
      navigate("/home");

      setUser({
        name: user.name,
        email: user.email,
        id: createdUser.id,
        image: user.image || "",
      });
    }

    if (!createdUser) {
      setAuthenticated(false);
      setGlobalError(true);
    }

    setEmail("");
    setPassword("");
    setName("");
  }

  return (
    <form
      className="mt-10 flex flex-col items-center gap-4"
      onSubmit={handleOnSubmit}
    >
      {globalError && <p className="text-[#C94A4A]">Try again</p>}
      <div className="flex w-full flex-col items-center gap-2">
        <label htmlFor="name" className="font-SohneLight text-sm">
          Your name
        </label>
        <input
          value={name}
          onChange={(e) => {
            setGlobalError(false);
            setName(e.target.value);
          }}
          type="text"
          className={`font-SohneLight w-[60%] rounded-sm border bg-[#F2F2F2] px-2 py-1.5 text-center text-sm outline-none focus:bg-[#F9F9F9] xl:w-[44%] ${nameError ? "border-[#C94A4A]" : "border-[#F2F2F2] focus:border-black"}`}
          id="name"
        />
        {nameError && (
          <p className="font-SohneLight text-xs text-[#C94A4A]">
            Please enter your name.
          </p>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <label htmlFor="email" className="font-SohneLight text-sm">
          Your email
        </label>
        <input
          value={email}
          onChange={(e) => {
            setGlobalError(false);
            setEmail(e.target.value);
          }}
          type="email"
          className={`font-SohneLight w-[60%] rounded-sm border bg-[#F2F2F2] px-2 py-1.5 text-center text-sm outline-none focus:bg-[#F9F9F9] xl:w-[44%] ${emailError ? "border-[#C94A4A]" : "border-[#F2F2F2] focus:border-black"}`}
          id="email"
        />
        {emailError && (
          <p className="font-SohneLight text-xs text-[#C94A4A]">
            Please enter a valid email address.
          </p>
        )}
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <label htmlFor="password" className="font-SohneLight text-sm">
          Your password
        </label>
        <input
          value={password}
          onChange={(e) => {
            setGlobalError(false);
            setPassword(e.target.value);
          }}
          type="password"
          className={`font-SohneLight w-[60%] rounded-sm border bg-[#F2F2F2] px-2 py-1.5 text-center text-sm outline-none focus:bg-[#F9F9F9] xl:w-[44%] ${passwordError ? "border-[#C94A4A]" : "border-[#F2F2F2] focus:border-black"}`}
          id="password"
        />
        {passwordError && (
          <p className="font-SohneLight text-xs text-[#C94A4A]">
            Please enter a valid password.
          </p>
        )}
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="font-SohneLight mt-4 rounded-full bg-[#000000] px-16 py-2 text-sm text-white"
      >
        Continue
      </button>
      <Link to="/sign-in" className="font-SohneLight text-sm text-[#156D12]">
        Sign in
      </Link>
    </form>
  );
}
