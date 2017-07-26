import React, { Component } from "react";
import { connect } from "react-redux";
import apiMarvelId from "../lib/api-marvel-id";
import ComicCharacter from "./ComicCharacter";

class ComicCharacterList extends Component {
  // zdecydowanie za dluga funkcja
  getCharThumbnail = (d, index) => {
    if (
      typeof this.props.thumbnails.find(
        p =>
          p.id ===
          parseFloat(
            d.resourceURI.slice(d.resourceURI.length - 7, d.resourceURI.length)
          )
      ) === "undefined"
    ) {
      apiMarvelId
        .get(
          d.resourceURI.slice(d.resourceURI.length - 7, d.resourceURI.length)
        )
        .then(response => {
          this.props.dispatch({
            type: "FETCH_THUMBNAILS",
            payload: {
              id: parseFloat(
                d.resourceURI.slice(
                  d.resourceURI.length - 7,
                  d.resourceURI.length
                )
              ),
              thumbnail: `${response.data.data.results[0].thumbnail
                .path}/standard_large.jpg`,
            },
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    // czemu tutaj obiekt?
    {
      this.props.characters.map((d, index) => this.getCharThumbnail(d, index));
    }
  }

  componentDidUpdate() {
    // czemu tutaj obiekt?
    {
      this.props.characters.map((d, index) => this.getCharThumbnail(d, index));
    }
  }

  // slaba nazwa funkcji
  anyCharacters = () => {
    if (this.props.characters.length === 0) {
      return <div> There are not any characters in this comic.</div>;
    }
  };

  render() {
    return (
      <div className="space">
        {this.props.characters.map((d, index) =>
          <ComicCharacter
            show={this.props.show}
            name={d.name}
            resourceURI={d.resourceURI}
          />
        )}
        {this.anyCharacters()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    thumbnails: state.characters.thumbnailsToShow,
  };
};

export default connect(mapStateToProps)(ComicCharacterList);
