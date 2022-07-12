import React, { FC, useEffect, useState } from 'react';
import {Route, Switch} from "react-router-dom";
import Widget from "./components/Widget";
import Test from "./components/Test";

const Paths: {[key: string]: string} = {
  default: '/appointment',
  empty: '/'
}

export const SITE_ADDRESS = React.createContext(window.location.origin);

const App: FC = () => {

  const [state, setState] = useState(0);

  return (
    <Switch>
      <Route path={Paths.default}><Widget /></Route>
      <Route path={Paths.empty}>
        <button onClick={() => setState(prev => prev + 1)}>high count</button>
        <Test count={state} />
      </Route>
    </Switch>
  );
}

export default App;
