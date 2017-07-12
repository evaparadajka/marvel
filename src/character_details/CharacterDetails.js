import React from "react";
import { connect } from "react-redux";

import ComicList from "./ComicList";
import StoryList from "./StoryList";
import StyledCharacterDetails from "../user_interface/StyledCharacterDetails";

class CharacterDetails extends React.Component {
  render() {
    console.log(this.props.character, "kalosz");
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
            {/* tu wstawić StoriesList */}
            <StoryList stories={this.props.character.stories.items} />
          </div>
        </StyledCharacterDetails>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    character: state.characters.characterToShow
  };
};

export default connect(mapStateToProps)(CharacterDetails);
