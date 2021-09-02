import styles from "./_.module.css";
import {CloseOutlined} from "@ant-design/icons";

export const FullPageAdv = ({url, handleClosed, color}) => {
  return (
    <div
      className={styles.wrap}
      style={{
        backgroundImage: `url(${url})`,
        backgroundColor: color,
      }}
    >
      <div className={styles.header}>
        <span className={styles.title}>Brandname</span>
        <button onClick={handleClosed} className={styles.closed}>
          <CloseOutlined
            style={{
              color: "white",
            }}
          />
        </button>
      </div>
      <button onClick={handleClosed} className={styles.shop}>
        Shop Now
      </button>
    </div>
  );
};
