import React from "react";
import Header from "../../components/header";
import userImg from "../../images/user.png";
import {useHistory} from "react-router-dom";
import styles from "./_.module.css";
import backIcon from "../../images/chevron-left.svg";
import {Avatar, Input, notification} from "antd";
import {UserOutlined} from "@ant-design/icons";

const openNotification = () => {
  notification.info({
    message: "It is not a part of the prototype",
    placement: "topLeft",
  });
};

const BackIcon = ({className, onClick}) => (
  <button className={styles.goBack} onClick={onClick}>
    <img src={backIcon} alt="Go back" className={className} />
  </button>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const Profile = ({user}) => {
  const history = useHistory();

  return (
    <>
      <Header
        title="Edit Profile"
        LeftComponent={(props) => BackIcon({...props, onClick: () => history.goBack()})}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <div className={styles.img}>
        <Avatar size={64} icon={<UserOutlined />} />
      </div>
      <form className={styles.form}>
        <div className={`${styles.row} ${styles.rowDisabled}`}>
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <Input
            value={""}
            name="firstName"
            allowClear={true}
            type="text"
            id="firstName"
            disabled
          />
        </div>
        <div className={`${styles.row} ${styles.rowDisabled}`}>
          <label htmlFor="surname" className="label">
            Surname
          </label>
          <Input
            value={""}
            name="surname"
            allowClear={true}
            type="text"
            id="surname"
            disabled
          />
        </div>
        <div className={`${styles.row} ${styles.rowDisabled}`}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <Input
            value={""}
            name="email"
            allowClear={true}
            type="text"
            id="email"
            disabled
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="userName" className="label">
            User Name
          </label>
          <Input
            value={user.actorHandle.assetId.id}
            name="userName"
            allowClear={true}
            type="text"
            id="userName"
          />
        </div>
        <span onClick={openNotification} className="link link--primary">
          Set Account Details
        </span>
      </form>
    </>
  );
};
