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

  loadNextPage = () => {
    const nextPage =
      Number(
        this.props.router.location.pathname.slice(
          8,
          this.props.location.pathname.length
        )
      ) + 1;
    console.log("nextPage", nextPage);

    if (this.isPageDefined(nextPage)) {
      // this.props.dispatch({
      //   type: "CHARACTERS/LOAD_NEXT_PAGE"
      // });
      this.props.router.push("/comics/" + nextPage);
      this.loadPage(nextPage);
    } else {
      if (nextPage >= 0) {
        this.fetchPageComics(nextPage);
      }
    }
    //
  };

  isPreviousPageInStore = () => {
    if (this.props.pagination.activePage === 0) {
      // console.log("Previous page? False");
      return false;
    } else {
      // console.log("Previous page? True");
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
    console.log("previousPage", previousPage);
    // this.showNotification(success(notificationLoadCharacters));
    if (this.isPageDefined(previousPage)) {
      this.props.router.push("/comics/" + previousPage);
      this.loadPage(previousPage);
      // this.props.dispatch({
      //   type: "CHARACTERS/LOAD_PREVIOUS_PAGE"
      // });
    } else {
      if (previousPage >= 0) {
        this.fetchPageComics(previousPage);
      }
    }
  };

  isPageDefined = page => {
    console.log("Is page defined", page);
    return typeof this.props.pagination.pages[page] != "undefined"
      ? true
      : false;
    // return false;
  };
  loadPage = page => {
    console.log("load page", page);
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
    // console.log("offset", (page - 1) * charactersPerPage);
    apiMarvel
      .get("/comics", {
        params: {
          offset: page * comicsPerPage
        }
      })
      .then(response => {
        this.props.dispatch({
          type: "COMICS/FETCH_PAGE_COMICS",
          payload: response.data.data.results
        });
        console.log(response.data.data.results);

        this.props.dispatch({
          type: "COMICS/SAVE_PAGE",
          comicsOnPage: response.data.data.results.map(c => c.id),
          page: page
        });

        this.props.router.push("/comics/" + page);
        this.loadPage(page);
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

    if (this.props.location.pathname != prevProps.location.pathname) {
      if (this.isPageDefined(page)) {
        this.loadPage(page);
      } else {
        this.fetchPageComics(page);
      }
    }
  }

  //******INFINITE SCROLL*****
  // componentDidMount() {
  //   window.addEventListener("scroll", this.handleScroll);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // }
  //
  // handleScroll = event => {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
  //     this.loadNextPage();
  //   }
  // };

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

        <Button
          onClick={this.loadPreviousPage}
          className="btn-danger"
          label="Load previous page"
        />
        <Button
          onClick={this.loadNextPage}
          className="btn-danger"
          label="Load next page"
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
  console.log(state);
  return {
    // comics: appendFavouritesComics(state),
    pagination: state.paginationComics,
    comics: fetchPaginatedComics(state),
    comicsToSkip: state.comics.weHaveFetched
  };
};

export default connect(mapStateToProps)(ComicsDashboard);
