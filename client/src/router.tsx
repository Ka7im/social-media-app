import { lazy, Suspense } from "react";
import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Spinner from "./components/Loaders/Spinner";
import Authorization from "./pages/Authorization";
import {
  FRIENDS_PAGE,
  MESSAGES_PAGE,
  NOTFOUND_PAGE,
  POST_PAGE,
  PROFILE_PAGE,
} from "./utils/consts";

const PostPage = lazy(() => import("./pages/PostPage"));
const Profile = lazy(() => import("./pages/Profile"));
const Posts = lazy(() => import("./pages/Posts"));
const AddPost = lazy(() => import("./pages/AddPost"));
const Messages = lazy(() => import("./pages/Messages"));
const Friends = lazy(() => import("./pages/Friends"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routes = createRoutesFromElements(
  <>
    <Route path={POST_PAGE} element={<App />}>
      <Route
        index
        element={
          <Suspense fallback={<Spinner />}>
            <Posts />
          </Suspense>
        }
      />
      <Route
        path={PROFILE_PAGE + "/:id"}
        element={
          <Suspense fallback={<Spinner />}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path={FRIENDS_PAGE}
        element={
          <Suspense fallback={<Spinner />}>
            <Friends />
          </Suspense>
        }
      />
      <Route path="authorization" element={<Authorization />} />
      <Route path="login" element={<Authorization />} />
      <Route
        path="add-post"
        element={
          <Suspense fallback={<Spinner />}>
            <AddPost />
          </Suspense>
        }
      />
      <Route
        path="/:id/edit"
        element={
          <Suspense fallback={<Spinner />}>
            <AddPost />
          </Suspense>
        }
      />
      <Route
        path={MESSAGES_PAGE}
        element={
          <Suspense fallback={<Spinner />}>
            <Messages />
          </Suspense>
        }
      />
      <Route
        path="/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <PostPage />
          </Suspense>
        }
      />
      <Route
        path={NOTFOUND_PAGE}
        element={
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        }
      />
    </Route>
  </>
);

export const router = createBrowserRouter(routes);
