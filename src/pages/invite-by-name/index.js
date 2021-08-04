import {InviteByName} from "./component";
import {connect} from "react-redux";
import {getChallengeAction} from "../../redux/actions/challenge/getChallenge";
import {
  inviteObserverAction,
  uninviteObserverAction,
  inviteChallengerAction,
  uninviteChallengerAction,
} from "../../redux/actions/challenge/inviteUsers";

export const mapStateToProps = (state) => ({
  challenge: state.newChallenge.data,
  fetching: state.newChallenge.fetching,
  observers: state.newChallenge.observers,
  challengers: state.newChallenge.challengers,
});

export const mapDispatchToProps = (dispatch, props) => {
  const isAudience = props.match.params.invitationType === "audience";
  return {
    fetchChallenge: (props) => dispatch(getChallengeAction(props)),
    inviteUser: (props) =>
      isAudience
        ? dispatch(inviteObserverAction(props))
        : dispatch(inviteChallengerAction(props)),
    uninviteUser: (props) =>
      isAudience
        ? dispatch(uninviteObserverAction(props))
        : dispatch(uninviteChallengerAction(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteByName);
