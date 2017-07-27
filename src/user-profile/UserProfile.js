import React from "react";
import { connect } from "react-redux";
import PageTitle from "../user_interface/PageTitle";
import Button from "../user_interface/Button";
import { withRouter } from "react-router";
import { UserComicsBarChart, UserCharactersBarChart } from "./UserBarChart";
import { ResponsiveContainer } from "recharts";
import { Scrollbars } from "react-custom-scrollbars";
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
          "Characters number": charactersData.filter(c => c.createdAt === date)
            .length
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
        "Comics number": comicsData.filter(c => c.createdAt === date).length
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
          <h4>Check out your favourite characters and comics</h4>
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
          </div>{" "}
          <br />
          <br />
          <Scrollbars style={{ height: 600 }}>
            <h4>New characters in favourites</h4>
            <div className="chart-container">
              <Scrollbars style={{ width: 600, height: 300 }}>
                <UserCharactersBarChart data={userCharactersData} />
              </Scrollbars>
            </div>{" "}
            <h4>New comics in favourites</h4>
            <div className="chart-container">
              <Scrollbars style={{ width: 600, height: 300 }}>
                <UserComicsBarChart data={userComicsData} />
              </Scrollbars>
            </div>
          </Scrollbars>
          <br />
          <br />
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
