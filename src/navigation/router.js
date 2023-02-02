import {createBrowserRouter} from "react-router-dom";
import {RootLayout} from "../layouts/RootLayout/RootLayuot";
import {ErrorPage} from "../pages/ErrorPage/ErrorPage";
import {MainPage} from "../pages/MainPage";
import {SecondPage} from "../pages/SecondPage";
import {ThirdPage} from "../pages/ThirdPage";
import {AutoListPage} from "../pages/AutoListPage/AutoListPage";
import {CarList} from "../components/CarList/CarList";


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
    ],
  },
]);
