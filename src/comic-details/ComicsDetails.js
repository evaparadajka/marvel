import React from "react";
import { connect } from "react-redux";
import CreatorList from "./CreatorList";
import StyledCharacterBase from "../user_interface/StyledCharacterBase";
import { getComicDetails } from "./selectors";
import { addToFavourites, deleteFromFavourites } from "./actions";
import ComicCharacterList from "./ComicCharacterList";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  notificationComicAdded,
  notificationComicDeleted
} from "../alert/notifications";
import Button from "../user_interface/Button";
import PropTypes from "prop-types";
import Notifications, { success, error } from "react-notification-system-redux";
import apiMarvelIdComic from "../lib/api-marvel-id-comic";
import PageTitle from "../user_interface/PageTitle";
import { Scrollbars } from "react-custom-scrollbars";
import ReactLoading from "react-loading";

class ComicDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 0,
      click: false,
      isFavourite: false
    };
  }

  show = id => {
    this.props.router.push("/character-details/" + id);
  };

  showNotification = message => {
    this.context.store.dispatch(message);
  };

  addToFav = () => {
    this.setState({
      click: true
    });
    this.props.dispatch(addToFavourites(this.props.comic));
    this.showNotification(success(notificationComicAdded));
  };

  delFromFav = () => {
    this.setState({
      click: true
    });
    this.props.dispatch(deleteFromFavourites(this.props.comic));
    this.showNotification(error(notificationComicDeleted));
  };

  isComicInFavs = () => {
    if (this.state.isFavourite !== this.props.comic.isFavourite) {
      this.setState({
        click: false,
        isFavourite: this.props.comic.isFavourite
      });
    }
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
    this.isComicInFavs();
    if (this.state.click) {
      return (
        <div className="button-width bubbles">
          <ReactLoading
            type="bubbles"
            color="#a91c1c"
            height="34px"
            width="34px"
            delay="0"
          />
        </div>
      );
    } else {
      if (this.isComicInFavs()) {
        return (
          <div className="button-width">
            <Button
              onClick={this.delFromFav}
              className="btn-danger"
              label="Delete from favourites!"
            />
          </div>
        );
      } else {
        return (
          <div className="button-width">
            <Button
              onClick={this.addToFav}
              className="btn-danger"
              label="Add to favourites!"
            />
          </div>
        );
      }
    }
  };

  getActiveClass = id => {
    if (this.state.selectedTab === id) return "active";
    else return "inactive";
  };

  findComicInStoreOrFetch = id => {
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

  renderBase = () => {
    return (
      <StyledCharacterBase>
        <div className="square">
          <img
            src={`${this.props.comic.thumbnail.path}/standard_fantastic.jpg`}
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
    );
  };

  renderTabs = () => {
    return (
      <Tabs
        selectedIndex={this.state.selectedTab}
        onSelect={selectedTab => this.setState({ selectedTab })}
      >
        <TabList className="tablist">
          <Tab className={`tab ${this.getActiveClass(0)}`}>Characters</Tab>
          <Tab className={`tab ${this.getActiveClass(1)}`}>Series</Tab>
          <Tab className={`tab ${this.getActiveClass(2)}`}>Creators</Tab>
        </TabList>
        <TabPanel className="tabpanel space">
          <Scrollbars style={{ width: 800, height: 300 }}>
            <ComicCharacterList
              show={this.show}
              characters={this.props.comic.characters.items}
            />
          </Scrollbars>
        </TabPanel>
        <TabPanel className="tabpanel space">
          <Scrollbars style={{ width: 800, height: 300 }}>
            {typeof this.props.comic.series.name === "undefined"
              ? <div>There are not any series in this comic</div>
              : this.props.comic.series.name}
          </Scrollbars>
        </TabPanel>
        <TabPanel className="tabpanel space">
          <Scrollbars style={{ width: 800, height: 300 }}>
            <CreatorList creators={this.props.comic.creators.items} />
          </Scrollbars>
        </TabPanel>
      </Tabs>
    );
  };

  isComicInProps = () => {
    return (
      typeof this.props.comic === "undefined" ||
      typeof this.props.comic.thumbnail === "undefined"
    );
  };

  isComicToRender = () => {
    if (this.isComicInProps()) {
      return <div />;
    } else {
      return (
        <div className="img-container">
          <PageTitle title={this.props.comic.title} />
          {this.renderBase()}
          {this.renderTabs()}
        </div>
      );
    }
  };

  extractID(pathname) {
    if (isNaN(pathname[pathname.length - 5])) {
      if (isNaN(pathname[pathname.length - 4])) {
        return pathname.slice(pathname.length - 3, pathname.length);
      } else {
        return pathname.slice(pathname.length - 4, pathname.length);
      }
    } else {
      return pathname.slice(pathname.length - 5, pathname.length);
    }
  }

  componentDidMount() {
    this.findComicInStoreOrFetch(
      this.extractID(this.props.router.location.pathname)
    );
  }

  componentDidUpdate() {
    this.findComicInStoreOrFetch(
      this.extractID(this.props.router.location.pathname)
    );
  }

  render() {
    return (
      <div>
        {this.isComicToRender()}
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
