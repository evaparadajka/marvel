import React, { PropTypes } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import Notifications from "react-notification-system-redux";

class NotificationComponent extends React.Component {
  render() {
    const { notifications } = this.props;
    const style = {
      NotificationItem: {
        DefaultStyle: {
          margin: "10px 5px 2px 1px"
        },
        success: {
          color: "red"
        }
      }
    };
    return <Notifications notifications={notifications} style={style} />;
  }
}

NotificationComponent.contextTypes = {
  store: PropTypes.object
};

NotificationComponent.propTypes = {
  notifications: PropTypes.array
};

export default connect(state => ({ notifications: state.notifications }))(
  NotificationComponent
);
