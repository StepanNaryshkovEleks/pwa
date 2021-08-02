import {Invitation} from "./component";
import {connect} from "react-redux";
import {inviteUserAction} from "../../redux/actions/challenge/inviteUsers";

export const mapStateToProps = (state) => ({
  challenge: state.newChallenge.data,
  observers: state.newChallenge.observers,
  challengers: state.newChallenge.challengers,
});

export const mapDispatchToProps = (dispatch) => ({
  inviteUsers: (props) => dispatch(inviteUserAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);
