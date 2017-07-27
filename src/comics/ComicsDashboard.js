import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import ComicList from "./ComicList";
import { fetchPaginatedComics } from "../comic-details/selectors";
import PropTypes from "prop-types";
import { success } from "react-notification-system-redux";
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
    this.props.dispatch({
      type: "COMICS_PAGINATE",
      charactersOnPage: characters.map(c => c.id)
    });
  };

  loadNextPage = () => {
    const nextPage =
      Number(
        this.props.router.location.pathname.slice(
          8,
          this.props.location.pathname.length
        )
      ) + 1;
    if (this.isPageDefined(nextPage)) {
      this.props.router.push("/comics/" + nextPage);
      this.loadPage(nextPage);
    } else {
      if (nextPage >= 0) {
        this.fetchPageComics(nextPage);
      }
    }
  };

  isPreviousPageInStore = () => {
    if (this.props.pagination.activePage === 0) {
      return false;
    } else {
      return true;
    }
  };

  loadPreviousPage = () => {
    const previousPage =
      Number(
        this.props.router.location.pathname.slice(
          8,
          this.props.location.pathname.length
        )
      ) - 1;
    if (this.isPageDefined(previousPage)) {
      this.props.router.push("/comics/" + previousPage);
      this.loadPage(previousPage);
    } else {
      if (previousPage >= 0) {
        this.fetchPageComics(previousPage);
      }
    }
  };

  isPageDefined = page => {
    return typeof this.props.pagination.pages[page] !== "undefined"
      ? true
      : false;
  };

  loadPage = page => {
    this.props.dispatch({
      type: "COMICS/LOAD_PAGE",
      payload: Number(page)
    });
  };

  loadNotFoundPage = () => {
    this.props.router.push("/not-found/");
  };

  fetchPageComics(page) {
    const comicsPerPage = 20;
    apiMarvel
      .get("/comics", {
        params: {
          offset: page * comicsPerPage
        }
      })
      .then(response => {
        if (response.data.data.results.length !== 0) {
          this.props.dispatch({
            type: "COMICS/FETCH_PAGE_COMICS",
            payload: response.data.data.results
          });
          this.props.dispatch({
            type: "COMICS/SAVE_PAGE",
            comicsOnPage: response.data.data.results.map(c => c.id),
            page: page
          });
          this.props.router.push("/comics/" + page);
          this.loadPage(page);
        } else this.loadNotFoundPage();
      })
      .catch(error => {
        console.log(error);
        this.loadNotFoundPage();
      });
  }

  componentDidMount() {
    const page = this.props.router.location.pathname.slice(
      8,
      this.props.location.pathname.length
    );
    if (this.isPageDefined(page)) {
      this.loadPage(page);
    } else {
      this.fetchPageComics(page);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const page = this.props.router.location.pathname.slice(
      8,
      this.props.location.pathname.length
    );
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.isPageDefined(page)) {
        this.loadPage(page);
      } else {
        this.fetchPageComics(page);
      }
    }
  }

  render() {
    return (
      <div className="center">
        <div className="img-container">
          <PageTitle title="MARVEL'S COMICS - FIND YOUR FAVOURITES" />
          <ComicList show={this.show} comics={this.props.comics} />
          <div className="btn-container">
            <i
              className="fa fa-arrow-left fa-5x prev-page "
              onClick={this.loadPreviousPage}
            />
            <i
              onClick={this.loadNextPage}
              className="fa fa-arrow-right fa-5x next-page"
            />
          </div>
        </div>
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
    pagination: state.paginationComics,
    comics: fetchPaginatedComics(state),
    comicsToSkip: state.comics.weHaveFetched
  };
};

export default connect(mapStateToProps)(ComicsDashboard);
