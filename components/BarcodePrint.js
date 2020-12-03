import React from "react";
import Barcode from "react-barcode";
class BarcodePrint extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ margin: "50px" }}>
        <div>
          {this.props.value.map((i) => {
            return <Barcode value={i} />;
          })}
        </div>
      </div>
    );
  }
}
export default BarcodePrint;
