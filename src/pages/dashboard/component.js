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

const {TabPane} = Tabs;

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.SETTINGS}>
    <img src={settingsIcon} alt="Settings" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const Dashboard = ({fetchChallenges, challenges, user}) => {
  const [tab, setTab] = useState();
  const [isChallengeFetched, setChallengeFetch] = useState(false);

  useEffect(() => {
    if (user?.actorHandle?.actorId && !isChallengeFetched) {
      fetchChallenges();
      setChallengeFetch(true);
    }
  }, [fetchChallenges, user, isChallengeFetched]);

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
            {challenges.active.map((challenge, i) => {
              const participant = challenge.challengePotential.challengeState.participantArray.find(
                (el) => el.participantId === user.actorHandle.actorId
              );
              return (
                <Link
                  key={
                    challenge.challengePotential.challengeState.challengeDefinition
                      .challengeReference.challengeId
                  }
                  className={styles.link}
                  to={{
                    pathname: CNST.ROUTES.CHALLENGE_SPECIFICS,
                    state: {
                      defaultTab: CNST.ROUTES.CHALLENGE_ACTIVITIES_TAB,
                      role: participant.participantRole,
                      isOwner: false,
                      challengeId:
                        challenge.challengePotential.challengeState.challengeDefinition
                          .challengeReference.challengeId,
                    },
                  }}
                >
                  <Challenge
                    data={challenge.challengePotential.challengeState}
                    challengeIndex={i}
                    userId={user.actorHandle.actorId}
                  />
                </Link>
              );
            })}
          </section>
        </TabPane>
        <TabPane tab="Closed Challenges" key="closed">
          <section className={styles.challenges}>
            {challenges.closed.map((challenge, i) => (
              <Challenge
                key={
                  challenge.challengePotential.challengeState.challengeDefinition
                    .challengeReference.challengeId
                }
                data={challenge.challengePotential.challengeState}
                challengeIndex={i + 5} //to avoid the same sequence of images in both tabs
                userId={user.actorHandle.actorId}
              />
            ))}
          </section>
        </TabPane>
      </Tabs>
      <Footer />
    </main>
  );
};
