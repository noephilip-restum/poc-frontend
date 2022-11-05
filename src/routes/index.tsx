import { ElementType, lazy, Suspense } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import MainLayout from "layouts/MainLayout";
import { MAIN_PATH } from "./paths";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

const HomePage = Loadable(lazy(() => import("pages/HomePage")));
const GenreExplorePage = Loadable(lazy(() => import("pages/GenreExplore")));
const Login = Loadable(lazy(() => import("pages/Login")));
const SignUp = Loadable(lazy(() => import("pages/SignUp")));
const AdminPage = Loadable(lazy(() => import("pages/AdminPage")));

export default function MainRoutes() {
  let routes = useRoutes([
    {
      path: MAIN_PATH.login,
      children: [{ path: "", element: <Login /> }],
    },
    {
      path: MAIN_PATH.signup,
      children: [{ path: "", element: <SignUp /> }],
    },
    {
      path: MAIN_PATH.admin,
      children: [
        { path: "", element: <AdminPage /> },
        { path: "users", element: <AdminPage /> },
        { path: "actors", element: <AdminPage /> },
      ],
    },
    { path: "", element: <Navigate to={MAIN_PATH.browse} replace /> },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: MAIN_PATH.browse,
          children: [{ path: "", element: <HomePage /> }],
        },
        {
          path: MAIN_PATH.genreExplore,
          children: [{ path: ":genreId", element: <GenreExplorePage /> }],
        },
        {
          path: MAIN_PATH.genreExplore,
          children: [{ path: ":genreId", element: <GenreExplorePage /> }],
        },
      ],
    },
  ]);
  return routes;
}
