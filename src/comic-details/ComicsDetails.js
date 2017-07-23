import React from "react";
import { connect } from "react-redux";
import CreatorList from "./CreatorList";
import StyledCharacterBase from "../user_interface/StyledCharacterBase";
import { getComicDetails } from "./selectors";
import { addToFavourites, deleteFromFavourites } from "./actions";
import ComicCharacterList from "./ComicCharacterList";
// import { showNotification } from "../alert/notifications";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  notificationComicAdded,
  notificationComicDeleted
} from "../alert/notifications";
import Button from "../user_interface/Button";
import PropTypes from "prop-types";
import Notifications, { success, error } from "react-notification-system-redux";
import apiMarvelIdComic from "../lib/api-marvel-id-comic";

class ComicDetails extends React.Component {
  constructor() {
    super();
    this.state = { selectedTab: 0 };
  }

  show = id => {
    this.props.router.push("/character-details/" + id);
  };

  showNotification = message => {
    this.context.store.dispatch(message);
  };
  addToFav = () => {
    this.showNotification(success(notificationComicAdded));
    this.props.dispatch(addToFavourites(this.props.comic));
    // showNotification("Comic added!");
  };
  delFromFav = () => {
    this.showNotification(error(notificationComicDeleted));
    this.props.dispatch(deleteFromFavourites(this.props.comic));
    // showNotification("Comic deleted!");
  };
  isComicInFavs = () => {
    return this.props.comic.isFavourite;
  };

  renderDescription = () => {
    if (this.props.comic.description === null) {
      return (
        <div>
          Comic description is not yet provided. Thank you for your patience.
        </div>
      );
    } else {
      return (
        <div>
          {this.props.comic.description}
        </div>
      );
    }
  };

  renderActionButton = () => {
    if (this.isComicInFavs()) {
      return (
        <div>
          <Button
            onClick={this.delFromFav}
            className="btn-danger"
            label="Delete from favourites!"
          />
        </div>
      );
    } else {
      return (
        <div>
          <Button
            onClick={this.addToFav}
            className="btn-danger"
            label="Add to favourites!"
          />
        </div>
      );
    }
  };

  getActiveClass = id => {
    if (this.state.selectedTab === id) return "active";
    else return "inactive";
  };

  doIHaveComic = id => {
    if (
      typeof this.props.comic === "undefined" ||
      this.props.comic.id !== Number(id)
    ) {
      if (typeof this.props.comic === "undefined") {
        apiMarvelIdComic
          .get(id)
          .then(response => {
            this.props.dispatch({
              type: "COMIC/SHOW/FETCH",
              payload: response.data.data.results[0]
            });
          })
          .catch(error => {
            console.log(error);
            this.props.router.push("/not-found/");
          });
      } else {
        this.props.dispatch({ type: "COMIC/SHOW", id: Number(id) });
      }
    } else {
    }
  };

  doIHaveSomethingToRender = () => {
    if (
      typeof this.props.comic === "undefined" ||
      typeof this.props.comic.thumbnail === "undefined"
    ) {
      return <div />;
    } else {
      return (
        <div className="img-container">
          <h1>
            {this.props.comic.title}
          </h1>

          <StyledCharacterBase>
            <div className="square">
              <img
                src={`${this.props.comic.thumbnail
                  .path}/standard_fantastic.jpg`}
                alt="image not found"
              />
            </div>
            <div className="description">
              <h4>DESCRIPTION:</h4>
              <p>
                {this.renderDescription()}
              </p>
            </div>
            {this.renderActionButton()}
          </StyledCharacterBase>

          <Tabs
            selectedIndex={this.state.selectedTab}
            onSelect={selectedTab => this.setState({ selectedTab })}
          >
            <TabList className="tablist">
              <Tab className={`tab ${this.getActiveClass(0)}`}>Characters</Tab>
              <Tab className={`tab ${this.getActiveClass(1)}`}>Series</Tab>
              <Tab className={`tab ${this.getActiveClass(2)}`}>Creators</Tab>
            </TabList>

            <TabPanel className="tabpanel">
              <ComicCharacterList
                show={this.show}
                characters={this.props.comic.characters.items}
              />
            </TabPanel>
            <TabPanel className="tabpanel space">
              {this.props.comic.series.name}
            </TabPanel>
            <TabPanel className="tabpanel space">
              <CreatorList creators={this.props.comic.creators.items} />
            </TabPanel>
          </Tabs>
        </div>
      );
    }
  };

  lookingForNumber() {
    if (
      isNaN(
        this.props.router.location.pathname[
          this.props.router.location.pathname.length - 5
        ]
      )
    ) {
      if (
        isNaN(
          this.props.router.location.pathname[
            this.props.router.location.pathname.length - 4
          ]
        )
      ) {
        return this.props.router.location.pathname.slice(
          this.props.router.location.pathname.length - 3,
          this.props.router.location.pathname.length
        );
      } else {
        return this.props.router.location.pathname.slice(
          this.props.router.location.pathname.length - 4,
          this.props.router.location.pathname.length
        );
      }
    } else {
      return this.props.router.location.pathname.slice(
        this.props.router.location.pathname.length - 5,
        this.props.router.location.pathname.length
      );
    }
  }

  componentDidMount() {
    this.doIHaveComic(this.lookingForNumber());
  }

  componentDidUpdate() {
    this.doIHaveComic(this.lookingForNumber());
  }

  render() {
    return (
      <div>
        {this.doIHaveSomethingToRender()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comic:
      typeof state.comics.comicsToShow === "undefined"
        ? state.comics.comicsToShow
        : getComicDetails(state, state.comics.comicsToShow.id),
    session: state.session
  };
};

ComicDetails.contextTypes = {
  store: PropTypes.object
};

export default connect(mapStateToProps)(ComicDetails);
