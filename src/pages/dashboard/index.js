import {Dashboard} from "./component";
import {connect} from "react-redux";
import {getChallengesAction} from "../../redux/actions/challenge/getChallenges";
import {getWinnerFileAction} from "../../redux/actions/challenge/getWinnerFile";

export const mapStateToProps = (state) => ({
  user: state.user,
  shouldShowAdv: state.user.shouldShowAdv,
  challenges: state.challenges.challengesWithDetails,
  mediaForClosedChallenges:
    state.challenges?.challengesWithDetails?.closedChallengesMapForMediaFiles,
  fetching: state.challenges.fetching,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchChallenges: (props) => dispatch(getChallengesAction(props)),
  getWinnerFile: (props) => dispatch(getWinnerFileAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
