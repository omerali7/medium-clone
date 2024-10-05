import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import MyPosts from "./pages/MyPosts";
import MyProfile from "./pages/MyProfile";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./pages/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStarted />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route index path="/home" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}
