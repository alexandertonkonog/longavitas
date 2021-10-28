import React, { FC } from 'react';
import { Route, Switch } from "react-router-dom";
import Widget from "./components/Widget";

const Paths: {[key: string]: string} = {
  default: '/'
}

export const SITE_ADDRESS = React.createContext(window.location.origin);

const App: FC = () => {
  return (
    <Switch>
      <Route path={Paths.default}><Widget /></Route>
    </Switch>
  );
}

export default App;
