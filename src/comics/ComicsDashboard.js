import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import ComicList from "./ComicList";
import Button from "../user_interface/Button";
import { fetchPaginatedComics } from "../comic-details/selectors";
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
        this.paginateComics(response.data.data.results);
        this.props.dispatch({
          type: "COMICS/LOAD_NEXT_PAGE"
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

  paginateComics = characters => {
    // const numOfPages = this.props.pagination.pages.length;
    this.props.dispatch({
      type: "COMICS_PAGINATE",
      charactersOnPage: characters.map(c => c.id)
    });
  };
  isNextPageInStore = () => {
    if (this.props.pagination.pagesCount === this.props.pagination.activePage) {
      console.log("Next page? False");
      return false;
    } else {
      console.log("Next page? True");
      return true;
    }
  };

  loadNextPage = () => {
    this.showNotification(success(notificationLoadComics));
    if (this.isNextPageInStore()) {
      this.props.dispatch({
        type: "COMICS/LOAD_NEXT_PAGE"
      });
    } else {
      this.fetchComics(this.props.comicsToSkip);
    }
  };

  isPreviousPageInStore = () => {
    if (this.props.pagination.activePage === 0) {
      console.log("Previous page? False");
      return false;
    } else {
      console.log("Previous page? True");
      return true;
    }
  };

  loadPreviousPage = () => {
    // this.showNotification(success(notificationLoadCharacters));
    if (this.isPreviousPageInStore()) {
      this.props.dispatch({
        type: "COMICS/LOAD_PREVIOUS_PAGE"
      });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
      this.loadNextPage();
    }
  };

  render() {
    return (
      <div className="center">
        <div className="img-container">
          <PageTitle title="MARVEL'S COMICS - FIND YOUR FAVOURITES" />
          {/* <Button
            onClick={this.loadPreviousPage}
            className="btn-danger"
            label="Load previous page"
          /> */}
          <ComicList show={this.show} comics={this.props.comics} />
        </div>
        <br />
        {/* <Button
          onClick={this.clickNewComics}
          className="btn-danger"
          label="Load more..."
        /> */}
        {/* <Button
          onClick={this.loadPreviousPage}
          className="btn-danger"
          label="Load previous page"
        /> */}
        {/* <Button
          onClick={this.loadNextPage}
          className="btn-danger"
          label="Load next page"
        /> */}
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
  console.log(state);
  return {
    // comics: appendFavouritesComics(state),
    pagination: state.paginationComics,
    comics: fetchPaginatedComics(state),
    comicsToSkip: state.comics.weHaveFetched
  };
};

export default connect(mapStateToProps)(ComicsDashboard);
