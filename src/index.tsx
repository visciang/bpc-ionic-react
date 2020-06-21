import React from "react";
import ReactDOM from "react-dom";
import { enableMapSet } from "immer";
import App from "App";
import * as serviceWorker from "serviceWorker";

enableMapSet();

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
