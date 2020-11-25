import React, { Component } from "react";
import PropTypes from "prop-types";

class BarcodePrint extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ margin: "50px" }}>
        <div>
          <canvas ref={this.props.barcode} />;
        </div>
      </div>
    );
  }
}
export default BarcodePrint;
