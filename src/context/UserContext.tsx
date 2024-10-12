import { createContext, useContext, useEffect, useState } from "react";
import { signOutUser, User } from "../api/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserState = {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean | null;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogOut: (e: React.FormEvent) => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  update: number;
  setUpdate: React.Dispatch<React.SetStateAction<number>>;
  isGoogleAuth: boolean;
  setIsGoogleAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: User & UserState = {
  name: "",
  password: "",
  email: "",
  setName: () => {},
  setEmail: () => {},
  setPassword: () => {},
  isAuthenticated: null,
  setAuthenticated: () => {},
  isLoading: true,
  setIsLoading: () => {},
  handleLogOut: () => {},
  user: {
    name: "",
    password: "",
    email: "",
    image: "",
    id: 0,
  },
  setUser: () => {},
  update: 1,
  setUpdate: () => {},
  isGoogleAuth: false,
  setIsGoogleAuth: () => {},
};

const UserContext = createContext(initialState);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [update, setUpdate] = useState<number>(1);

  const [isGoogleAuth, setIsGoogleAuth] = useState<boolean>(false);

  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    name: "",
    password: "",
    email: "",
    image: "",
    id: 0,
  });

  async function handleLogOut() {
    try {
      await signOutUser();
      setAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!isGoogleAuth)
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/auth/session/validate`, "", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAuthenticated(true);
            console.log(res);
            setUser({
              name: res.data.name,
              email: res.data.email,
              password: res.data.password,
              id: res.data.id,
              image: res.data.image,
            });
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            setAuthenticated(false);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [isGoogleAuth, update]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/session", {
        withCredentials: true, // Ensure cookies are sent with the request
      })
      .then((res) => {
        console.log(res);
        if (res.data !== "") {
          setUser({
            name: res.data.name,
            email: res.data.email,
            password: res.data.password,
            id: res.data.id,
            image: res.data.image,
          }); // User is logged in, store user data
        } else {
          setAuthenticated(false); // No session, redirect to login
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  // useEffect(() => {
  //   if (isGoogleAuth)
  //     axios
  //       .get("http://localhost:8080/loginSuccess")
  //       .then((response) => {
  //         setAuthenticated(true);
  //         console.log(response.data); // Handle the login success and navigate
  //         navigate("/home");
  //       })
  //       .catch((error) => {
  //         console.error("Login failed", error);
  //       });
  // }, [isGoogleAuth, navigate]);

  return (
    <UserContext.Provider
      value={{
        isGoogleAuth,
        setIsGoogleAuth,
        update,
        setUpdate,
        user,
        setUser,
        handleLogOut,
        isLoading,
        setIsLoading,
        isAuthenticated,
        setAuthenticated,
        name,
        setName,
        password,
        setPassword,
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export const useUserContext = () => useContext(UserContext);
