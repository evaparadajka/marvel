import React from "react";
import StyledPageTitle from "./StyledPageTitle";

class PageTitle extends React.Component {
  render() {
    // console.log
    console.log(this.props.title);
    return (
      <div>
        <StyledPageTitle className="bebas">
          {this.props.title}
        </StyledPageTitle>
      </div>
    );
  }
}

export default PageTitle;
