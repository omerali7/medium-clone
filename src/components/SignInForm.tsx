import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInUser } from "../react-query/queriesAndMutation";
import { useUserContext } from "../context/UserContext";

export default function SignInForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    setAuthenticated,
    setUser,
    setIsGoogleAuth,
  } = useUserContext();

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [globalError, setGlobalError] = useState<boolean>(false);

  const { mutateAsync: signInUser, isPending } = useSignInUser();

  const navigate = useNavigate();

  async function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!password || !email) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }

    const user = await signInUser({ email, password });

    if (user) {
      setAuthenticated(true);
      navigate("/home");

      setUser({
        name: user.name,
        id: user.id,
        image: user.image || "",
      });
    }

    if (!user) {
      setAuthenticated(false);
      setGlobalError(true);
    }

    setEmail("");
    setPassword("");
  }

  const handleGoogleLogin = () => {
    setIsGoogleAuth(true);
    console.log(`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`);
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`; 
  };

  return (
    <>
      <form
        className="mt-12 flex flex-col items-center gap-4"
        onSubmit={handleOnSubmit}
      >
        {globalError && <p className="text-[#C94A4A]">Try again</p>}
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
          className="font-SohneLight mt-4 rounded-full bg-[#000000] px-16 py-2 text-sm text-white"
          disabled={isPending}
          type="submit"
        >
          Continue
        </button>
        <Link to="/sign-up" className="font-SohneLight text-sm text-[#156D12]">
          Sign up
        </Link>
      </form>
      <div className="flex w-full justify-center">
        <button
          className="font-SohneLight mt-4 rounded-full bg-[#000000] px-16 py-2 text-sm text-white"
          onClick={handleGoogleLogin}
        >
          Sign in with google
        </button>
      </div>
    </>
  );
}
