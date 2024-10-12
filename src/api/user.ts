import axios from "axios";

export type User = {
  name?: string;
  email: string;
  password: string;
  image?: "";
  id?: number;
};

export async function createUser(user: User) {
  try {
    const req = await axios.post(
      "http://localhost:8080/api/auth/signup",
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
      "http://localhost:8080/api/auth/login",
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
    const res = await axios.get(`http://localhost:8080/users/${userId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function signOutUser() {
  try {
    const res = await axios.post("http://localhost:8080/api/auth/logout", "", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

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
      `http://localhost:8080/users/update?id=${userId}&name=${name}&image=${image}`,
      "",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

