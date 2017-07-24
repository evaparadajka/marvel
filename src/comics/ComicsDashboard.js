import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import ComicList from "./ComicList";
import Button from "../user_interface/Button";
import { appendFavouritesComics } from "../comic-details/selectors";
import PropTypes from "prop-types";
import Notifications, { success } from "react-notification-system-redux";
import { notificationLoadComics } from "../alert/notifications";
import PageTitle from "../user_interface/PageTitle";

class ComicsDashboard extends React.Component {
  showNotification = message => {
    this.context.store.dispatch(message);
  };
  fetchComics(offset) {
    apiMarvel
      .get("/comics", {
        params: {
          offset: offset
        }
      })
      .then(response => {
        this.props.dispatch({
          type: "FETCH_COMICS",
          payload: response.data.data.results
        });
      })
      .catch(error => console.log(error));
  }

  show = id => {
    this.props.router.push("/comic-details/" + id);
  };

  clickNewComics = e => {
    e.preventDefault();
    this.showNotification(success(notificationLoadComics));
    this.fetchComics(this.props.comicsToSkip);
  };

  render() {
    return (
      <div className="center">
        <div className="img-container">
          <PageTitle title="MARVEL'S COMICS - FIND YOUR FAVOURITES" />
          <ComicList show={this.show} comics={this.props.comics} />
        </div>
        <br />
        <Button
          onClick={this.clickNewComics}
          className="btn-danger"
          label="Load more..."
        />
        <br />
        <br />
      </div>
    );
  }
}
ComicsDashboard.contextTypes = {
  store: PropTypes.object
};

const mapStateToProps = state => {
  return {
    comics: appendFavouritesComics(state),
    comicsToSkip: state.comics.weHaveFetched
  };
};

export default connect(mapStateToProps)(ComicsDashboard);
