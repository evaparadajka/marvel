import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import md5 from "react-native-md5";

import CharacterList from "./CharacterList";

class CharacterPage extends React.Component {
  fetchCharacters(ts) {
    axios
      .get("http://gateway.marvel.com/v1/public/characters", {
        Params: {
          apikey: "393e03380bbb458e68945c50bdd245b08",
          ts: ts,
          hash: md5.str_md5(
            ts +
              "efb5a980f5b2fd9e9eb35da43f4d79ddd6e91019" +
              "93e03380bbb458e68945c50bdd245b08"
          )
        },
        Headers: {
          Accept: "/"
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    //this.fetchCharacters(new Date());
  }

  render() {
    const charactersToRender = this.props.characters.charactersCollection;

    return (
      <div>
        <CharacterList characters={charactersToRender} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    characters: state.characters
  };
};

export default connect(mapStateToProps)(CharacterPage);
