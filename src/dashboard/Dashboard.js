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

import InfiniteScroll from "redux-infinite-scroll";

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
      console.log("Next page? False");
      return false;
    } else {
      console.log("Next page? True");
      return true;
    }
  };

  loadNextPage = () => {
    // this.showNotification(success(notificationLoadCharacters));
    if (this.isNextPageInStore()) {
      this.props.dispatch({
        type: "CHARACTERS/LOAD_NEXT_PAGE"
      });
    } else {
      this.fetchCharacters(this.props.charactersToSkip);
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
        type: "CHARACTERS/LOAD_PREVIOUS_PAGE"
      });
    }
  };

  _loadMore() {
    console.log("LOAD MORE");
  }

  _renderMessages() {
    console.log("Render InfiniteScroll");
    // return _.map(this.props.messages, (msg) => {
    //   return(
    //       <div>{msg}</div>
    //   )
    // })
    // <CharacterList show={this.show} characters={this.props.characters} />;
  }
  // onScroll = (ev) => {
  //   window.onscroll = function(ev) {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //       alert("you're at the bottom of the page");
  //   }
  // };
  componentDidMount() {
    // console.log("didmount");
    window.addEventListener("scroll", this.handleScroll);
    console.log(window);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    console.log("scrollY", window.scrollY);
    console.log("offset", document.body.offsetHeight);
    console.log("inner Height", window.innerHeight);
    console.log("inner + scroll", window.scrollY + window.innerHeight);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
      // alert("you're at the bottom of the page");
      this.loadNextPage();
    }
  };
  render() {
    const charactersToRender = this.props.characters;
    const loader = <div className="loader">Loading ...</div>;

    return (
      <div className="center" onScroll={this.onScroll}>
        <div className="img-container">
          <PageTitle title="MARVEL'S CHARACTERS - FIND YOUR FAVOURITES" />

          <CharacterList show={this.show} characters={charactersToRender} />

          {/* <div className="infinitive-scroll" onMouseMove={this.clickNewChar} /> */}
        </div>
        <br />
        {/* <Button
          onClick={this.clickNewChar}
          className="btn-danger"
          label="Load more MARVEL..."
        /> */}
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
  console.log(state);
  return {
    // characters: appendFavourites(state),
    pagination: state.paginationCharacters,
    characters: fetchPaginatedCharacters(state),
    charactersToSkip: state.characters.weHaveFetched
  };
};

export default connect(mapStateToProps)(Dashboard);
