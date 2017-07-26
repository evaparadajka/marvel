import React from "react";
import { connect } from "react-redux";
import ComicList from "../comics/ComicList";
import { getFavouriteComics } from "../comic-details/selectors";
import { fetchFavouriteComics } from "../comic-details/actions";
import apiMarvelIdComic from "../lib/api-marvel-id-comic";
import PageTitle from "../user_interface/PageTitle";

class ComicsPage extends React.Component {
  show = id => {
    // console.log
    //this.props.dispatch({ type: "COMIC/SHOW", id: id });
    this.props.router.push("/comic-details/" + id);
  };
  fetchFromFavComics = () => {
    this.props.dispatch(fetchFavouriteComics());
  };
  componentDidMount() {
    this.fetchFromFavComics();
  }

  fetchComic = (element, index) => {
    if (typeof element.needComicID !== "undefined") {
      apiMarvelIdComic
        .get(`${element.needComicID}`)
        .then(response => {
          this.props.dispatch({
            type: "FETCH_ONE_USER_COMIC",
            payload: response.data.data.results[0]
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  fetchMissingComics() {
    this.props.comics.forEach(this.fetchComic);
  }

  render() {
    this.fetchMissingComics();
    return (
      <div className="img-container">
        <PageTitle title="YOUR FAVOURITES MARVEL'S COMICS" />
        <ComicList show={this.show} comics={this.props.comics} />
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
