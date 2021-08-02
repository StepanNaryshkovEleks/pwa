import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import Header from "../../components/header";
import styles from "./_.module.css";
import userImg from "../../images/user.png";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import closeIcon from "../../images/close-white.svg";
import {Button, notification} from "antd";
import VideoCamera from "../../images/video-camera.svg";

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.DASHBOARD}>
    <img src={closeIcon} alt="Go back" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

const openNotificationWithIcon = (description) => {
  notification["error"]({
    message: "Error",
    description,
  });
};

export const UploadMedia = ({match}) => {
  const [files, setFiles] = useState([]);
  const handleFileInput = async (e) => {
    // handle validations
    const file = e.target.files[0];

    if ((file.size / (1024 * 1024)).toFixed(2) >= 500) {
      openNotificationWithIcon("The size should be less than 500mb");
      return;
    }

    const type = file.type.indexOf("image") >= 0 ? "img" : "video";
    const url = URL.createObjectURL(file);

    if (type === "video") {
      var video = document.createElement("video");
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        const duration = video.duration.toFixed(2);

        if (duration > 30) {
          openNotificationWithIcon("The duration should be less than 30sec");
          return;
        }
        setFiles([
          ...files,
          {
            url,
            duration,
            type,
          },
        ]);
      });
    } else {
      setFiles([
        ...files,
        {
          url,
          duration: 0,
          type,
        },
      ]);
    }
  };
  console.log("files", files);
  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#006DFF" />
      </Helmet>
      <Header
        classes={styles.wrap}
        title={`Vee Challenge #${match.params.challengeId}`}
        LeftComponent={SettingsIcon}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <h1 className={styles.title}>Select Video</h1>
      <div className={styles.files}>
        {files.map((file) => {
          return file.type === "img" ? (
            <img key={file.url} src={file.url} alt="" className={styles.item} />
          ) : (
            <video key={file.url} src={file.url} className={styles.item} />
          );
        })}
      </div>
      <Button>
        <input
          className={styles.input}
          type="file"
          accept="video/*,image/*"
          onChange={handleFileInput}
        />
        <img src={VideoCamera} className={styles.camera} alt="Content" />
        Add Content
      </Button>
    </>
  );
};
