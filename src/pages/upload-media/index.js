import {UploadMedia} from "./component";
import {connect} from "react-redux";
import {withRouter} from "react-router";

export const mapStateToProps = (state) => ({
  realmToken: state.user.realmToken,
});

export const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadMedia));
