import {connect} from "react-redux";
import {Profile} from "./component";

export const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Profile);
