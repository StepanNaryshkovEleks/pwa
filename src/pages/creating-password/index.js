import {connect} from "react-redux";
import {createPasswordAction} from "../../redux/actions/signUpDetails/password";
import {CreatingPassword} from "./component";

export const mapStateToProps = (state) => ({
  password: state.signUpDetails.password,
});

export const mapDispatchToProps = (dispatch) => ({
  createPassword: (props) => dispatch(createPasswordAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatingPassword);
