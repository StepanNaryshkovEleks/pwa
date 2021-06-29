import React from "react";
import CNST from "../../constants";
import {Link} from "react-router-dom";
import {Button, Form, Input} from "antd";
import styles from "./_.module.css";
import Header from "../../components/header";

const formItemLayout = {
  labelCol: {span: 24},
  wrapperCol: {span: 24},
};

export const SignIn = () => {
  return (
    <>
      <Header title="Sign in" />
      <div className={styles.wrap}>
        <Form name="basic" {...formItemLayout}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{required: true, message: "Please input your username!"}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: "Please input your password!"}]}
          >
            <Input.Password />
          </Form.Item>
          <Link to={CNST.ROUTES.FORGOT_PASSWORD}>Forgot your Password?</Link>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </Form>
        <span>
          I don’t have an account. <Link to={CNST.ROUTES.FORGOT_PASSWORD}>Create</Link>
        </span>
      </div>
    </>
  );
};
