import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";

import CharacterList from "../dashboard/CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";

class ComicsDashboard extends React.Component {
  fetchCharacters(offset) {
    apiMarvel
      .get(
        "/comics?limit=20&offset=" +
          offset +
          "&apikey=93e03380bbb458e68945c50bdd245b08",
        {
          Headers: {
            Accept: "*/*"
          }
        }
      )
      .then(response => {
        this.props.dispatch({
          type: "FETCH_COMICS",
          payload: response.data.data.results
        });
      })
      .catch(error => console.log(error));
  }

  show = id => {
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/comics-details/" + id);
  };

  componentDidMount() {
    this.fetchCharacters(this.props.comics.comicsCollection.length);
  }

  render() {
    const comicsToRender = this.props.comics.comicsCollection;
    console.log(comicsToRender, "kalosz");

    return (
      <div className="center">
        <StyledDashboard>
          <CharacterList show={this.show} characters={comicsToRender} />
        </StyledDashboard>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comics: state.comics
  };
};

export default connect(mapStateToProps)(ComicsDashboard);
