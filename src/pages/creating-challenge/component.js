import React, {useState} from "react";
import Header from "../../components/header";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import closeIcon from "../../images/close-white.svg";
import styles from "./_.module.css";
import {Button, Input, Switch, notification} from "antd";
import userImg from "../../images/user.png";
import Settings from "../../components/settings";
import challenges from "../../images/challenges.svg";
import VideoCamera from "../../images/video-camera.svg";
import friendsIcon from "../../images/my-friends.svg";
import {Helmet} from "react-helmet";
const {TextArea} = Input;

const openNotification = () => {
  notification.info({
    message: `It is not a part of the prototype`,
    placement: "topLeft",
  });
};

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.DASHBOARD}>
    <img src={closeIcon} alt="Go back" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const CreateChallenge = () => {
  const [isChecked, handleChange] = useState(false);
  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#006DFF" />
      </Helmet>
      <Header
        classes={styles.wrap}
        title="Vee Challenge"
        LeftComponent={SettingsIcon}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <h1 className={styles.title}>Challenge Details</h1>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="name" className="label">
            Challenge Name
          </label>
          <TextArea maxLength={50} placeholder="please input content" />
          <div className={styles.counter}>
            <bold>0</bold>/<span>50</span>
          </div>
        </div>
        <div className={`${styles.row} ${styles.rowDesc}`}>
          <label htmlFor="desc" className="label">
            Description
          </label>
          <TextArea maxLength={150} placeholder="please input content" />
          <div className={styles.counter}>
            <bold>0</bold>/<span>150</span>
          </div>
        </div>
        <div className={`${styles.row} ${styles.rowForfeit}`}>
          <label htmlFor="forfeit" className="label">
            Add forfeit?
          </label>
          <Switch onChange={handleChange} />
        </div>
        {isChecked && (
          <div className={styles.row}>
            <TextArea maxLength={150} placeholder="please input content" />
          </div>
        )}
        <Button onClick={openNotification} className={styles.btn}>
          <img src={VideoCamera} className={styles.camera} />
          Add Content
        </Button>
        <Link to="/">
          <Settings icon={challenges} title="Challengers (0)" />
        </Link>
        <Link to="/">
          <Settings icon={friendsIcon} title="Audience (0)" />
        </Link>
        <Button type="primary" className={styles.next}>
          Next step
        </Button>
      </form>
    </>
  );
};
