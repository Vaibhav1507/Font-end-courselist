import React from "react";
import "./AppRoot.scss";
import CoursesPage from "./pages/CoursesPage";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

interface AppRootProperties {
}

interface AppRootState {
}

class AppRoot extends React.Component<AppRootProperties, AppRootState> {
	public render(): JSX.Element {
		return (
			<div className="app-root">
				<div className="container my-5">
					<BrowserRouter>
						<Switch>
							<Route exact path={"/courses"} component={() => <CoursesPage />} />
							<Redirect to={"/courses"} />
						</Switch>
					</BrowserRouter>
				</div>
			</div>
		);
	}
}

export default AppRoot;