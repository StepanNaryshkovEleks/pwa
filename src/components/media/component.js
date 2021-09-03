import React from "react";
import Spinner from "../spinner";
import styles from "./_.module.css";

export const Media = React.memo(({file}) => {
  return file.mediaFile ? (
    file.mediaType.mime.includes("video") ? (
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
    )
  ) : (
    <Spinner className={styles.spinnerBackground} />
  );
});
