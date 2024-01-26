import React from 'react';
import AppRoot from "./AppRoot";
import AppLoader from "./AppLoader";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import ProtectedRoute from './comps/ProtectedRoute'; 
import SignInPage from './comps/SignInPage';
import { SignOutButton, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"
function App(){
  return (
    <div>
      <AppRoot>
          <AppLoader />
      </AppRoot>
    </div>
  )
}

export default App;
