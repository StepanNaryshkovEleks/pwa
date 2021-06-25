import React from "react";
import styles from "./_.module.css";

export const PageHeader = ({header, imgSrc, IconComp}) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.iconContainer}
        styles={{visibility: IconComp ? "visible" : "hidden"}}
      >
        {IconComp && <IconComp className={styles.icon} />}
      </div>
      <span className={styles.header}>{header}</span>
      <div
        className={styles.imgContainer}
        styles={{visibility: imgSrc ? "visible" : "hidden"}}
      >
        {imgSrc && <img src={imgSrc} alt="User" className={styles.img} />}
      </div>
    </div>
  );
};
