import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import InterviewResultForm from "./InterviewResult/AddEditForm";
import InterviewResultTable from "./InterviewResult";
import UserListTable from "./Users";
import UserForm from "./Users/AddEditForm";

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const isLoggedIn = useSelector((state) => state.auth.token !== null);

  return (
    <Switch>
      <RestrictedRoute
        exact
        path="/interviewResult"
        component={InterviewResultTable}
        isLoggedIn={isLoggedIn}
      />
      <RestrictedRoute
        exact
        path="/interviewResult/addInterviewResult"
        component={InterviewResultForm}
        isLoggedIn={isLoggedIn}
      />
      <RestrictedRoute
        exact
        path="/interviewResult/editInterviewResult/:id"
        component={InterviewResultForm}
        isLoggedIn={isLoggedIn}
      />
      <RestrictedRoute
        exact
        path="/usersList"
        component={UserListTable}
        isLoggedIn={isLoggedIn}
      />
      <RestrictedRoute
        exact
        path="/usersList/addUsersDetails"
        component={UserForm}
        isLoggedIn={isLoggedIn}
      />
      <RestrictedRoute
        exact
        path="/usersList/editUsersDetails/:id"
        component={UserForm}
        isLoggedIn={isLoggedIn}
      />
    </Switch>
  );
};

export default Routes;
