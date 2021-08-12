import React from "react";
import Header from "../../components/header";
import userImg from "../../images/user.png";
import styles from "../challenge/_.module.css";
import backIcon from "../../images/chevron-left.svg";
import {useHistory} from "react-router-dom";

const BackIcon = ({className, onClick}) => (
  <button className={styles.goBack} onClick={onClick}>
    <img src={backIcon} alt="Go back" className={className} />
  </button>
);
const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const ChallengeSpecifics = () => {
  const history = useHistory();
  return (
    <>
      <Header
        title="Welcome to Vee"
        LeftComponent={(props) => BackIcon({...props, onClick: () => history.goBack()})}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
    </>
  );
};
