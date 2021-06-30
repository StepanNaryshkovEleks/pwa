import {Interests} from "./component";
import {connect} from "react-redux";
import {setInterestAction} from "../../redux/actions/interests/setInterest";

export const mapStateToProps = (state) => ({
  interests: state.interests,
});

export const mapDispatchToProps = (dispatch) => ({
  setInterest: (interest) => dispatch(setInterestAction(interest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
