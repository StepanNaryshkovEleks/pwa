import {CreateChallenge} from "./component";
import {connect} from "react-redux";
import {createChallengeAction} from "../../redux/actions/challenge/createChallenge";

export const mapStateToProps = (state) => ({
  fetching: state.newChallenge.fetching,
  error: state.newChallenge.error,
});

export const mapDispatchToProps = (dispatch) => ({
  createChallenge: (props) => dispatch(createChallengeAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChallenge);
