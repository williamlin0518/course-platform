import React from "react";
import AppContext from "./AppContext";
import logo from "./ui/logo-coral.svg";

import "./css/uifont.css";
import "./css/props.css";
import "./css/App.css";

import { Route, HashRouter, Switch } from "react-router-dom";

//Screen
import Sidebar from "./screens/sidebar";
import HomePage from "./screens/home";
import CoursePage from "./screens/course";
import DiscoverPage from "./screens/discover";
import CategoriesPage from "./screens/categories";
import MyCoursesPage from "./screens/mycourses";
import SpecificCategoryPage from "./comps/SpecificCategoryPage";
import ProtectedRoute from "./comps/ProtectedRoute";
import SignInPage from "./comps/SignInPage";

export default function AppLoader() {
  const splash = (context) => {
    return (
      <div className="App flex">
        <div className="splash abs abc">
          <img src={logo} alt="logo" className="bl" />
        </div>
      </div>
    );
  };

  return (
    <AppContext.Consumer>
      {(context) => {
        return context.appLoaded() ? (
          <div className="App flex">
            <HashRouter>
              <Sidebar />
              <div className="app-content">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/login" component={SignInPage} />
                  <Route path="/course/:courseId" component={CoursePage} />
                  <ProtectedRoute path="/discover" component={DiscoverPage} />
                  <Route
                    path="/cates/:label"
                    component={SpecificCategoryPage}
                  />
                  <Route path="/cates" exact component={CategoriesPage} />
                  <Route path="/my-courses" component={MyCoursesPage} />
                </Switch>
              </div>
            </HashRouter>
          </div>
        ) : (
          <AppContext.Consumer>
            {(context) => {
              context.setAppLoaded(true);
              return splash(context);
            }}
          </AppContext.Consumer>
        );
      }}
    </AppContext.Consumer>
  );
}
