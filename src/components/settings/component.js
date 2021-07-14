import styles from "./_.module.css";
import chevronRight from "../../images/chevron-right.svg";
import React from "react";

export const Setting = ({icon, iconStyles, title, RightComponent}) => (
  <div className={styles.setting}>
    <img className={iconStyles || styles.icon} src={icon} alt={title} />
    <span className={styles.title}>{title}</span>
    {RightComponent ? <RightComponent /> : <img src={chevronRight} alt="Link" />}
  </div>
);
