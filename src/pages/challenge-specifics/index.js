import {ChallengeSpecifics} from "./component";
import {connect} from "react-redux";
import {voteChallengeAction} from "../../redux/actions/challenge/voteChallenge";
import {clearChallengeAction} from "../../redux/actions/challenge/clearChallenge";

export const mapStateToProps = (state) => ({
  user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({
  clearChallenge: (props) => dispatch(clearChallengeAction(props)),
  voteChallenge: (props) => dispatch(voteChallengeAction(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChallengeSpecifics);
