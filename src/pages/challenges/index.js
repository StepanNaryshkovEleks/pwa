import {Challenges} from "./component";
import {connect} from "react-redux";
import {getChallengesAction} from "../../redux/actions/challenge/getChallenges";

export const mapStateToProps = (state) => ({
  challenges: state.challenges.data,
  fetching: state.challenges.fetching,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchChallenges: (props) => dispatch(getChallengesAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);
