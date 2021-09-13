import React, {useState} from "react";
import Header from "../../components/header";
import styles from "./_.module.css";
import dayjs from "dayjs";
import {Tabs, Avatar, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {DatePicker, Select} from "antd";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import {Helmet} from "react-helmet";
import validate from "../../helpers/validate";

const {Option} = Select;
const {TabPane} = Tabs;

const GeneralInputs = ({isUserTab, signUpDetails, handleChange, handleBlur}) => {
  return (
    <>
      <div className={styles.img}>
        <Avatar size={64} icon={<UserOutlined />} />
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
          onBlur={handleBlur}
        />
      </div>
      <div className={`${styles.row} ${styles.rowDisabled}`}>
        <label htmlFor="address" className="label">
          Postal address
        </label>
        <Input
          disabled
          name="postalAddress"
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
      <div className={`${styles.row} ${styles.rowDisabled}`}>
        <label htmlFor="email" className="label">
          Email
        </label>
        <Input
          disabled
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
      <div className={`${styles.row} ${styles.rowDisabled}`}>
        <label htmlFor="tel" className="label">
          Phone number
        </label>
        <Input
          disabled
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
  const [validationError, setValidationError] = useState(false);
  const isUserTab = signUpDetails.activeAccountDetailsTab === "user";

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

  const handleBlur = (ev) => {
    const isValidated = validate(ev.target.value, ev.target.name);
    setValidationError(!isValidated);
  };

  let disabledNextStep = false;
  if (isUserTab) {
    disabledNextStep =
      signUpDetails.userDetails.name &&
      signUpDetails.userDetails.date &&
      !validationError;
  } else {
    disabledNextStep = signUpDetails.companyDetails.name && !validationError;
  }

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
              signUpDetails={signUpDetails}
              isUserTab={isUserTab}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <div className={styles.row}>
              <label htmlFor="date" className="label">
                Date of Birth
              </label>
              <DatePicker
                disabledDate={(current) => current > dayjs().startOf("day")}
                suffixIcon={React.Fragment}
                bordered={false}
                allowClear={true}
                inputReadOnly={true}
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
              <label htmlFor="gender" className="label">
                Gender
              </label>
              <Select
                defaultValue={signUpDetails.userDetails.gender}
                showArrow={false}
                bordered={false}
                className={styles.select}
                onChange={(ev) => {
                  handleChange({
                    target: {
                      name: "gender",
                      value: ev,
                    },
                  });
                }}
              >
                <Option value="man">Woman</Option>
                <Option value="woman">Man</Option>
                <Option value="unknown">Prefer not to disclose</Option>
              </Select>
            </div>
          </TabPane>
          <TabPane tab="Company" key="company">
            <GeneralInputs
              signUpDetails={signUpDetails}
              isUserTab={isUserTab}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <div className={`${styles.row} ${styles.rowDisabled}`}>
              <label htmlFor="website" className="label">
                Website
              </label>
              <Input
                disabled
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
        <div className={`${styles.error} ${validationError ? styles.visible : ""}`}>
          Name should be 3-16 symbols and can contain only letters, digits and some
          special symbols (# _ -)
        </div>
        <Link
          disabled={!disabledNextStep}
          to={CNST.ROUTES.CREATING_PASSWORD}
          className="link link--primary"
        >
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
