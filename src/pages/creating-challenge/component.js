import React from "react";
import Header from "../../components/header";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import closeIcon from "../../images/close-white.svg";
import styles from "./_.module.css";
import {Button, Input, Switch} from "antd";

const {TextArea} = Input;

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.DASHBOARD}>
    <img src={closeIcon} alt="Go back" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const CreateChallenge = ({userImg}) => {
  return (
    <>
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
        </div>
        <div className={styles.row}>
          <label htmlFor="desc" className="label">
            Description
          </label>
          <TextArea maxLength={150} placeholder="please input content" />
        </div>
        <div className={styles.row}>
          <label htmlFor="forfeit" className="label">
            Add forfeit?
          </label>
          <Switch />
        </div>
        <div className={styles.row}>
          <TextArea maxLength={150} placeholder="please input content" />
        </div>
        <Button type="primary">Share Competition</Button>
      </form>
    </>
  );
};
