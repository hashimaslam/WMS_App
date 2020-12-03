import DBR from "./dbr";
import React from "react";
import BarcodeScanner from "./BarcodeScanner";
import { Box } from "@material-ui/core";

class BCwrapper extends React.Component {
  constructor(props) {
    super(props);
    this.reader = null;
    this.refDivMessage = React.createRef();
  }
  componentWillUnmount() {
    if (this.reader) {
      this.reader.destroy();
    }
  }
  render() {
    return (
      <div>
        {this.props.bShowScanner ? (
          <div>
            <BarcodeScanner
              appendMessage={this.props.appendMessage}
            ></BarcodeScanner>
          </div>
        ) : (
          <Box
            m={3}
            style={{
              width: "95%",
              height: "400px",
              background: "white",
            }}
          ></Box>
        )}
      </div>
    );
  }

  onIptChange = (event) => {
    let input = event.target;

    (async () => {
      try {
        this.props.appendMessage("======== start read... ========");
        let reader = (this.reader =
          this.reader || (await DBR.BarcodeReader.createInstance()));
        let files = input.files;
        for (let i = 0; i < files.length; ++i) {
          let file = files[i];
          this.props.appendMessage(file.name + ":");
          let results = await reader.decode(file);
          for (let result of results) {
            this.props.appendMessage(result.barcodeText);
          }
        }
        input.value = "";
        this.props.appendMessage("======== finish read ========");
      } catch (ex) {
        this.props.appendMessage(ex.message);
        console.error(ex);
      }
    })();
  };
}

export default BCwrapper;
