import {InvitationOptions} from "./component";
import {connect} from "react-redux";

export const mapStateToProps = (state) => ({
  challenge: state.newChallenge.data,
});

export default connect(mapStateToProps, null)(InvitationOptions);
