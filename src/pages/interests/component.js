import React from "react";
import Header from "../../components/header";
import {Checkbox, Button} from "antd";
import styles from "./_.module.css";
import chevronLeft from "./../../images/chevron-left.svg";
import {Link} from "react-router-dom";
import CNST from "../../constants";

const Icon = ({className}) => (
  <Link to={CNST.ROUTES.CREATING_PASSWORD}>
    <img src={chevronLeft} alt="Back" className={className} />
  </Link>
);

export const Interests = ({interests, setInterest}) => {
  const onCheckChange = (ev) => {
    setInterest({[ev.target.name]: ev.target.checked});
  };

  return (
    <>
      <Header title="Interests" LeftComponent={Icon} />
      <main className={styles.main}>
        <span className={styles.recommendations}>
          Choose your interests to get better challenge recommendations
        </span>
        <form className={styles.interests}>
          {Object.entries(interests).map(([name, value], i) => (
            <React.Fragment key={i}>
              <Checkbox
                name={name}
                checked={value}
                onChange={onCheckChange}
                className={styles.checkbox}
              >
                {name}
              </Checkbox>
              <div className={styles.divider} />
            </React.Fragment>
          ))}
          <Button className={styles.button}>Save Interests</Button>
        </form>
      </main>
    </>
  );
};
