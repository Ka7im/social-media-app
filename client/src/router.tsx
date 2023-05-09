import { lazy, Suspense } from "react";
import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Spinner from "./components/Loaders/Spinner";
import AddPost from "./pages/AddPost";
import Authorization from "./pages/Authorization";
import ChatPage from "./pages/ChatPage";
import Posts from "./pages/Posts";
import {
  CHAT_PAGE,
  FRIENDS_PAGE,
  MESSAGES_PAGE,
  POST_PAGE,
  PROFILE_PAGE,
} from "./utils/consts";
import Messages from "./pages/Messages";
import Friends from "./pages/Friends";

const PostPage = lazy(() => import("./pages/PostPage"));
const Profile = lazy(() => import("./pages/Profile"));

const routes = createRoutesFromElements(
  <Route path={POST_PAGE} element={<App />}>
    <Route index element={<Posts />} />
    <Route
      path={PROFILE_PAGE + "/:id"}
      element={
        <Suspense fallback={<Spinner />}>
          <Profile />
        </Suspense>
      }
    />
    <Route path={FRIENDS_PAGE} element={<Friends />} />
    <Route path="authorization" element={<Authorization />} />
    <Route path="login" element={<Authorization />} />
    <Route path="add-post" element={<AddPost />} />
    <Route path="/:id/edit" element={<AddPost />} />
    <Route path={CHAT_PAGE} element={<ChatPage />} />
    <Route path={MESSAGES_PAGE} element={<Messages />} />
    <Route
      path="/:id"
      element={
        <Suspense fallback={<Spinner />}>
          <PostPage />
        </Suspense>
      }
    />
  </Route>
);

export const router = createBrowserRouter(routes);
