import React from "react";
import { connect } from "react-redux";
import PageTitle from "../user_interface/PageTitle";
import Button from "../user_interface/Button";
import { withRouter } from "react-router";
import { UserComicsBarChart, UserCharactersBarChart } from "./UserBarChart";
import { ResponsiveContainer } from "recharts";
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

  getUserCharactersData = () => {
    const charactersData = this.props.userCharacters.map(c => {
      return { name: c.name, createdAt: c.created_at.slice(0, 10) };
    });

    const characterSubmissionDates = this.props.userCharacters.map(c => {
      return c.created_at.slice(0, 10);
    });
    //console.log(characterSubmissionDates);
    const distinctCharacterSubmissionDates = [
      ...new Set(characterSubmissionDates)
    ];
    //console.log(distinctCharacterSubmissionDates);
    const newCharactersAmountPerDay = distinctCharacterSubmissionDates.map(
      date => {
        return {
          date: date,
          "New characters in favourites": charactersData.filter(
            c => c.createdAt === date
          ).length
        };
      }
    );
    return newCharactersAmountPerDay.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  };

  getUserComicsData = () => {
    const comicsData = this.props.userComics.map(c => {
      return { name: c.name, createdAt: c.created_at.slice(0, 10) };
    });

    const comicSubmissionDates = this.props.userComics.map(c => {
      return c.created_at.slice(0, 10);
    });
    //console.log(characterSubmissionDates);
    const distinctComicSubmissionDates = [...new Set(comicSubmissionDates)];
    //console.log(distinctCharacterSubmissionDates);
    const newComicsAmountPerDay = distinctComicSubmissionDates.map(date => {
      return {
        date: date,
        "New comics in favourites": comicsData.filter(c => c.createdAt === date)
          .length
      };
    });
    return newComicsAmountPerDay.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  };

  render() {
    const userCharactersData = this.getUserCharactersData();
    const userComicsData = this.getUserComicsData();
    return (
      <div>
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
            <p>Check out your account stats:</p>
          </div>

          <div className="chart-container">
            <UserCharactersBarChart data={userCharactersData} />
          </div>
          <div className="chart-container">
            <UserComicsBarChart data={userComicsData} />
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
