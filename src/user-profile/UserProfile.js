import React from "react";
import { connect } from "react-redux";
import PageTitle from "../user_interface/PageTitle";
import Button from "../user_interface/Button";
import { withRouter } from "react-router";
import { UserBarChart } from "./UserBarChart";
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

    const data = [
      { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
      { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
      { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
      { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
      { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
      { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
      { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
    ];
    console.log("userChars", this.props.userCharacters);
    console.log("userComics", this.props.userComics);
    const charactersData = this.props.userCharacters.map(c => {
      return { name: c.name, createdAt: c.created_at.slice(0, 10) };
    });

    console.log(charactersData);

    return (
      <div className="center">
        <div className="img-container">
          <PageTitle title={` WELCOME, ${this.props.user.name}! `} />

          <div>
            <p>Check out your favourite characters and comics</p>
          </div>
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
            <br />
          </div>
          <div>
            <p>Check out timeline of your favourites</p>
          </div>

          <div className="chart-container">
            <UserBarChart data={charactersData} />
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
