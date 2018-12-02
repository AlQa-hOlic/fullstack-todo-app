import React from "react";
import { Link } from "react-router-dom";

const SPCLink = ({ classes, text, to, href }) => (
  <div className={classes.back}>
    {href ? (
      <a className={classes.link} href={href}>
        {text}
      </a>
    ) : (
      <Link className={classes.link} to={to}>
        {text}
      </Link>
    )}
  </div>
);

export default SPCLink;
