import React from "react";
import classNames from "classnames";

import css from "./Container.module.css";

const Container = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={classNames(css.container, className)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
