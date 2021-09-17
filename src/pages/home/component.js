import React from "react";
import CNST from "../../constants";
import logo from "./../../images/logo.svg";
import styles from "./_.module.css";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

export const Home = () => {
  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#006DFF" />
      </Helmet>
      <div className={styles.wrap}>
        <img
          src={logo}
          alt="Vee, Challenge the world"
          height="126"
          width="190"
          className={styles.img}
        />
        <div className={styles.nav}>
          <Link to={CNST.ROUTES.SIGN_UP} className="link link--primary">
            Sign Up
          </Link>
          <Link to={CNST.ROUTES.SIGN_IN} className="link link--secondary">
            Log In
          </Link>
        </div>
      </div>
      <span className={styles.bg} />
    </>
  );
};
