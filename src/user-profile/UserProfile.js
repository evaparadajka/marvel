import React from "react";
import { connect } from "react-redux";
import PageTitle from "../user_interface/PageTitle";
import Button from "../user_interface/Button";
import { withRouter } from "react-router";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      comics: []
    };
  }

  pushToFavChar = () => {
    this.props.router.push("/fav-characters/");
  };

  pushToFavComics = () => {
    this.props.router.push("/fav-comics/");
  };

  render() {
    return (
      <div className="center">
        <div className="img-container">
          <PageTitle title={` WELCOME ${this.props.user.name} `} />
          <p>
            {" "}Hello, {this.props.user.name}! Welcome again in the best marvel{"'"}s
            app forever.
          </p>
          <p> Enjoy the charts we are making for you :p </p>
          <br />
          <div className="space">
            <Button
              label="Favourite Characters"
              onClick={this.pushToFavChar}
              className="btn-danger"
            />
            <Button
              label="Favourite Comics"
              onClick={this.pushToFavComics}
              className="btn-danger"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.session,
    userCharacters: state.characters.userCharactersCollection,
    userComics: state.comics.userComicsCollection
  };
};

export default connect(mapStateToProps)(withRouter(UserProfile));
