import {Challengers} from "./component";
import {connect} from "react-redux";
import {getChallengeAction} from "../../redux/actions/challenge/getChallenge";

export const mapStateToProps = (state) => ({
  user: state.user,
  challenge: state.challenge.data,
  shouldFetchChallenge: state.challenge.shouldFetchChallenge,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchChallenge: (props) => dispatch(getChallengeAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Challengers);
