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
      
      {/* <SignedOut>
        <SignInButton />
        <p>This content is public. Only signed out users can see the SignInButton above this text.</p>

        <AppRoot>
          <AppLoader />
        </AppRoot>
      </SignedOut>
      <SignedIn>
        <SignOutButton afterSignOutUrl="/" />
        <p>This content is private. Only signed in users can see the SignOutButton above this text.</p>
        <AppRoot>
          <AppLoader />
        </AppRoot>
      </SignedIn> */}

      <AppRoot>
          <AppLoader />
      </AppRoot>
    </div>
  )
}

export default App;