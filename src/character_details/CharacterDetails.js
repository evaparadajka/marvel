import React from "react";
import { connect } from "react-redux";
import ComicList from "./ComicList";
import StoryList from "./StoryList";
import StyledCharacterDetails from "../user_interface/StyledCharacterDetails";
import StyledCharacterBase from "../user_interface/StyledCharacterBase";
import apiClient from "../lib/api-client";
import { getCharDetails } from "./selectors";
import { addToFavourites, deleteFromFavourites } from "./actions";
import apiMarvelId from "../lib/api-marvel-id";
import { showNotification } from "../alert/notifications";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

class CharacterDetails extends React.Component {
  constructor() {
    super();
    this.state = { selectedTab: 0 };
  }
  addToFav = () => {
    this.props.dispatch(addToFavourites(this.props.character));
    showNotification("Character added!");
  };
  delFromFav = () => {
    this.props.dispatch(deleteFromFavourites(this.props.character));
    showNotification("Character deleted!");
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
    if (typeof this.props.character === "undefined") {
      apiMarvelId
        .get(id)
        .then(response => {
          this.props.dispatch({
            type: "SHOW/FETCH",
            payload: response.data.data.results[0]
          });
          //this.props.router.push("/character-details/" + id);
        })
        .catch(error => console.log(error));
    } else {
      //this.props.router.push("/character-details/" + id);
    }
  };

  doIHaveSomethingToRender = () => {
    if (typeof this.props.character === "undefined") {
      return <div />;
    } else {
      return (
        <div className="img-container">
          <StyledCharacterBase>
            <div className="square">
              <img
                src={`${this.props.character.thumbnail
                  .path}/standard_fantastic.jpg`}
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

              {this.renderActionButton()}
            </div>
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

export default connect(mapStateToProps)(CharacterDetails);
