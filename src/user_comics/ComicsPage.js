import React from "react";
import { connect } from "react-redux";
import ComicList from "../comics/ComicList";
import { getFavouriteComics } from "../comic-details/selectors";
import { fetchFavouriteComics } from "../comic-details/actions";
import apiMarvelIdComic from "../lib/api-marvel-id-comic";

class ComicsPage extends React.Component {
  show = id => {
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
