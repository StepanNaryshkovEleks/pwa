import {ChallengeOwnerActivities} from "./component";
import {connect} from "react-redux";

export const mapStateToProps = (state) => ({
  user: state.user,
  challenge: state.challenge.data,
  mediaFiles: state.challenge.mediaFilesForDetails,
});

export default connect(mapStateToProps, null)(ChallengeOwnerActivities);
