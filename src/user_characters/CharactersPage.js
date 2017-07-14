import React from "react";
import { connect } from "react-redux";
import CharacterList from "../dashboard/CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";
import apiClient from "../lib/api-client";
class CharactersPage extends React.Component {
  fetchUserCharacters() {
    const characterArr = [];
    apiClient
      .get("/marvel/api/v1/fetch_characters")
      .then(response => {
        const charactersIdToRender = response.data.characters.map(
          c => c.external_id
        );

        charactersIdToRender.forEach(charId => {
          this.props.characters.charactersCollection.map(c => {
            if (c.id === charId) {
              characterArr.push(c);
            }
          });
        });
        this.props.dispatch({
          type: "FETCH_USER_CHAR",
          payload: characterArr
        });
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
            characters={this.props.characters.userCharactersCollection.reverse()}
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
