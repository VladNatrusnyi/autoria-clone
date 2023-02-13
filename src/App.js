import './index.css'
import {router} from "./navigation/router";
import {RouterProvider} from "react-router";
import React from "react";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
