import React from "react";
import styles from "./_.module.css";
import {Spin} from "antd";

export const Spinner = ({className}) => {
  return (
    <div className={`${styles.container} ${className ? className : ""}`}>
      <Spin size="large" />
    </div>
  );
};
