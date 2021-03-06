import {Challenges} from "./component";
import {connect} from "react-redux";
import {getChallengesAction} from "../../redux/actions/challenge/getChallenges";

export const mapStateToProps = (state) => ({
  challengesWithDetails: state.challenges.challengesWithDetails,
  fetching: state.challenges.fetching,
  actorId: state.user.actorHandle.actorId,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchChallenges: (props) => dispatch(getChallengesAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);
