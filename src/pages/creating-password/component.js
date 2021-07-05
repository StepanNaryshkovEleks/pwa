import React, {useState} from "react";
import CNST from "../../constants";
import {Link} from "react-router-dom";
import {Input} from "antd";
import styles from "./_.module.css";
import Header from "../../components/header";
import chevronLeft from "../../images/chevron-left.svg";

const Icon = ({className}) => (
  <Link to={CNST.ROUTES.SIGN_UP}>
    <img src={chevronLeft} alt="Back" className={className} />
  </Link>
);

export const CreatingPassword = ({createPassword, password}) => {
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <Header title="Create password" LeftComponent={Icon} />
      <span className={styles.recommendations}>
        Please create a strong password for your account so we can protect your privacy
      </span>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="password" className="label">
            Create Password
          </label>
          <Input.Password
            allowClear={true}
            type="password"
            id="password"
            visibilityToggle={false}
            value={password}
            onChange={(event) => createPassword(event.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password" className="label">
            Confirm Password
          </label>
          <Input.Password
            allowClear={true}
            visibilityToggle={false}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <Link
          to={CNST.ROUTES.INTERESTS}
          className="link link--primary"
          disabled={
            password.length === 0 || (password.length > 0 && password !== confirmPassword)
          }
        >
          Set Password
        </Link>
      </form>
    </>
  );
};
