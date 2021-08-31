import React, {useState} from "react";
import Header from "../../components/header";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import closeIcon from "../../images/close-white.svg";
import styles from "./_.module.css";
import {Button, Input, Switch, notification} from "antd";
import userImg from "../../images/user.png";
import VideoCamera from "../../images/video-camera.svg";
import {Helmet} from "react-helmet";
import Spinner from "../../components/spinner";
import {useHistory} from "react-router-dom";
const {TextArea} = Input;

const openNotification = () => {
  notification.info({
    message: "It is not a part of the prototype",
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

export const CreateChallenge = ({createChallenge, fetching}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [forfeit, setForfeit] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    createChallenge({
      name,
      description,
      history,
    });
  };

  return (
    <>
      {fetching && <Spinner />}
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name" className="label">
            Challenge Name
          </label>
          <TextArea
            maxLength={50}
            placeholder="please input content"
            onChange={(ev) => setName(ev.target.value)}
          />
          <div className={styles.counter}>
            <strong>{name.length}</strong>/<span>50</span>
          </div>
        </div>
        <div className={`${styles.row} ${styles.rowDesc}`}>
          <label htmlFor="desc" className="label">
            Description
          </label>
          <TextArea
            maxLength={150}
            placeholder="please input content"
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <div className={styles.counter}>
            <strong>{description.length}</strong>/<span>150</span>
          </div>
        </div>
        <div className={`${styles.row} ${styles.rowForfeit}`}>
          <label htmlFor="forfeit" className="label">
            Add forfeit?
          </label>
          <Switch onChange={setIsChecked} />
        </div>
        {isChecked && (
          <div className={styles.row}>
            <TextArea
              maxLength={100}
              placeholder="please input content"
              onChange={(ev) => setForfeit(ev.target.value)}
            />
            <div className={styles.counter}>
              <strong>{forfeit.length}</strong>/<span>100</span>
            </div>
          </div>
        )}
        <Button onClick={openNotification} className={styles.btn}>
          <img src={VideoCamera} className={styles.camera} alt="Content" />
          Add how-to
        </Button>
        <Button
          type="primary"
          className={styles.next}
          onClick={handleSubmit}
          disabled={!name || !description}
        >
          Next step
        </Button>
      </form>
    </>
  );
};
