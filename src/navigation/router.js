import {createBrowserRouter} from "react-router-dom";
import {RootLayout} from "../layouts/RootLayout/RootLayuot";
import {ErrorPage} from "../pages/ErrorPage/ErrorPage";
import {MainPage} from "../pages/MainPage";
import {AutoListPage} from "../pages/AutoListPage/AutoListPage";
import {CarPage} from "../pages/CarPage/CarPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "catalog",
        element: <AutoListPage />,
      },
      {
        path: "car/:carId",
        element: <CarPage />,
      },
    ],
  },
]);
