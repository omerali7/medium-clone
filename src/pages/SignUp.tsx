import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div id="overlay">
      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-3/4 w-2/5 rounded-md bg-white px-4 py-6 shadow-md">
        <IoCloseOutline
          className="ml-auto h-6 w-6 cursor-pointer font-thin"
          onClick={() => navigate("/")}
        />
        <div className="mt-8">
          <div>
            <h2 className="font-GTSuperRegular text-center text-3xl">
              Sign up with email
            </h2>
            <p className="font-SohneLight mt-6 text-center text-base leading-6">
              Enter your email address and password to create an <br />
              account
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
