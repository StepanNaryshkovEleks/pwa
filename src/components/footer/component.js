import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./_.module.css";
import CNST from "../../constants";
import {useLocation} from "react-router-dom";

import homeIcon from "../../images/home.svg";
import homeActiveIcon from "../../images/home-active.svg";
import createIcon from "../../images/create.svg";
import challengesIcon from "../../images/challenges.svg";
import challengesActiveIcon from "../../images/challenges-active.svg";
import discoverIcon from "../../images/discover.svg";
import discoverActiveIcon from "../../images/discover-active.svg";

const NavItem = ({path, image, activeImage, title}) => {
  const location = useLocation();

  return (
    <NavLink to={path} exact className={styles.link} activeStyle={{color: "#006DFF"}}>
      <img
        src={location.pathname === path ? activeImage : image}
        alt={title}
        className={styles.icon}
      />
      <span>{title}</span>
    </NavLink>
  );
};

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <NavItem
        path={CNST.ROUTES.DASHBOARD}
        image={homeIcon}
        activeImage={homeActiveIcon}
        title={"Home"}
      />
      <NavItem path={CNST.ROUTES.HOME} image={createIcon} title={"Create"} />
      <NavItem
        path={CNST.ROUTES.HOME}
        image={challengesIcon}
        activeImage={challengesActiveIcon}
        title={"Challenges"}
      />
      <NavItem
        path={CNST.ROUTES.HOME}
        image={discoverIcon}
        activeImage={discoverActiveIcon}
        title={"Discover"}
      />
    </div>
  );
};
