import './index.css'
import {router} from "./navigation/router";
import {Route, RouterProvider, Routes} from "react-router";
import React from "react";
import {Provider} from "react-redux";
import {store} from "./store";
import {RootLayout} from "./layouts/RootLayout/RootLayuot";
import {AutoListPage} from "./pages/AutoListPage/AutoListPage";
import {MainPage} from "./pages/MainPage";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      {/*<Routes>*/}
      {/*  <Route path={'/autoria-clone'}  element={<RootLayout />}>*/}
      {/*    <Route index element={<MainPage />} />*/}
      {/*    <Route path={'catalog'} element={<AutoListPage />} errorElement={<ErrorPage />}/>*/}
      {/*  </Route>*/}
      {/*</Routes>*/}
    </Provider>
  );
}

export default App;
