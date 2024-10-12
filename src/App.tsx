import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Edit from "./pages/Edit";
import PostProvider from "./context/PostContext";
import UserProvider from "./context/UserContext";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <PostProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<GetStarted />}>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route index path="/home" element={<Home />} />
              <Route path="/create" element={<CreatePost />}>
                <Route path="edit" element={<Edit />} />
              </Route>
              <Route path="/my-profile" element={<Profile />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Route>
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </UserProvider>
      </PostProvider>
    </BrowserRouter>
  );
}
