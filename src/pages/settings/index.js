import {Settings} from "./component";
import {connect} from "react-redux";
import {signOutAction} from "../../redux/actions/user/signOut";

export const mapStateToProps = (state) => ({
  realmToken: state.user.realmToken,
});

export const mapDispatchToProps = (dispatch) => ({
  signOut: (realmToken) => dispatch(signOutAction(realmToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
