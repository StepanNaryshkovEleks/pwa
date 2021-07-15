import React from "react";
import styles from "./_.module.css";
import {Spin} from "antd";

export const Spinner = () => {
  return (
    <div className={styles.container}>
      <Spin size="large" />
    </div>
  );
};
