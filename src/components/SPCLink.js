import React from "react";
import { Link } from "react-router-dom";

const SPCLink = ({ classes, text, to }) => (
  <div className={classes.back}>
    <Link className={classes.link} to={to}>
      {text}
    </Link>
  </div>
);

export default SPCLink;
