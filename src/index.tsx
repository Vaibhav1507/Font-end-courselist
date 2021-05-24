import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import AppRoot from "./user-interface/AppRoot";
import "./index.scss";

// Css theme
import "../node_modules/bootstrap/scss/bootstrap.scss";

ReactDOM.render(
	<AppRoot />,
	document.getElementById("root")
);