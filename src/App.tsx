import "./App.css";
import "primeicons/primeicons.css";
import type { FC } from "react";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { Outlet } from "react-router";

const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </>
  );
};

export default App;
