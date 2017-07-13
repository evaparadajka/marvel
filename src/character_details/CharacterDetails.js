import React from "react";
import { connect } from "react-redux";

import ComicList from "./ComicList";
import StoryList from "./StoryList";
import StyledCharacterDetails from "../user_interface/StyledCharacterDetails";
import apiClient from "../lib/api-client";
class CharacterDetails extends React.Component {
  addToFav = character => {
    // this.props.onAddToFav(this.props.id);
    //console.log("add to fav", this.props.character.id);
    console.log(this.props.session.user_id, this.props.character.id);
    apiClient
      .post("/marvel/api/v1/create_character", {
        character: {
          name: this.props.character.name,
          external_id: this.props.character.id
          // user_id: this.props.session.user_id
        }
      })
      .then(response => {
        console.log(response);

        //przejscie do strony posts
        //this.props.router.push("posts");
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
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
              <div className="col-md-6">
                {/* <h1>Add to favourite</h1> */}
                <i
                  onClick={this.addToFav}
                  className="fa fa-plus fa-3x"
                  style={{ color: "#c94c4c" }}
                  fontaria-hidden="true"
                />
              </div>
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
    session: state.session
  };
};

export default connect(mapStateToProps)(CharacterDetails);
