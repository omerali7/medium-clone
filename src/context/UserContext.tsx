import { createContext, useContext, useEffect, useState } from "react";
import { signOutUser, User } from "../api/user";
import axios from "axios";

type UserState = {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
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
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const initialState: User & UserState = {
  name: "",
  email: "",
  setName: () => {},
  setEmail: () => {},
  isAuthenticated: null,
  setAuthenticated: () => {},
  isLoading: true,
  setIsLoading: () => {},
  handleLogOut: () => {},
  user: {
    name: "",
    image: "",
    id: 0,
  },
  setUser: () => {},
  update: 1,
  setUpdate: () => {},
  isGoogleAuth: false,
  setIsGoogleAuth: () => {},
  password: "",
  setPassword: () => {},
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

  const [user, setUser] = useState<User>({
    name: "",
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
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/validate`, "", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAuthenticated(true);
          setUser({
            name: res.data.name,
            id: res.data.id,
            image: res.data.image,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          setAuthenticated(false);
          console.log(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [update]);

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
        setPassword,
        password,
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export const useUserContext = () => useContext(UserContext);
