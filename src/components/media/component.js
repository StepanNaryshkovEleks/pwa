import React from "react";
import {Result} from "antd";
import Spinner from "../spinner";
import styles from "./_.module.css";

export const Media = React.memo(({file}) => {
  return (
    <>
      {file.fetching && <Spinner className={styles.spinnerBackground} />}
      {!file.fetching && file.error && (
        <div className={styles.placeholder}>
          <Result status="warning" title="There are some problems with your operation." />
        </div>
      )}
      {file.mediaFile &&
        (file.mediaType.mime.includes("video") ? (
          <video
            playsInline
            className={styles.media}
            id="videoId"
            src={URL.createObjectURL(file.mediaFile)}
            muted
            autoPlay
            loop
          />
        ) : (
          <img
            className={styles.media}
            src={URL.createObjectURL(file.mediaFile)}
            alt="Content"
          />
        ))}
    </>
  );
});
