import {Challengers} from "./component";
import {connect} from "react-redux";
import {getChallengeAction} from "../../redux/actions/challenge/getChallenge";
import {getMediaFilesAction} from "../../redux/actions/challenge/getMedia";

export const mapStateToProps = (state) => ({
  user: state.user,
  challenge: state.challenge.data,
  isFetching: state.challenge.fetching,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchChallenge: (props) => dispatch(getChallengeAction(props)),
  getMediaFiles: (props) => dispatch(getMediaFilesAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Challengers);
