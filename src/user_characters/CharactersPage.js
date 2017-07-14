import React from "react";
import { connect } from "react-redux";
import CharacterList from "../dashboard/CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";
import apiClient from "../lib/api-client";
class CharactersPage extends React.Component {
  fetchUserCharacters() {
    const characterArr = [];
    const characterArrTEST = [];
    const testCharacters = [];
    apiClient
      .get("/marvel/api/v1/fetch_characters")
      .then(response => {
        response.data.characters.forEach(char => {
          let Ids = { id: char.id, external_id: char.external_id };
          testCharacters.push(Ids);
        });

        testCharacters.forEach(char => {
          this.props.characters.charactersCollection.map(c => {
            if (c.id === char.external_id) {
              let mergedIds = { ...c, binarId: char.id };
              //console.log(mergedIds);
              characterArr.push(mergedIds);
            }
          });
        });
        console.log(characterArr);
        this.props.dispatch({
          type: "FETCH_USER_CHAR",
          payload: characterArr
        });
        // const charactersExternalIds = response.data.characters.map(
        //   c => c.external_id
        // );
        // const charactersIds = response.data.characters.map(c => c.id);
        // console.log(charactersIds);
        // console.log(charactersExternalIds);
        //
        // // const charactersIdToRender = response.data.characters.map(
        // //   c => c.external_id
        // // );
        // console.log(response.data.characters);
        // charactersExternalIds.forEach(charId => {
        //   this.props.characters.charactersCollection.map(c => {
        //     if (c.id === charId) {
        //       characterArr.push(c);
        //     }
        //   });
        // });
        // this.props.dispatch({
        //   type: "FETCH_USER_CHAR",
        //   payload: characterArr
        // });
      })
      .catch(error => {
        console.log(error);
      });
  }

  show = id => {
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/character-details/" + id);
  };

  componentDidMount() {
    this.fetchUserCharacters();
  }

  render() {
    return (
      <div>
        <StyledDashboard>
          <CharacterList
            show={this.show}
            characters={this.props.characters.userCharactersCollection}
          />
        </StyledDashboard>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    characters: state.characters
  };
};

export default connect(mapStateToProps)(CharactersPage);
