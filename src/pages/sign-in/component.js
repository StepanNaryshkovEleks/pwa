import React, {useState} from "react";
import CNST from "../../constants";
import {Link} from "react-router-dom";
import {Button, Input} from "antd";
import styles from "./_.module.css";
import Header from "../../components/header";
import {Helmet} from "react-helmet";

export const SignIn = ({signIn}) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    signIn({
      password,
      name,
    });
  };
  return (
    <>
      <Helmet>
        <body className={styles.body} />
      </Helmet>
      <Header title="I already have an account" />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name" className="label">
            Name
          </label>
          <Input
            allowClear={true}
            type="name"
            id="name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password" className="label">
            Password
          </label>
          <Input.Password
            allowClear={true}
            iconRender={false}
            visibilityToggle={false}
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Link to={CNST.ROUTES.FORGOT_PASSWORD} className={styles.link}>
          Forgot your password?
        </Link>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!name.length || !password.length}
        >
          Log In
        </Button>
      </form>
      <footer className={styles.footer}>
        <span className={styles.footerText}>I don’t have an account.</span>{" "}
        <Link to={CNST.ROUTES.SIGN_UP}>Create</Link>
      </footer>
    </>
  );
};
