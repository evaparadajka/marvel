import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import ComicList from "./ComicList";
import Button from "../user_interface/Button";
import { appendFavouritesComics } from "../comic-details/selectors";

class ComicsDashboard extends React.Component {
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

    this.fetchComics(this.props.comicsToSkip);
  };

  render() {
    return (
      <div className="center">
        <div className="img-container">
          <ComicList show={this.show} comics={this.props.comics} />
        </div>
        <br />
        <Button
          className="btn-danger"
          onClick={this.clickNewComics}
          label="Load more..."
        />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comics: appendFavouritesComics(state),
    comicsToSkip: state.comics.weHaveFetched
  };
};

export default connect(mapStateToProps)(ComicsDashboard);
