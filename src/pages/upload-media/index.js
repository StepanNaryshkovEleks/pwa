import {UploadMedia} from "./component";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {uploadMediaAction} from "../../redux/actions/challenge/uploadMedia";

export const mapStateToProps = (state) => ({
  realmToken: state.user.realmToken,
});

export const mapDispatchToProps = (dispatch) => ({
  uploadMedia: (props) => dispatch(uploadMediaAction(props)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadMedia));
