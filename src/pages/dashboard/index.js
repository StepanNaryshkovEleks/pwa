import {Dashboard} from "./component";
import {connect} from "react-redux";

export const mapStateToProps = (state) => ({
  userImg: state.user.profileImg,
});

export default connect(mapStateToProps, null)(Dashboard);
