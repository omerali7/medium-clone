import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SignInForm from "../components/SignInForm";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div id="overlay">
      <div className="absolute m-auto h-full w-full rounded-md bg-white md:px-4 px-2 py-6 shadow-md md:bottom-0 md:left-0 md:right-0 md:top-0 md:h-3/4 md:w-2/5">
        <IoCloseOutline
          className="ml-auto h-6 w-6 cursor-pointer font-thin"
          onClick={() => navigate("/")}
        />
        <div className="mt-12">
          <div>
            <h2 className="font-GTSuperRegular text-center text-3xl">
              Welcome back.
            </h2>
            <p className="font-SohneLight mt-4 text-center text-base">
              Enter your email address and password.
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
