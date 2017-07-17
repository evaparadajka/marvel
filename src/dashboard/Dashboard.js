import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";

import CharacterList from "./CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";
import Button from "../user_interface/Button";

class Dashboard extends React.Component {
  fetchCharacters(offset) {
    apiMarvel
      .get("/characters", {
        params: {
          offset: offset
        }
      })
      .then(response => {
        this.props.dispatch({
          type: "FETCH_CHAR",
          payload: response.data.data.results
        });
      })
      .catch(error => console.log(error));
  }

  show = id => {
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/character-details/" + id);
  };

  componentDidMount() {
    //this.fetchCharacters(this.props.characters.charactersCollection.length);
  }

  clickNewChar = e => {
    e.preventDefault();
    const charactersAmmount = this.props.characters.charactersCollection.length;
    this.fetchCharacters(charactersAmmount);
    console.log("klik");
  };

  render() {
    const charactersToRender = this.props.characters.charactersCollection;

    return (
      <div className="center">
        <StyledDashboard className="img-container">
          <CharacterList show={this.show} characters={charactersToRender} />
        </StyledDashboard>
        <br />
        <Button onClick={this.clickNewChar} label="get new Characters" />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    characters: state.characters
  };
};

export default connect(mapStateToProps)(Dashboard);
