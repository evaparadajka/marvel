import React from "react";
import { connect } from "react-redux";

import Creator from "./Creator";
import CreatorList from "./CreatorList";
import StyledCharacterDetails from "../user_interface/StyledCharacterDetails";
import StyledCharacterBase from "../user_interface/StyledCharacterBase";
import apiClient from "../lib/api-client";
import { getComicDetails } from "./selectors";
import { addToFavourites, deleteFromFavourites } from "./actions";
import ComicCharacter from "./ComicCharacter";
import ComicCharacterList from "./ComicCharacterList";
import { showNotification } from "../lib/functions";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

class ComicDetails extends React.Component {
  constructor() {
    super();
    this.state = { selectedTab: 0 };
  }
  addToFav = () => {
    this.props.dispatch(addToFavourites(this.props.comic));
    showNotification("Comic added!");
  };
  delFromFav = () => {
    this.props.dispatch(deleteFromFavourites(this.props.comic));
    showNotification("Comic deleted!");
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
          <button
            onClick={this.delFromFav}
            className="fa fa-trash-o fa-3x nav-style"
          />
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={this.addToFav}
            className="fa fa-plus fa-3x nav-style"
          />
        </div>
      );
    }
  };

  getID = (e, i, a) => {
    console.log(
      this.props.comic.characters.items[i].resourceURI.slice(
        this.props.comic.characters.items[i].resourceURI.length - 7,
        this.props.comic.characters.items[i].resourceURI.length
      ),
      "bla"
    );
  };

  getCharIDs = (i = 0) => {
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
              // className="img-responsive"
              src={`${this.props.comic.thumbnail.path}/standard_fantastic.jpg`}
            />
            <h1 className="bottom-overlay">
              {this.props.comic.title}
            </h1>
          </div>

          <div className="description">
            <h4>Description:</h4>
            <p>
              {this.renderDescription()}
            </p>

            {this.renderActionButton()}
          </div>
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

        {/* <StyledCharacterDetails className="center">
          <div className="space-in-details">
            <div>
          <img
          src={`${this.props.comic.thumbnail
          .path}/standard_fantastic.jpg`}
          />
            </div>
            <div>
          <div className="rectangle">
          {this.props.comic.title}
          </div>
            </div>

            {this.renderActionButton()}
          </div>
          </StyledCharacterDetails>

          <StyledCharacterDetails>
          <h3>CHARACTERS</h3>

          <br />
          <ComicCharacterList characters={this.props.comic.characters.items} />
          </StyledCharacterDetails>

          <StyledCharacterDetails>
          <h3>DETAILS</h3>
          <br />
          <div>
            <h4>Description:</h4>
            {this.props.comic.description}
          </div>
          <br />
          <div>
            <h4>Pages:</h4>
            {this.props.comic.pageCount}
          </div>
          <br />
          <div>
            <h4>Series:</h4>
            {this.props.comic.series.name}
          </div>
          <br />
          <div>
            <h4>Creators:</h4>
            <CreatorList creators={this.props.comic.creators.items} />
          </div>
          <br />
        </StyledCharacterDetails> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // userComicsCollection: state.comics.userComicsCollection,
    comic: getComicDetails(state, state.comics.comicsToShow.id),
    session: state.session
  };
};

export default connect(mapStateToProps)(ComicDetails);
