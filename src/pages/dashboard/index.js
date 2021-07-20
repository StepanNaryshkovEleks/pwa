import {Dashboard} from "./component";
import {connect} from "react-redux";

export const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
