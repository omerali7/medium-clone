import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div id="overlay">
      <div className="absolute m-auto h-full w-full rounded-md bg-white md:px-4 px-2 py-6 shadow-md md:bottom-0 md:left-0 md:right-0 md:top-0 md:h-3/4 md:w-2/5">
        <IoCloseOutline
          className="ml-auto h-6 w-6 cursor-pointer font-thin"
          onClick={() => navigate("/")}
        />
        <div className="mt-8">
          <div>
            <h2 className="font-GTSuperRegular text-center text-3xl">
              Sign up with email
            </h2>
            <p className="font-SohneLight mt-6 text-center text-sm lg:text-base leading-6">
              Enter your email address and password to create an
            </p>
            <p className="text-center">account</p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
