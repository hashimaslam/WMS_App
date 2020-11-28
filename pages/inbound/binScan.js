import { Box, makeStyles, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import BCwrapper from "../../modules/inbound/components/barcode/BCwrapper";
import useSound from "use-sound";
import scanFx from "../../public/zapsplat_public_places_supermarket_till_scan_beep_single_26430.mp3";
const useStyles = makeStyles((theme) => ({
  scanItem: {
    margin: "30px auto",
    padding: "20px",
    width: "330px",
    background: "white",
  },
}));
export default function binSacn() {
  const classes = useStyles();
  const [play] = useSound(scanFx, { volume: 0.5 });
  const [state, setState] = useState({
    messageKeyBase: 0,
    text: "",
    bShowScanner: true,
  });
  const appendMessage = (str) => {
    play();
    setState({
      text: str,
      bShowScanner: false,
    });
  };
  const handleSubmit = () => {
    setState({
      text: "",
      bShowScanner: true,
    });
  };
  return (
    <MainLayout>
      <Box m={3}>
        <BCwrapper
          appendMessage={appendMessage}
          bShowScanner={state.bShowScanner}
        />
        <Box
          className={classes.scanItem}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            value={state.text}
            variant="outlined"
            margin="dense"
            label="Part Number"
          />

          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={handleSubmit}
          >
            Apply
          </Button>
          {/* {state.messages.map((message, index) => (
            <p key={this.state.messageKeyBase + index}>{message}</p>
          ))}  */}
        </Box>
      </Box>
    </MainLayout>
  );
}
