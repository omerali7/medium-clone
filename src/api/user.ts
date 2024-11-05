import axios from "axios";

export type User = {
  name?: string;
  image?: string;
  id?: number;
  email?: string;
  password?: string
};

export async function createUser(user: User) {
  try {
    const req = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/signup`,
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    return req.data;
  } catch (error) {
    console.log(error);
  }
}

export async function signInUser(user: { email: string; password: string }) {
  try {
    const req = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    return req.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(userId: number) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${userId}`,
      { withCredentials: true },
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function signOutUser() {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      "",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser({
  name,
  image,
  userId,
}: {
  name: string;
  image: string;
  userId: number;
}) {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/update?id=${userId}&name=${name}&image=${image}`,
      "",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
