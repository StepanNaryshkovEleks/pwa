import React from "react";
import {Input} from "antd";
import styles from "./_.module.css";
import searchIcon from "../../images/search.svg";

const Prefix = () => <img src={searchIcon} alt="Search" className={styles.prefix} />;

export const Search = ({value, setValue}) => {
  return (
    <div className={styles.container}>
      <Input
        placeholder={"Search"}
        prefix={<Prefix />}
        allowClear={true}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        className={!value && styles.emptyInput}
      />
    </div>
  );
};
