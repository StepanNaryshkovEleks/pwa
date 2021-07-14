import React from "react";
import styles from "./_.module.css";

export const Header = ({title, LeftComponent, RightComponent, classes = ""}) => {
  return (
    <div className={`${styles.container} ${classes}`}>
      {LeftComponent && <LeftComponent className={styles.icon} />}
      <span className={styles.title}>{title}</span>
      {RightComponent && <RightComponent className={styles.img} />}
    </div>
  );
};
