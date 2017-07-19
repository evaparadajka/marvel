import React from "react";
import { connect } from "react-redux";
import CharacterList from "../dashboard/CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";
import apiClient from "../lib/api-client";
import { getFavouriteComics } from "../comic-details/selectors";
import { fetchFavouriteComics } from "../comic-details/actions";

class ComicsPage extends React.Component {
  show = id => {
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/comic-details/" + id);
  };
  fetchFromFavComics = () => {
    this.props.dispatch(fetchFavouriteComics());
  };
  componentDidMount() {
    this.fetchFromFavComics();
  }

  render() {
    return (
      <div>
        <StyledDashboard className="img-container">
          <CharacterList show={this.show} characters={this.props.comics} />
        </StyledDashboard>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comics: getFavouriteComics(state)
  };
};

export default connect(mapStateToProps)(ComicsPage);
