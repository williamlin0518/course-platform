import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <Route
      {...rest}
      render={props => {
        // Wait until the user's sign-in state is loaded
        if (!isLoaded) {
          return <div>Loading...</div>; // Or any other loading indicator you prefer
        }

        // Redirect to login if not signed in
        if (!isSignedIn) {
          return <Redirect to="/login" />;
        }

        // Render the component if signed in
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
