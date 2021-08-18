import {ChallengeSpecifics} from "./component";
import {connect} from "react-redux";
import {voteChallengeAction} from "../../redux/actions/challenge/voteChallenge";

export const mapStateToProps = (state) => ({
  user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({
  voteChallenge: (props) => dispatch(voteChallengeAction(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChallengeSpecifics);
