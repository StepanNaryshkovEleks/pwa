import {connect} from 'react-redux';
import {signInAction} from '../../redux/actions/user/signIn';
import {SignIn} from './component';

export const mapStateToProps = (state) => ({
  fetching: state.user.fetching,
});

export const mapDispatchToProps = (dispatch) => ({
  signIn: (props) => dispatch(signInAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
