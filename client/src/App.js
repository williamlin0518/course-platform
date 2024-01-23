import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import { SignOutButton, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"


function App() {
  return (
    <div>
      <SignedOut>
        <SignInButton />
        <p>This content is public. Only signed out users can see the SignInButton above this text.</p>
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
              <Link to="/">Home</Link>
              <Link to="/otherpage">Other Page</Link>
            </header>
            <div>
              {/* <Route exact path="/" component={Fib} /> */}
              <Route path="/otherpage" component={OtherPage} />
            </div>
          </div>
        </Router>
      </SignedOut>
      <SignedIn>
        <SignOutButton afterSignOutUrl="/" />
        <p>This content is private. Only signed in users can see the SignOutButton above this text.</p>
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
              <Link to="/">Home</Link>
              <Link to="/otherpage">Other Page</Link>
            </header>
            <div>
              {/* <Route exact path="/" component={Fib} /> */}
              <Route path="/otherpage" component={OtherPage} />
            </div>
          </div>
        </Router>
      </SignedIn>
    </div>
    
  );
}

export default App;
