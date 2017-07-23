import React, { Component } from "react";
import { connect } from "react-redux";
import apiMarvelId from "../lib/api-marvel-id";
import ComicCharacter from "./ComicCharacter";

class ComicCharacterList extends Component {
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
                .path}/standard_fantastic.jpg`
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    {
      this.props.characters.map((d, index) => this.getCharThumbnail(d, index));
    }
  }

  render() {
    return (
      <ol>
        {this.props.characters.map((d, index) =>
          <ComicCharacter
            show={this.props.show}
            name={d.name}
            resourceURI={d.resourceURI}
          />
        )}
      </ol>
    );
  }
}

const mapStateToProps = state => {
  return {
    thumbnails: state.characters.thumbnailsToShow
  };
};

export default connect(mapStateToProps)(ComicCharacterList);
