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
import PropTypes from "prop-types";
import Notifications, { success, error } from "react-notification-system-redux";

class ComicDetails extends React.Component {
  constructor() {
    super();
    this.state = { selectedTab: 0 };
  }
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

  getID = (e, i, a) => {
    //to jeszcze mi będzie potrzebne na 90% ~Ewa
    // this.props.comic.characters.items[i].resourceURI.slice(
    // this.props.comic.characters.items[i].resourceURI.length - 7,
    // this.props.comic.characters.items[i].resourceURI.length
  };

  getCharIDs = (i = 0) => {
    //to jeszcze mi będzie potrzebne na 90% ~Ewa
    //this.props.comic.characters.items.forEach(this.getID);
  };

  getActiveClass = id => {
    if (this.state.selectedTab === id) return "active";
    else return "inactive";
  };

  render() {
    return (
      <div className="img-container">
        <StyledCharacterBase>
          <div className="square">
            <img
              src={`${this.props.comic.thumbnail.path}/standard_fantastic.jpg`}
              alt="image not found"
            />
            <h1 className="bottom-overlay">
              {this.props.comic.title}
            </h1>
          </div>

          <div className="description">
            <h4>Description:</h4>
            {this.renderDescription()}
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
              characters={this.props.comic.characters.items}
            />
          </TabPanel>
          <TabPanel className="tabpanel">
            {this.props.comic.series.name}
          </TabPanel>
          <TabPanel className="tabpanel">
            <CreatorList creators={this.props.comic.creators.items} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comic: getComicDetails(state, state.comics.comicsToShow.id),
    session: state.session
  };
};

ComicDetails.contextTypes = {
  store: PropTypes.object
};

export default connect(mapStateToProps)(ComicDetails);
