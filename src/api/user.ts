import axios from "axios";

export type User = {
  name: string;
  email: string;
  password: string;
};

export async function createUser(user: User) {
  try {
    const req = await axios.post(
      "http://localhost:8080/users",
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return req.data;
  } catch (error) {
    console.log(error);
  }
}

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const req = await axios.get(
      `http://localhost:8080/users/validate?email=${email}&password=${password}`,
    );

    return req.data;
  } catch (error) {
    console.log(error);
  }
}
