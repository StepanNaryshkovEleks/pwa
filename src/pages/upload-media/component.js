import React, {useEffect, useRef, useState} from "react";
import {Helmet} from "react-helmet";
import Header from "../../components/header";
import styles from "./_.module.css";
import userImg from "../../images/user.png";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import closeIcon from "../../images/close-white.svg";
import {Button, notification, Modal, Spin} from "antd";
import VideoCamera from "../../images/video-camera.svg";
import {Redirect} from "react-router";

const SettingsIcon = ({className, onClick, shouldBeRedirected = false}) => {
  if (shouldBeRedirected) {
    return (
      <Link to={CNST.ROUTES.DASHBOARD}>
        <img src={closeIcon} alt="Go back" className={className} />
      </Link>
    );
  }
  return (
    <span onClick={onClick}>
      <img src={closeIcon} alt="Go back" className={className} />
    </span>
  );
};

const UserImage = ({userImg, className}) => (
  <Link to={CNST.ROUTES.PROFILE}>
    <img src={userImg} alt="User" className={className} />
  </Link>
);

const openNotificationWithIcon = (description) => {
  notification["error"]({
    message: "Error",
    description,
  });
};

const Video = ({file}) => {
  const videoRef = useRef();
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause(); // this hack needs for mobile safari which does not show first frame
    }
  }, [videoRef]);

  return (
    <>
      <video className={styles.item} preload="metadata" autoPlay muted ref={videoRef}>
        <source src={file.url} />
      </video>
      <span className={styles.duration}>
        00:{file.duration < 10 ? "0" + file.duration : file.duration}
      </span>
    </>
  );
};

export const UploadMedia = ({match, uploadMedia, location, isFileLoading}) => {
  const [files, setFiles] = useState([]);
  const [shouldBeRedirected, setRedirect] = useState(false);
  const [isLoadingFile, setLoadingFile] = useState(false);
  let loadingFile = useRef(null);
  const [isVisibleModal, setModalState] = useState(false);
  const [activeFile, setActiveFile] = useState(0);
  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];
    if (!file) return;
    if ((file.size / (1024 * 1024)).toFixed(2) >= 500) {
      openNotificationWithIcon("The size should be less than 500mb");
      return;
    }
    const mediaExtension = file.name.slice(file.name.lastIndexOf("."));
    const type = file.type.indexOf("image") >= 0 ? "img" : "video";
    const url = URL.createObjectURL(file);

    if (!CNST.ALLOWED_FILES.includes(mediaExtension.toLowerCase())) {
      openNotificationWithIcon("Sorry, we do not support this format of the file");
      return;
    }
    setLoadingFile(true);
    if (type === "video") {
      let video = document.createElement("video");
      video.src = url;
      loadingFile.current = video;
      video.addEventListener("durationchange", () => {
        const duration = video.duration.toFixed(0);
        if (duration > 30) {
          openNotificationWithIcon("The duration should be less than 30sec");
          return;
        }
        setFiles([
          ...files,
          {
            file,
            url,
            duration,
            type,
            fileSize: file.size,
            mediaExtension,
          },
        ]);
      });
    } else {
      setFiles([
        ...files,
        {
          file,
          url,
          duration: 0,
          type,
          fileSize: file.size,
          mediaExtension,
        },
      ]);
    }
    setLoadingFile(false);
  };

  const handleSubmit = () => {
    uploadMedia({
      ...files[activeFile],
      challengeId: match.params.challengeId,
      originChallengeId: location.state.challengeId,
      callback: () => setRedirect(true),
    });
  };

  if (shouldBeRedirected) {
    return <Redirect to={CNST.ROUTES.DASHBOARD} />;
  }

  const handleCancelUploading = () => {
    setLoadingFile(false);
    loadingFile.current?.remove();
    loadingFile.current = null;
  };

  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#006DFF" />
      </Helmet>
      <Header
        classes={styles.wrap}
        title="Vee Challenge"
        LeftComponent={(props) =>
          SettingsIcon({
            ...props,
            onClick: () => setModalState(true),
            shouldBeRedirected: files.length === 0,
          })
        }
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      {isLoadingFile && (
        <div className={styles.loadingWrap}>
          <Spin tip="Loading..." />
          <button
            className={styles.cancelBtn}
            type="button"
            onClick={handleCancelUploading}
          >
            Cancel
          </button>
        </div>
      )}
      <Modal
        wrapClassName={styles.modalWrap}
        title="Do you want to exit?"
        visible={isVisibleModal}
        centered
        okText="Stay"
        cancelText={<Link to={CNST.ROUTES.DASHBOARD}>Leave</Link>}
        onOk={() => setModalState(false)}
        closable={false}
        width={270}
      >
        It will interrupt file uploading and will delete all media files
      </Modal>
      <h1 className={styles.title}>Select Media</h1>
      <div className={styles.files}>
        {files.map((file, index) => {
          return (
            <div
              key={file.url}
              onClick={() => setActiveFile(index)}
              className={`${styles.media} ${
                activeFile === index ? styles.activeMedia : ""
              }`}
            >
              {file.type === "img" ? (
                <img src={file.url} alt="" className={styles.item} />
              ) : (
                <Video file={file} />
              )}
            </div>
          );
        })}
      </div>
      <Button className={styles.btn} disabled={files.length === 5}>
        <input
          className={styles.input}
          type="file"
          accept="video/*,image/*"
          onChange={handleFileInput}
        />
        <img src={VideoCamera} className={styles.camera} alt="Content" />
        Add New Video/Photo
      </Button>
      <Button
        className={styles.btn}
        onClick={handleSubmit}
        type="primary"
        disabled={files.length === 0 || isFileLoading}
      >
        Upload
      </Button>
    </>
  );
};
