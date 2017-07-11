import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import store from "./store";

const AppWithStore = (
  <Provider store={store}>
    <App store={store} />
  </Provider>
);

ReactDOM.render(AppWithStore, document.getElementById("root"));
registerServiceWorker();
