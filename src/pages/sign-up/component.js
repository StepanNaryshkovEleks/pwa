import React from "react";
import Header from "../../components/header";
import styles from "./_.module.css";
import {Tabs, Avatar, Button, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {DatePicker, Select} from "antd";
import {Link} from "react-router-dom";
import CNST from "../../constants";

const {Option} = Select;
const {TabPane} = Tabs;

function callback(key) {
  console.log(key);
}

export const SignUp = () => {
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result);
        // setImage(dispatch, {
        //   frontImage: e.target.result,
        //   backImage: event.target.files[0]
        // });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <>
      <Header title="Account Details" />
      <Tabs defaultActiveKey="1" onChange={callback} centered={true}>
        <TabPane tab="User" key="1">
          User
        </TabPane>
        <TabPane tab="Company" key="2">
          Company
        </TabPane>
      </Tabs>
      <form className={styles.form}>
        <div className={styles.img}>
          <Avatar size={64} icon={<UserOutlined />} />
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="name" className="label">
            Name
          </label>
          <Input type="text" id="name" placeholder="please input" allowClear={true} />
        </div>
        <div className={styles.row}>
          <label htmlFor="address" className="label">
            Postal address
          </label>
          <Input type="email" id="address" allowClear={true} placeholder="please input" />
        </div>
        <div className={styles.row}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <Input type="email" id="email" allowClear={true} placeholder="please input" />
        </div>
        <div className={styles.row}>
          <label htmlFor="tel" className="label">
            Phone number
          </label>
          <Input type="tel" id="tel" allowClear={true} placeholder="please input" />
        </div>
        <div className={styles.row}>
          <label htmlFor="date" className="label">
            Date of Birth
          </label>
          <DatePicker
            suffixIcon={() => {}}
            bordered={false}
            allowClear={true}
            placeholder="please input"
            id="date"
            className={styles.date}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="date" className="label">
            Gender
          </label>
          <Select showArrow={false} bordered={false} className={styles.select}>
            <Option value="jack">Prefer not to disclose</Option>
          </Select>
        </div>
        <Button type="primary">Set Account Details</Button>
      </form>
      <footer className={styles.footer}>
        <span className={styles.footerText}>I have an account.</span>{" "}
        <Link to={CNST.ROUTES.SIGN_IN}>Log In</Link>
      </footer>
    </>
  );
};
