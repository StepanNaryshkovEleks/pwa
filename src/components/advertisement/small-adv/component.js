import styles from "./_.module.css";
import {RightOutlined} from "@ant-design/icons";

export const SmallAdv = ({url, color}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span
          className={styles.spot}
          style={{
            backgroundColor: color,
          }}
        />
        <div className={styles.info}>
          <span className={styles.title}>Brandname</span>
          <span className={styles.subtitle}>Advertisement</span>
        </div>
      </div>
      <img src={url} alt="Advertisement" className={styles.img} />
      <button className={styles.btn}>
        Visit page
        <RightOutlined
          style={{
            color: "white",
          }}
        />
      </button>
    </div>
  );
};
