import React from "react";
import { connect } from "react-redux";
import ComicList from "./ComicList";
import StoryList from "./StoryList";
import StyledCharacterBase from "../user_interface/StyledCharacterBase";
import { getCharDetails } from "./selectors";
import { addToFavourites, deleteFromFavourites } from "./actions";
import apiMarvelId from "../lib/api-marvel-id";
// import { showNotification } from "../alert/notifications";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Notifications, { success, error } from "react-notification-system-redux";
import PropTypes from "prop-types";
import {
  notificationCharacterAdded,
  notificationCharacterDeleted
} from "../alert/notifications";

class CharacterDetails extends React.Component {
  constructor() {
    super();
    this.state = { selectedTab: 0 };
  }
  showNotification = message => {
    this.context.store.dispatch(message);
  };
  addToFav = () => {
    this.showNotification(success(notificationCharacterAdded));
    this.props.dispatch(addToFavourites(this.props.character));
  };
  delFromFav = () => {
    this.showNotification(error(notificationCharacterDeleted));
    this.props.dispatch(deleteFromFavourites(this.props.character));
  };
  isCharInFavs = () => {
    return this.props.character.isFavourite;
  };
  renderActionButton = () => {
    if (this.isCharInFavs()) {
      return (
        <div>
          <i
            onClick={this.delFromFav}
            className="fa fa-trash-o fa-3x nav-style"
          />
        </div>
      );
    } else {
      return (
        <div>
          <i onClick={this.addToFav} className="fa fa-plus fa-3x nav-style" />
        </div>
      );
    }
  };

  doIHaveCharacter = id => {
    if (
      typeof this.props.character === "undefined" ||
      this.props.character.id !== Number(id)
    ) {
      if (typeof this.props.character === "undefined") {
        console.log("pobieram");
        apiMarvelId
          .get(id)
          .then(response => {
            this.props.dispatch({
              type: "SHOW/FETCH",
              payload: response.data.data.results[0]
            });
          })
          .catch(error => {
            console.log(error);
            this.props.router.push("/not-found/");
          });
      } else {
        this.props.dispatch({ type: "SHOW", id: Number(id) });
      }
    } else {
    }
  };

  doIHaveSomethingToRender = () => {
    if (
      typeof this.props.character === "undefined" ||
      typeof this.props.character.thumbnail === "undefined"
    ) {
      return <div />;
    } else {
      return (
        <div className="img-container">
          <StyledCharacterBase>
            <div className="square">
              <img
                src={`${this.props.character.thumbnail
                  .path}/standard_fantastic.jpg`}
                alt="image not found"
              />
              <h1 className="bottom-overlay">
                {this.props.character.name}
              </h1>
            </div>

            <div className="description">
              <h4>Description:</h4>
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
              <Tab className={`tab ${this.getActiveClass(0)}`}>Comics</Tab>
              <Tab className={`tab ${this.getActiveClass(1)}`}>Stories</Tab>
              <Tab className={`tab ${this.getActiveClass(2)}`}>Series</Tab>
            </TabList>

            <TabPanel className="tabpanel">
              <ComicList comics={this.props.character.comics.items} />
            </TabPanel>
            <TabPanel className="tabpanel">
              <StoryList stories={this.props.character.stories.items} />
            </TabPanel>
            <TabPanel className="tabpanel">
              <StoryList stories={this.props.character.series.items} />
            </TabPanel>
          </Tabs>
        </div>
      );
    }
  };

  getActiveClass = id => {
    if (this.state.selectedTab === id) return "active";
    else return "inactive";
  };

  componentDidMount() {
    this.doIHaveCharacter(
      this.props.router.location.pathname.slice(
        this.props.router.location.pathname.length - 7,
        this.props.router.location.pathname.length
      )
    );
  }

  componentDidUpdate() {
    this.doIHaveCharacter(
      this.props.router.location.pathname.slice(
        this.props.router.location.pathname.length - 7,
        this.props.router.location.pathname.length
      )
    );
  }

  renderDescription = () => {
    if (this.props.character.description === "") {
      return (
        <div>
          Character description is not yet provided. Thank you for your
          patience.
        </div>
      );
    } else
      return (
        <div>
          {this.props.character.description}
        </div>
      );
  };

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
    character:
      typeof state.characters.characterToShow === "undefined"
        ? state.characters.characterToShow
        : getCharDetails(state, state.characters.characterToShow.id),
    session: state.session
  };
};

CharacterDetails.contextTypes = {
  store: PropTypes.object
};

export default connect(mapStateToProps)(CharacterDetails);
