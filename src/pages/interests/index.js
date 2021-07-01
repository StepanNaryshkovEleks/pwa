import {Interests} from "./component";
import {connect} from "react-redux";
import {setInterestAction} from "../../redux/actions/signUpDetails/interests";

export const mapStateToProps = (state) => ({
  interests: state.signUpDetails.interests,
});

export const mapDispatchToProps = (dispatch) => ({
  setInterest: (interest) => dispatch(setInterestAction(interest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
