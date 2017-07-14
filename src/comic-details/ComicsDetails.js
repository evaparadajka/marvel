import React from "react";
import { connect } from "react-redux";

class ComicDetails extends React.Component {
  render() {
    return <div>ewa</div>;
  }
}

const mapStateToProps = state => {
  return {
    comics: state.comics.comicsToShow,
    userComicsCollection: state.comics.userComicsCollection,
    session: state.session
  };
};

export default connect(mapStateToProps)(ComicDetails);
