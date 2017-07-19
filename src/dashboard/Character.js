import React from "react";
import Button from "../user_interface/Button";
import StyledCharacter from "../user_interface/StyledCharacter";
import StyledOverlay from "../user_interface/StyledOverlay";
import {
  addToFavourites,
  deleteFromFavourites
} from "../character_details/actions";
import { showNotification } from "../lib/functions";
import { connect } from "react-redux";
// import { getCharDetailsByID } from "../character_details/selectors";
class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  show = () => {
    this.props.show(this.props.id);
  };

  onMouseEnterHandler = () => {
    this.setState({
      hover: true
    });
  };
  onMouseLeaveHandler = () => {
    this.setState({
      hover: false
    });
  };

  isToLong = text => {
    if (text.length > 100) {
      return (
        <div className="description">
          {text.slice(0, 100)}...
        </div>
      );
    } else {
      return (
        <div className="description">
          {text}
        </div>
      );
    }
  };

  isHovered = () => {
    return this.state.hover;
  };

  addToFav = () => {
    let character = { name: this.props.name, id: this.props.id };
    console.log(this.props.character);
    this.props.dispatch(addToFavourites(character));
    showNotification("Character added!");
  };
  delFromFav = () => {
    this.props.dispatch(deleteFromFavourites(this.props.character));
    showNotification("Character deleted!");
  };
  isCharInFavs = () => {
    return this.props.isFavourite;
    // return getCharDetailsByID(this.props.id);
  };
  renderActionButton = () => {
    if (this.isCharInFavs()) {
      return (
        // <div className="col-md-6">
        //   <Button
        //     className="btn-danger"
        //     label="Delete from favourites!"
        //     onClick={this.delFromFav}
        //   />
        // </div>
        null
      );
    } else {
      return (
        <Button
          className="btn-danger"
          label="Add to favourites!"
          onClick={this.addToFav}
        />
      );
    }
  };

  renderOverlay = () => {
    if (this.isHovered()) {
      return (
        <StyledOverlay>
          <div className="name">
            {this.props.name ? this.props.name : this.props.title}
          </div>
          <div>
            <Button
              className="btn-danger"
              label="Details"
              onClick={this.show}
            />
            {this.renderActionButton()}
          </div>
        </StyledOverlay>
      );
    } else return null;
  };

  render() {
    return (
      <div
        className="square"
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        <StyledCharacter>
          <img src={this.props.img} alt="Image not found" />
        </StyledCharacter>
        {this.renderOverlay()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //character: getCharDetails(state, state.characters.characterToShow.id),
    // session: state.session
  };
};

export default connect(mapStateToProps)(Character);
