import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SignInForm from "../components/SignInForm";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div id="overlay">
      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-3/4 w-2/5 rounded-md bg-white px-4 py-6 shadow-md">
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
