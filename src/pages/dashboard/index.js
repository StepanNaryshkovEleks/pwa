import {Dashboard} from "./component";
import {connect} from "react-redux";
import {getChallengesAction} from "../../redux/actions/challenge/getChallenges";

export const mapStateToProps = (state) => ({
  user: state.user,
  challenges: state.challenges.challengesWithDetails,
  fetching: state.challenges.fetching,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchChallenges: (props) => dispatch(getChallengesAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
