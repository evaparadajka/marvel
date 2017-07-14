import React from "react";
import { connect } from "react-redux";

import ComicList from "./ComicList";
import StoryList from "./StoryList";
import StyledCharacterDetails from "../user_interface/StyledCharacterDetails";
import apiClient from "../lib/api-client";
class CharacterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterStatus: "false"
    };
    //this.logDate = this.logDate.bind(this);
    //this.addPost = this.addPost.bind(this);
  }
  addToFav = () => {
    apiClient
      .post("/marvel/api/v1/create_character", {
        character: {
          name: this.props.character.name,
          external_id: this.props.character.id
        }
      })
      .then(response => {
        //inform that added
        //console.log(response);
        this.setState({
          characterStatus: "true"
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  delFromFav = () => {
    let idToBeDeleted = null;
    this.props.userCharactersCollection.map(c => {
      if (c.id === this.props.character.id) {
        idToBeDeleted = c.binarId;
      }
    });
    //console.log(idToBeDeleted);
    // console.log(this.props.userCharactersCollection.binarId);
    apiClient
      .delete("/marvel/api/v1/delete_character/" + idToBeDeleted)
      .then(response => {
        //inform that deleted
        // this.props.router.push("characters");
        this.setState({
          characterStatus: "false"
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  isCharInFavs = () => {
    let result = false;
    this.props.userCharactersCollection.map(c => {
      if (c.id === this.props.character.id) {
        result = true;
      }
    });
    return result;
  };
  renderActionsButton = () => {
    if (this.isCharInFavs()) {
      return (
        <div className="col-md-6">
          <button
            onClick={this.delFromFav}
            className="fa fa-trash-o fa-3x nav-style"
          />
        </div>
      );
    } else {
      return (
        <div className="col-md-6">
          <button
            onClick={this.addToFav}
            className="fa fa-plus fa-3x nav-style"
          />
        </div>
      );
    }
  };

  render() {
    console.log(this.props.userCharactersCollection);
    return (
      <div>
        <StyledCharacterDetails>
          <div>
            <div className="row">
              <div className="col-md-6">
                <img
                  src={`${this.props.character.thumbnail
                    .path}/standard_amazing.jpg`}
                />
              </div>
              <div className="col-md-6">
                <h1>
                  {this.props.character.name}
                </h1>
              </div>
              {this.state.characterStatus}
              {this.renderActionsButton()}
            </div>
          </div>
        </StyledCharacterDetails>
        <StyledCharacterDetails>
          <h3>DETAILS</h3>
          <br />
          <div>
            <h4>Description:</h4>
            {this.props.character.description}
          </div>
          <br />
          <div>
            <h4>Comics:</h4>
            <ComicList comics={this.props.character.comics.items} />
          </div>
          <br />
          <div>
            <h4>Stories:</h4>
            <StoryList stories={this.props.character.stories.items} />
          </div>
        </StyledCharacterDetails>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    character: state.characters.characterToShow,
    userCharactersCollection: state.characters.userCharactersCollection,
    session: state.session
  };
};

export default connect(mapStateToProps)(CharacterDetails);
