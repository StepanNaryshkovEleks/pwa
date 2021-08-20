import {Challengers} from "./component";
import {connect} from "react-redux";
import {getChallengeAction} from "../../redux/actions/challenge/getChallenge";
import {submitChallengeWinnerAction} from "../../redux/actions/challenge/submitChallengeWInner";

export const mapStateToProps = (state) => ({
  user: state.user,
  challenge: state.challenge.data,
  shouldFetchChallenge: state.challenge.shouldFetchChallenge,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchChallenge: (props) => dispatch(getChallengeAction(props)),
  submitChallengeWinner: (props) => dispatch(submitChallengeWinnerAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Challengers);
