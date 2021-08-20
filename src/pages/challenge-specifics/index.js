import {ChallengeSpecifics} from "./component";
import {connect} from "react-redux";
import {voteChallengeAction} from "../../redux/actions/challenge/voteChallenge";
import {getChallengeAction} from "../../redux/actions/challenge/getChallenge";
import {getMediaFilesAction} from "../../redux/actions/challenge/getMedia";
import {clearChallengeAction} from "../../redux/actions/challenge/clearChallenge";

export const mapStateToProps = (state) => ({
  user: state.user,
  challenge: state.challenge.data,
  isFetching: state.challenge.fetching,
});

export const mapDispatchToProps = (dispatch) => ({
  clearChallenge: (props) => dispatch(clearChallengeAction(props)),
  voteChallenge: (props) => dispatch(voteChallengeAction(props)),
  fetchChallenge: (props) => dispatch(getChallengeAction(props)),
  getMediaFiles: (props) => dispatch(getMediaFilesAction(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChallengeSpecifics);
