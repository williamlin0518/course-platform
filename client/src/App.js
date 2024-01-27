import React from 'react';
import AppRoot from "./AppRoot";
import AppLoader from "./AppLoader";
import ChatWidget from './comps/ChatWidget';
function App(){
  return (
    <div>
      <AppRoot>
          <AppLoader />
          <ChatWidget />
      </AppRoot>
    </div>
  )
}

export default App;
