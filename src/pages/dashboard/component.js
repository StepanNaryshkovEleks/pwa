import React, {useEffect} from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import settingsIcon from "../../images/settings.svg";
import userImg from "../../images/user.png";
import axios from "axios";
import {getToken} from "../../helpers/local-storage-service";

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.SETTINGS}>
    <img src={settingsIcon} alt="Settings" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const Dashboard = ({user}) => {
  useEffect(() => {
    // const reqPayload = {"jsonType":"vee.RecordProfileForm","profileDefinition":{"profileReference":{"assetId":{"id":"custodianName"}},"propertyDataArray":[{"id":"asset.id","value":"custodianName"}, {"id":"asset.type","value":"vee.Profile"}]}};
    const reqPayload = {
      jsonType: "vee.RecordProfileForm",
      profileDefinition: {
        profileReference: {assetId: {id: "custodianName"}},
        propertyDataArray: [
          {id: "asset.id", value: "custodianName"},
          {id: "asset._email", value: "test@gmail.com"},
          {id: "asset.email", value: "test@gmail.com"},
          {id: "_email", value: "test@gmail.com"},
          {id: "email", value: "test@gmail.com"},
          {id: "asset.type", value: "vee.Profile"},
          {id: "asset.owner", value: "1aacabd9b99fb9b21373"},
        ],
      },
    };

    axios
      .put("rs/application/form/vee", reqPayload, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "realm-token": getToken(),
          "security-token": user.securityToken,
        },
      })
      .then((res) => console.log(res))
      .catch((error) => {
        throw error.response.data;
      });
  }, []);

  return (
    <>
      <Header
        title="Welcome to Vee"
        LeftComponent={SettingsIcon}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <Footer />
    </>
  );
};
