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
      <div className="mt-3.5 flex w-full justify-center">
        <button
          className="flex w-[35%] items-center gap-2 rounded-full border border-black px-3 py-2 pl-5"
          onClick={handleGoogleLogin}
        >
          <ProviderSvg />
          <span className="mb-[2px] text-sm">Continue with Google</span>
        </button>
      </div>
    </>
  );
}

function ProviderSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className="mt-[0.1px] block w-[13%]"
    >
      <path
        fill="#4285f4"
        d="M24.12 25c2.82-2.63 4.07-7 3.32-11.19H16.25v4.63h6.37A5.26 5.26 0 0 1 20.25 22z"
      ></path>
      <path
        fill="#34a853"
        d="M5.62 21.31A12 12 0 0 0 24.12 25l-3.87-3a7.16 7.16 0 0 1-10.69-3.75z"
      ></path>
      <path
        fill="#fbbc02"
        d="M9.56 18.25c-.5-1.56-.5-3 0-4.56l-3.94-3.07a12.08 12.08 0 0 0 0 10.7z"
      ></path>
      <path
        fill="#ea4335"
        d="M9.56 13.69c1.38-4.32 7.25-6.82 11.19-3.13l3.44-3.37a11.8 11.8 0 0 0-18.57 3.43l3.94 3.07z"
      ></path>
    </svg>
  );
}
