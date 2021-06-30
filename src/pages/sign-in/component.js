import React from "react";
import CNST from "../../constants";
import {Link} from "react-router-dom";
import {Button, Input} from "antd";
import styles from "./_.module.css";
import Header from "../../components/header";

export const SignIn = () => {
  return (
    <>
      <Header title="Sign in" />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="" className="label">
            Email
          </label>
          <Input type="email" />
        </div>
        <div className={styles.row}>
          <label htmlFor="" className="label">
            Password
          </label>
          <Input.Password iconRender={false} visibilityToggle={false} />
        </div>
        <Link to={CNST.ROUTES.FORGOT_PASSWORD} className={styles.link}>
          Forgot your password?
        </Link>
        <Button type="primary" htmlType="submit">
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
