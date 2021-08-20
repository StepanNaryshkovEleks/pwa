import {ChallengeActivities} from "./component";
import {connect} from "react-redux";

export const mapStateToProps = (state) => ({
  user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ChallengeActivities);
