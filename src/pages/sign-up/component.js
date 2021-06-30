import React from "react";
import Header from "../../components/header";
import styles from "./_.module.css";
import {Tabs, Avatar, Button, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";

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
      <form>
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
          <Input type="text" id="name" />
        </div>
        <div className={styles.row}>
          <label htmlFor="address" className="label">
            Postal address
          </label>
          <Input type="email" id="address" />
        </div>
        <div className={styles.row}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <Input type="email" id="email" />
        </div>
        <div className={styles.row}>
          <label htmlFor="tel" className="label">
            Phone number
          </label>
          <Input type="tel" id="tel" />
        </div>
      </form>
    </>
  );
};
