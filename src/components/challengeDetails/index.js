import {connect} from "react-redux";
import {ChallengeDetails} from "./component";
import {engageChallengeAction} from "../../redux/actions/challenge/engageChallenge";

export const mapDispatchToProps = (dispatch) => ({
  engageChallenge: (props) => dispatch(engageChallengeAction(props)),
});

export default connect(null, mapDispatchToProps)(ChallengeDetails);
