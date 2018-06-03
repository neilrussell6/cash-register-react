import React from "react";
import "../stylesheets/main.scss";

export const App = props => (
  <div className="container">
    {props.children}
  </div>
);
