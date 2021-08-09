import React, {useEffect, useState} from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Search from "../../components/search";
import ChallengeDetails from "../../components/challengeDetails";
import {Tabs} from "antd";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import settingsIcon from "../../images/settings.svg";
import userImg from "../../images/user.png";
import styles from "./_.module.css";
import Spinner from "../../components/spinner";

const {TabPane} = Tabs;

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.SETTINGS}>
    <img src={settingsIcon} alt="Settings" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const Challenges = ({
  fetchChallenges,
  challengesWithDetails,
  fetching,
  actorId,
}) => {
  const [tab, setTab] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchChallenges({
      withDetails: true,
    });
  }, [fetchChallenges]);

  return (
    <main className={styles.challenges}>
      {fetching && <Spinner />}
      <Header
        title="Challenges"
        LeftComponent={SettingsIcon}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <Search value={search} setValue={setSearch} />
      <Tabs
        className={styles.tabs}
        defaultActiveKey={tab}
        tabPosition={"top"}
        onChange={setTab}
        centered={true}
      >
        <TabPane tab="Created" key={CNST.CHALLENGE.CREATED}>
          {challengesWithDetails.created.map((challenge, i) => (
            <ChallengeDetails key={i} data={challenge} actorId={actorId} />
          ))}
        </TabPane>
        <TabPane
          tab={
            <>
              <span>Invites</span>
              {challengesWithDetails.invites.length > 0 && (
                <div className={styles.invitesIndicator} />
              )}
            </>
          }
          key={CNST.CHALLENGE.INVITES}
        >
          {challengesWithDetails.invites.map((challenge, i) => (
            <ChallengeDetails
              type={CNST.CHALLENGE.INVITES}
              key={i}
              data={challenge}
              actorId={actorId}
            />
          ))}
        </TabPane>
        <TabPane tab="Active" key={CNST.CHALLENGE.ACTIVE}>
          {challengesWithDetails.active.map((challenge, i) => (
            <ChallengeDetails
              key={i}
              data={challenge}
              type={CNST.CHALLENGE.ACTIVE}
              actorId={actorId}
            />
          ))}
        </TabPane>
        <TabPane tab="Rejected" key={CNST.CHALLENGE.REJECTED}>
          {challengesWithDetails.rejected.map((challenge, i) => (
            <ChallengeDetails
              key={i}
              data={challenge}
              type={CNST.CHALLENGE.REJECTED}
              actorId={actorId}
            />
          ))}
        </TabPane>
      </Tabs>
      <Footer />
    </main>
  );
};
