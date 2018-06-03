import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import {history} from "./store.js";
import {App} from "./components/App";
import {StartMenu} from "./components/start_menu/App";
import {BillBuilder} from "./components/bill_builder/App";
import Charge from "./components/charge/App";
import Change from "./components/change/App";
import NotFound from "./components/NotFound";

const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={StartMenu} />
      <Route path="/new-bill" component={BillBuilder} />
      <Route path="/charge" component={Charge} />
      <Route path="/change" component={Change} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export { router };
