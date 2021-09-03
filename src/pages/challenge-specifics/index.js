import {ChallengeSpecifics} from "./component";
import {connect} from "react-redux";
import {voteChallengeAction} from "../../redux/actions/challenge/voteChallenge";
import {getChallengeAction} from "../../redux/actions/challenge/getChallenge";
import {getMediaFileAction} from "../../redux/actions/challenge/getMedia";
import {clearChallengeAction} from "../../redux/actions/challenge/clearChallenge";

export const mapStateToProps = (state) => ({
  user: state.user,
  challenge: state.challenge.data,
});

export const mapDispatchToProps = (dispatch) => ({
  clearChallenge: (props) => dispatch(clearChallengeAction(props)),
  voteChallenge: (props) => dispatch(voteChallengeAction(props)),
  fetchChallenge: (props) => dispatch(getChallengeAction(props)),
  getMediaFile: (props) => dispatch(getMediaFileAction(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChallengeSpecifics);
