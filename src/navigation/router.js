import {createBrowserRouter} from "react-router-dom";
import {RootLayout} from "../layouts/RootLayout/RootLayuot";
import {ErrorPage} from "../pages/ErrorPage/ErrorPage";
import {MainPage} from "../pages/MainPage";
import {SecondPage} from "../pages/SecondPage";
import {ThirdPage} from "../pages/ThirdPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "second",
        element: <SecondPage />,
        children: [
          {
            path: "third",
            element: <ThirdPage />,
          }
        ]
      },
    ],
  },
]);
