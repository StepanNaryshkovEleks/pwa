import React, {useCallback, useEffect, useRef, useState} from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Challenge from "../../components/challenge";
import {Tabs} from "antd";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import settingsIcon from "../../images/settings.svg";
import userImg from "../../images/user.png";
import styles from "./_.module.css";
import getAdvertisement from "../../helpers/getAdvertisement";
import usePrevious from "../../hooks/usePrev";
import FullPageAdv from "../../components/advertisement/full-page";

const {TabPane} = Tabs;

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.SETTINGS}>
    <img src={settingsIcon} alt="Settings" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const Dashboard = ({
  fetchChallenges,
  challenges,
  user,
  mediaForClosedChallenges,
  getWinnerFile,
  shouldShowAdv,
}) => {
  const [advImages, setAdvImages] = useState({
    big: null,
    color: null,
    small: null,
  });
  const prevShouldShowAdvStatus = usePrevious(shouldShowAdv);
  const [tab, setTab] = useState();
  const [isChallengeFetched, setChallengeFetch] = useState(false);

  useEffect(() => {
    if (shouldShowAdv && !prevShouldShowAdvStatus) {
      setAdvImages(getAdvertisement());
    }
  }, [prevShouldShowAdvStatus, shouldShowAdv]);

  useEffect(() => {
    if (user?.actorHandle?.actorId && !isChallengeFetched) {
      fetchChallenges();
      setChallengeFetch(true);
    }
  }, [fetchChallenges, user, isChallengeFetched]);

  const handleClosed = useCallback(
    () =>
      setAdvImages((prev) => {
        return {
          ...prev,
          big: null,
          color: null,
        };
      }),
    []
  );

  return (
    <main className={styles.dashboard}>
      {advImages.big && <FullPageAdv url={advImages.big} handleClosed={handleClosed} />}
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
                <Challenge
                  key={
                    challenge.challengePotential.challengeState.challengeDefinition
                      .challengeReference.challengeId
                  }
                  data={challenge.challengePotential.challengeState}
                  challengeIndex={i}
                  userId={user.actorHandle.actorId}
                  to={{
                    pathname: CNST.ROUTES.CHALLENGE_SPECIFICS,
                    state: {
                      defaultTab: CNST.ROUTES.CHALLENGE_ACTIVITIES_TAB,
                      role: participant.participantRole,
                      isOwner:
                        challenge.challengePotential.challengeState.challengeDefinition
                          .challengeOwnerHandle.actorId === user.actorHandle.actorId,
                      challengeId:
                        challenge.challengePotential.challengeState.challengeDefinition
                          .challengeReference.challengeId,
                    },
                  }}
                />
              );
            })}
          </section>
        </TabPane>
        <TabPane tab="Closed Challenges" key="closed">
          <section className={styles.challenges}>
            {challenges.closed.map((challenge, i) => (
              <Challenge
                isClosed={true}
                getWinnerFile={getWinnerFile}
                mediaForClosedChallenges={mediaForClosedChallenges}
                user={user}
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
