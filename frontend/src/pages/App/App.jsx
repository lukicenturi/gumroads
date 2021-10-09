import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/products/:id">
          <ProductDetail />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
