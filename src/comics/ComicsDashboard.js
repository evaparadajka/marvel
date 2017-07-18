import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";

import CharacterList from "../dashboard/CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";

class ComicsDashboard extends React.Component {
  fetchComics(offset) {
    apiMarvel
      .get("/comics", {
        params: {
          offset: offset
        }
      })
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
    this.props.router.push("/comic-details/" + id);
  };

  componentDidMount() {
    this.fetchComics(this.props.comics.comicsCollection.length);
  }

  render() {
    const comicsToRender = this.props.comics.comicsCollection;

    return (
      <div className="center">
        <StyledDashboard className="img-container">
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
