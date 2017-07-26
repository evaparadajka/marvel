import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import Button from "../user_interface/Button";
import CharacterList from "./CharacterList";
import {
  appendFavourites,
  fetchPaginatedCharacters
} from "../character_details/selectors";
import PropTypes from "prop-types";
import Notifications, { success } from "react-notification-system-redux";
import { notificationLoadCharacters } from "../alert/notifications";
import PageTitle from "../user_interface/PageTitle";

class Dashboard extends React.Component {
  showNotification = message => {
    this.context.store.dispatch(message);
  };

  fetchCharacters(offset) {
    apiMarvel
      .get("/characters", {
        params: {
          offset: offset
        }
      })
      .then(response => {
        this.props.dispatch({
          type: "FETCH_CHAR",
          payload: response.data.data.results
        });
        console.log(response.data.data.results);
        // //paginate characters
        this.paginateCharacters(response.data.data.results);
        this.props.dispatch({
          type: "CHARACTERS/LOAD_NEXT_PAGE"
        });
      })
      .catch(error => console.log(error));
  }

  show = id => {
    this.props.router.push("/character-details/" + id);
  };

  clickNewChar = e => {
    e.preventDefault();
    this.showNotification(success(notificationLoadCharacters));
    this.fetchCharacters(this.props.charactersToSkip);
  };
  paginateCharacters = characters => {
    // const numOfPages = this.props.pagination.pages.length;
    this.props.dispatch({
      type: "CHARACTERS_PAGINATE",
      charactersOnPage: characters.map(c => c.id)
    });
  };
  isNextPageInStore = () => {
    if (this.props.pagination.pagesCount === this.props.pagination.activePage) {
      // console.log("Next page? False");
      return false;
    } else {
      // console.log("Next page? True");
      return true;
    }
  };

  loadNextPage = () => {
    //console.log(this.props.router.location);
    const page = this.props.router.location.pathname.slice(
      11,
      this.props.location.pathname.length
    );
    this.showNotification(success(notificationLoadCharacters));
    if (this.isNextPageInStore()) {
      this.props.dispatch({
        type: "CHARACTERS/LOAD_NEXT_PAGE"
      });
    } else {
      this.fetchCharacters(this.props.charactersToSkip);
    }
    this.props.router.push("/dashboard/" + (Number(page) + 1));
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
    const page = this.props.router.location.pathname.slice(
      11,
      this.props.location.pathname.length
    );
    // this.showNotification(success(notificationLoadCharacters));
    if (this.isPreviousPageInStore()) {
      this.props.dispatch({
        type: "CHARACTERS/LOAD_PREVIOUS_PAGE"
      });
      this.props.router.push("/dashboard/" + (Number(page) - 1));
    }
  };

  isPageDefined = page => {
    //console.log(this.props.pagination.pages[page]);
    return typeof this.props.pagination.pages[page] != "undefined"
      ? true
      : false;
    // return false;
  };
  loadPage = page => {
    this.props.dispatch({
      type: "CHARACTERS/LOAD_PAGE",
      payload: page
    });
  };
  loadNotFoundPage = () => {
    this.props.router.push("/not-found/");
  };

  fetchPageCharacters(page) {
    this.loadPage(page);
    const charactersPerPage = 20;
    console.log("offset", (page - 1) * charactersPerPage);
    apiMarvel
      .get("/characters", {
        params: {
          offset: (page - 1) * charactersPerPage
        }
      })
      .then(response => {
        this.props.dispatch({
          type: "CHARACTERS/FETCH_PAGE_CHARACTERS",
          payload: response.data.data.results
        });
        console.log(response.data.data.results);

        this.props.dispatch({
          type: "CHARACTERS/SAVE_PAGE",
          charactersOnPage: response.data.data.results.map(c => c.id),
          page: page - 1
        });
      })
      .catch(error => {
        console.log(error);
        this.loadNotFoundPage();
      });
  }

  componentDidMount() {
    const page = this.props.router.location.pathname.slice(
      11,
      this.props.location.pathname.length
    );

    if (this.isPageDefined(page)) {
      this.loadPage(page);
    } else {
      this.fetchPageCharacters(page);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const page = this.props.router.location.pathname.slice(
      11,
      this.props.location.pathname.length
    );

    if (this.props.location.pathname != prevProps.location.pathname) {
      if (this.isPageDefined(page)) {
        this.loadPage(page);
      } else {
        this.fetchPageCharacters(page);
      }
    }
  }

  //**** INFINITE SCROLL *****
  // componentDidMount() {
  //   window.addEventListener("scroll", this.handleScroll);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // }
  //
  // handleScroll = event => {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
  //     this.loadNextPage();
  //   }
  // };

  render() {
    const charactersToRender = this.props.characters;

    return (
      <div className="center" onScroll={this.onScroll}>
        <div className="img-container">
          <PageTitle title="MARVEL'S CHARACTERS - FIND YOUR FAVOURITES" />

          <CharacterList show={this.show} characters={charactersToRender} />
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
Dashboard.contextTypes = {
  store: PropTypes.object
};
const mapStateToProps = state => {
  console.log(state.paginationCharacters);
  return {
    pagination: state.paginationCharacters,
    characters: fetchPaginatedCharacters(state),
    charactersToSkip: state.characters.weHaveFetched
  };
};

export default connect(mapStateToProps)(Dashboard);
