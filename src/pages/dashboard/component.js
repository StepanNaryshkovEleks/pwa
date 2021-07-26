import React, {useEffect, useState} from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Challenge from "../../components/challenge";
import {Tabs} from "antd";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import settingsIcon from "../../images/settings.svg";
import userImg from "../../images/user.png";
import styles from "./_.module.css";
import {
  listLocalProfileHandlesFormRequest,
  shareProfileRequest,
} from "../../redux/sagas/user";
import {getToken} from "../../helpers/local-storage-service";

const {TabPane} = Tabs;

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.SETTINGS}>
    <img src={settingsIcon} alt="Settings" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const Dashboard = ({fetchChallenges, challenges, fetching, user}) => {
  const [tab, setTab] = useState();

  useEffect(() => {
    if (!fetching && !challenges) {
      fetchChallenges();
    }
  });

  return (
    <main className={styles.dashboard}>
      <Header
        title="Welcome to Vee"
        LeftComponent={SettingsIcon}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <Tabs defaultActiveKey={tab} onChange={setTab} centered={true}>
        <TabPane tab="Active Challenges" key="active">
          <section className={styles.challenges}>
            {challenges &&
              challenges.map((challenge, i) => (
                <Challenge
                  key={i}
                  data={{...challenge, username: user.actorHandle.assetId.id}}
                  challengeIndex={i}
                />
              ))}
          </section>
        </TabPane>
        <TabPane tab="Closed Challenges" key="closed"></TabPane>
      </Tabs>
      <Footer />
    </main>
  );
};
