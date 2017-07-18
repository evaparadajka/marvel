// przenioslbym to do jakiegos modulu 'alert'/'notifications' a nie 'functions'
import Notifications, { notify } from "react-notify-toast";

export const showNotification = message => {
  let navStyleColor = {
    background: "#c94c4c",
    text: "white"
  };
  notify.show(message, "custom", 5000, navStyleColor);
};
