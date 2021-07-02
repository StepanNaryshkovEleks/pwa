import React from "react";
import Header from "../../components/header";
import styles from "./_.module.css";
import {Tabs, Avatar, Button, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {DatePicker, Select} from "antd";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import {Helmet} from "react-helmet";

const {Option} = Select;
const {TabPane} = Tabs;

const GeneralInputs = ({onImageChange, isUserTab, signUpDetails, handleChange}) => {
  return (
    <>
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
        <Input
          value={
            isUserTab ? signUpDetails.userDetails.name : signUpDetails.companyDetails.name
          }
          name="name"
          allowClear={true}
          type="text"
          id="name"
          placeholder="please input"
          onChange={handleChange}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="address" className="label">
          Postal address
        </label>
        <Input
          value={
            isUserTab
              ? signUpDetails.userDetails.address
              : signUpDetails.companyDetails.address
          }
          type="text"
          id="address"
          allowClear={true}
          placeholder="please input"
          onChange={handleChange}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="email" className="label">
          Email
        </label>
        <Input
          type="email"
          name="email"
          onChange={handleChange}
          value={
            isUserTab
              ? signUpDetails.userDetails.email
              : signUpDetails.companyDetails.email
          }
          id="email"
          allowClear={true}
          placeholder="please input"
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="tel" className="label">
          Phone number
        </label>
        <Input
          type="tel"
          value={
            isUserTab
              ? signUpDetails.userDetails.phoneNumber
              : signUpDetails.companyDetails.phoneNumber
          }
          name="phoneNumber"
          onChange={handleChange}
          id="tel"
          allowClear={true}
          placeholder="please input"
        />
      </div>
    </>
  );
};

export const SignUp = ({
  signUpDetails,
  setUserDetails,
  setCompanyDetails,
  setAccountDetailsTab,
}) => {
  const isUserTab = signUpDetails.activeAccountDetailsTab === "user";
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

  const handleChange = (ev) => {
    const data = {
      key: ev.target.name,
      value: ev.target.value,
    };
    if (isUserTab) {
      setUserDetails(data);
    } else {
      setCompanyDetails(data);
    }
  };

  return (
    <>
      <Helmet>
        <body className={styles.body} />
      </Helmet>
      <Header title="Account Details" />
      <form className={styles.form}>
        <Tabs
          defaultActiveKey={signUpDetails.activeAccountDetailsTab}
          onChange={setAccountDetailsTab}
          centered={true}
        >
          <TabPane tab="User" key="user">
            <GeneralInputs
              onImageChange={onImageChange}
              signUpDetails={signUpDetails}
              isUserTab={isUserTab}
              handleChange={handleChange}
            />
            <div className={styles.row}>
              <label htmlFor="date" className="label">
                Date of Birth
              </label>
              <DatePicker
                suffixIcon={React.Fragment}
                bordered={false}
                allowClear={true}
                placeholder="please input"
                id="date"
                className={styles.date}
                name="date"
                onChange={(value) =>
                  handleChange({
                    target: {
                      value,
                      name: "date",
                    },
                  })
                }
                value={
                  isUserTab
                    ? signUpDetails.userDetails.date
                    : signUpDetails.companyDetails.date
                }
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
          </TabPane>
          <TabPane tab="Company" key="company">
            <GeneralInputs
              onImageChange={onImageChange}
              signUpDetails={signUpDetails}
              isUserTab={isUserTab}
              handleChange={handleChange}
            />
            <div className={styles.row}>
              <label htmlFor="website" className="label">
                Website
              </label>
              <Input
                value={
                  isUserTab
                    ? signUpDetails.userDetails.website
                    : signUpDetails.companyDetails.website
                }
                name="website"
                onChange={handleChange}
                type="text"
                id="website"
                placeholder="please input"
                allowClear={true}
              />
            </div>
          </TabPane>
        </Tabs>
        <Link to={CNST.ROUTES.CREATING_PASSWORD} className="link link--primary">
          Set Account Details
        </Link>
      </form>
      <footer className={styles.footer}>
        <span className={styles.footerText}>I have an account.</span>{" "}
        <Link to={CNST.ROUTES.SIGN_IN}>Log In</Link>
      </footer>
    </>
  );
};
