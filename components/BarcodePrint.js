import React from "react";
import Barcode from "react-barcode";
class BarcodePrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1.5,
      height: 70,
    };
  }
  render() {
    return (
      <div style={{ margin: "50px" }}>
        <div>
          {this.props.value.map((i) => {
            return (
              <Barcode
                value={i}
                width={this.state.width}
                height={this.state.height}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default BarcodePrint;
