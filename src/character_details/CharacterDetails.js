import React from "react";
import { connect } from "react-redux";
import ComicList from "./ComicList";
import StoryList from "./StoryList";
import SeriesList from "./SeriesList";
import StyledCharacterBase from "../user_interface/StyledCharacterBase";
import { getCharDetails } from "./selectors";
import { addToFavourites, deleteFromFavourites } from "./actions";
import apiMarvelId from "../lib/api-marvel-id";
import Button from "../user_interface/Button";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Notifications, { success, error } from "react-notification-system-redux";
import PropTypes from "prop-types";
import {
  notificationCharacterAdded,
  notificationCharacterDeleted
} from "../alert/notifications";
import PageTitle from "../user_interface/PageTitle";
import { Scrollbars } from "react-custom-scrollbars";

class CharacterDetails extends React.Component {
  constructor() {
    super();
    this.state = { selectedTab: 0 };
  }
  showNotification = message => {
    this.context.store.dispatch(message);
  };
  addToFav = () => {
    this.props.dispatch(addToFavourites(this.props.character));
    this.showNotification(success(notificationCharacterAdded));
  };
  delFromFav = () => {
    this.props.dispatch(deleteFromFavourites(this.props.character));
    this.showNotification(error(notificationCharacterDeleted));
  };
  isCharInFavs = () => {
    return this.props.character.isFavourite;
  };
  show = id => {
    this.props.router.push("/comic-details/" + id);
  };
  renderActionButton = () => {
    if (this.isCharInFavs()) {
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

  findCharacterInStoreOrFetch = id => {
    if (
      typeof this.props.character === "undefined" ||
      this.props.character.id !== Number(id)
    ) {
      if (typeof this.props.character === "undefined") {
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

  isCharacterToRender = () => {
    if (
      typeof this.props.character === "undefined" ||
      typeof this.props.character.thumbnail === "undefined"
    ) {
      return <div />;
    } else {
      return (
        <div className="img-container">
          <PageTitle title={this.props.character.name} />
          <StyledCharacterBase>
            <div className="square">
              <img
                src={`${this.props.character.thumbnail
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
              <Tab className={`tab ${this.getActiveClass(0)}`}>Comics</Tab>
              <Tab className={`tab ${this.getActiveClass(1)}`}>Stories</Tab>
              <Tab className={`tab ${this.getActiveClass(2)}`}>Series</Tab>
            </TabList>
            <TabPanel className="tabpanel space">
              <Scrollbars style={{ width: 800, height: 300 }}>
                <ComicList
                  comics={this.props.character.comics.items}
                  show={this.show}
                />
              </Scrollbars>
            </TabPanel>
            <TabPanel className="tabpanel space">
              <Scrollbars style={{ width: 800, height: 300 }}>
                <StoryList stories={this.props.character.stories.items} />
              </Scrollbars>
            </TabPanel>
            <TabPanel className="tabpanel space">
              <Scrollbars style={{ width: 800, height: 300 }}>
                <SeriesList series={this.props.character.series.items} />
              </Scrollbars>
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
    this.findCharacterInStoreOrFetch(
      this.props.router.location.pathname.slice(
        this.props.router.location.pathname.length - 7,
        this.props.router.location.pathname.length
      )
    );
  }

  componentDidUpdate() {
    this.findCharacterInStoreOrFetch(
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
        {this.isCharacterToRender()}
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
