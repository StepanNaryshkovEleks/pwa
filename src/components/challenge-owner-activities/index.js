import {ChallengeOwnerActivities} from "./component";
import {connect} from "react-redux";

export const mapStateToProps = (state) => ({
  user: state.user,
  challenge: state.challenge.data,
});

export default connect(mapStateToProps, null)(ChallengeOwnerActivities);
