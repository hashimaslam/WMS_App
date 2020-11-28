import DBR from "./dbr";
import React from "react";
import BarcodeScanner from "./BarcodeScanner";

class BCwrapper extends React.Component {
  constructor(props) {
    super(props);
    this.reader = null;
    this.refDivMessage = React.createRef();
  }
  // componentDidUpdate() {
  //   this.refDivMessage.current.scrollTop = this.refDivMessage.current.scrollHeight;
  // }
  componentWillUnmount() {
    if (this.reader) {
      this.reader.destroy();
    }
  }
  render() {
    return (
      <div>
        {this.props.bShowScanner && (
          <div>
            <BarcodeScanner
              appendMessage={this.props.appendMessage}
            ></BarcodeScanner>
          </div>
        )}

        {/* <div
          className="div-message"
          //   style={style.div_message}
          ref={this.refDivMessage}
        >
          {this.state.messages.map((message, index) => (
            <p key={this.state.messageKeyBase + index}>{message}</p>
          ))}
        </div> */}
      </div>
    );
  }
  // appendMessage = (str) => {
  //   this.setState((state) => {
  //     state.messages.push(str);
  //     if (state.messages.length > 500) {
  //       ++state.messageKeyBase;
  //       state.messages.splice(0, 1);
  //     }
  //     return state;
  //   });
  // };
  onIptChange = (event) => {
    // React can't get event.target in async func by default.
    // Thus get event.target in sync part.
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
  // showScanner = () => {
  //   this.props.setState({
  //     bShowScanner: true,
  //   });
  // };
  // hideScanner = () => {
  //   this.setState({
  //     bShowScanner: false,
  //   });
  // };
}

// const style = {
//   div_message: {
//     maxHeight: "200px",
//     overflowY: "auto",
//     resize: "both",
//   },
// };

export default BCwrapper;
