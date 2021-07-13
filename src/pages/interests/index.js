import {Interests} from "./component";
import {connect} from "react-redux";
import {setInterestAction} from "../../redux/actions/signUpDetails/interests";
import {signUpAction} from "../../redux/actions/user/signUp";

export const mapStateToProps = (state) => ({
  interests: state.signUpDetails.interests,
});

export const mapDispatchToProps = (dispatch) => ({
  setInterest: (interest) => dispatch(setInterestAction(interest)),
  signUp: () => dispatch(signUpAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
