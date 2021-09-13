import React, {useState} from "react";
import CNST from "../../constants";
import {Link} from "react-router-dom";
import {Button, Input} from "antd";
import styles from "./_.module.css";
import Header from "../../components/header";
import {Helmet} from "react-helmet";
import validate from "../../helpers/validate";

export const SignIn = ({signIn}) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState(false);

  const handleSubmit = () => {
    signIn({
      password,
      name,
    });
  };

  const handleBlur = (ev) => {
    const isValidated = validate(ev.target.value, ev.target.name);
    setValidationError({...validationError, [ev.target.name]: !isValidated});
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
            name="name"
            onChange={(event) => setName(event.target.value)}
            onBlur={handleBlur}
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
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            onBlur={handleBlur}
          />
        </div>
        <Link to={CNST.ROUTES.FORGOT_PASSWORD} className={styles.link}>
          Forgot your password?
        </Link>
        <div
          className={`${styles.error} ${
            validationError.name || validationError.password ? styles.visible : ""
          }`}
        >
          Name and password should be 3-16 symbols that can be only letters, digits and
          some special symbols: (# _ -) for name and (# _ @ &#38; $ ! -) for password.
        </div>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={
            !name.length ||
            !password.length ||
            validationError.name ||
            validationError.password
          }
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
