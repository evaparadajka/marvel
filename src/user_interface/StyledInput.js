import React from "react";

class StyledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: ""
    };
  }

  updateField = e => {
    this.props.onChange(e);
  };

  render() {
    return (
      <input
        onChange={this.updateField}
        type={this.props.type}
        className="form-control"
      />
    );
  }
}

export default StyledInput;
