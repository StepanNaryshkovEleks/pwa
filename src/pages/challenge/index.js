import {ChallengePage} from "./component";
import {connect} from "react-redux";
import {getChallengeAction} from "../../redux/actions/challenge/getChallenge";
import {engageChallengeAction} from "../../redux/actions/challenge/engageChallenge";

export const mapStateToProps = (state) => ({
  user: state.user,
  challenge: state.challenge.data,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchChallenge: (props) => dispatch(getChallengeAction(props)),
  engageChallenge: (props) => dispatch(engageChallengeAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePage);
