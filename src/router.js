import React from "react";
// import {Router, Route, IndexRoute} from "react-router";
// import {history} from "./store.js";
import {StartMenu} from "./components/start_menu/App";
import {BillBuilder} from "./components/bill_builder/App";
import Charge from "./components/charge/App";
import Change from "./components/change/App";
// import NotFound from "./components/NotFound";
import "./stylesheets/main.scss";

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

const router = (
    <Router>
        <div className="container">
            <Route exact path="/" component={StartMenu} />
            <Route path="/new-bill" component={BillBuilder} />
            <Route path="/charge" component={Charge} />
            <Route path="/change" component={Change} />
            {/*<Route path="*" component={NotFound} />*/}
        </div>
    </Router>
);

export { router };
