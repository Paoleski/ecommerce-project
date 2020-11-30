import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import reducer, { initialState } from "./components/reducer";
import { StateProvider } from "./components/StateProvider";

ReactDOM.render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>,
  document.getElementById("root")
)

