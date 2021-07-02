import {SignUp} from "./component";
import {
  setAccountDetailsTabAction,
  setUserDetailsAction,
  setCompanyDetailsAction,
} from "../../redux/actions/signUpDetails/details";
import {connect} from "react-redux";

export const mapStateToProps = (state) => ({
  signUpDetails: state.signUpDetails,
});

export const mapDispatchToProps = (dispatch) => ({
  setUserDetails: (props) => dispatch(setUserDetailsAction(props)),
  setCompanyDetails: (props) => dispatch(setCompanyDetailsAction(props)),
  setAccountDetailsTab: (props) => dispatch(setAccountDetailsTabAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
