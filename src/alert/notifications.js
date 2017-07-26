import { success } from "react-notification-system-redux";

export const notificationLoadCharacters = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "Loading new characters",
  // message: "",
  position: "tr",
  autoDismiss: 2
  // action: {
  //   label: "Click me!!",
  //   callback: () => alert("clicked!")
  // }
};

export const notificationCharacterAdded = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "New character added to favourites!",
  // message: `${this.props.name}, please welcome!`,
  position: "tr",
  autoDismiss: 2
  // action: {
  //   label: "Click me!!",
  //   callback: () => alert("clicked!")
  // }
};

export const notificationCharacterDeleted = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "Character deleted from favourites!",
  // message: `${this.props.name}, please welcome!`,
  position: "tr",
  autoDismiss: 2
  // action: {
  //   label: "Click me!!",
  //   callback: () => alert("clicked!")
  // }
};

export const notificationLoadComics = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "Loading new comics",
  // message: "",
  position: "tr",
  autoDismiss: 2
  // action: {
  //   label: "Click me!!",
  //   callback: () => alert("clicked!")
  // }
};

export const notificationComicAdded = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "New comic added to favourites!",
  // message: `${this.props.name}, please welcome!`,
  position: "tr",
  autoDismiss: 2
  // action: {
  //   label: "Click me!!",
  //   callback: () => alert("clicked!")
  // }
};

export const notificationComicDeleted = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "Comic deleted from favourites!",
  // message: `${this.props.name}, please welcome!`,
  position: "tr",
  autoDismiss: 2
  // action: {
  //   label: "Click me!!",
  //   callback: () => alert("clicked!")
  // }
};

export const notificationLoginFailed = {
  title: "Loading failed!",
  position: "tr",
  autoDismiss: 2
};

export const notificationRegistrationCompleted = {
  title: "Registration completed! You can login!",
  position: "tr",
  autoDismiss: 2
};

export const notificationUnexpectedErrorOccurred = {
  title: "We are sorry - unexpected error occurred.",
  position: "tr",
  autoDismiss: 2
};

export const notificationInvalidPasswords = {
  title:
    "Please make sure that your passwords are identical and have at least 8 characters.",
  position: "tr",
  autoDismiss: 2
};
