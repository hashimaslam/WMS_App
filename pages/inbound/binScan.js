import {
  Box,
  makeStyles,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import BCwrapper from "../../modules/inbound/components/barcode/BCwrapper";
import useSound from "use-sound";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import scanFx from "../../public/zapsplat_public_places_supermarket_till_scan_beep_single_26430.mp3";
import { checkBarcode } from "../../modules/inbound/actions";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  scanItem: {
    margin: "30px auto",
    padding: "20px",
    width: "330px",
    background: "white",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  formControl: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  codeLabels: {
    backgroundColor: "#f2f3f7",
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  strongTxt: {
    fontSize: "18px",
    fontWeight: 600,
  },
}));

export default function binSacn() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.inBound);

  const { bodyObj, locationData, partData } = state;
  const [loading, setLoading] = useState(false);
  const [play] = useSound(scanFx, { volume: 0.5 });
  const [scannerState, setScannerState] = useState({
    messageKeyBase: 0,
    text: "",
    bShowScanner: true,
  });
  const [docNumber, setDocNumber] = useState(null);
  const [partQty, setPartQty] = useState(null);
  const [barcodeManual, setBarcodeManual] = useState("");

  useEffect(() => {
    setPartQty(null);
    setDocNumber(null);
    setBarcodeManual("");
  }, [locationData]);

  const appendMessage = async (str) => {
    play();
    setScannerState({
      text: str,
      bShowScanner: false,
    });
    setLoading(true);
    let loaded = await checkBarcode(dispatch, bodyObj, state);
    setLoading(!loaded);
    setScannerState({
      text: "",
      bShowScanner: true,
    });
  };
  const handlePartQty = (e) => {
    if (e.target.value >= partData.requestquantity) {
      enqueueSnackbar(
        "Entered quantity higher than requested quantity of" +
          " " +
          partData.requestquantity,
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
      setPartQty("");
    } else {
      setPartQty(e.target.value);
    }
  };
  const handleManualBarcode = (e) => {
    setBarcodeManual(e.target.value);
  };
  const checkManualBarcode = async () => {
    setLoading(true);
    let newObj = {
      ...bodyObj,
      data: {
        islocation: false,
        barcode: "PART003-MAGGI",
      },
    };
    let loaded = await checkBarcode(dispatch, newObj, state);
    setLoading(!loaded);
  };
  const handleDocNumber = (e) => {
    setDocNumber(e.target.value);
  };
  const handleDocPartQty = (e) => {
    partData.documentnumber.map((i) => {
      if (i.documentnumber === docNumber) {
        if (e.target.value > i.requestquantity) {
          enqueueSnackbar(
            "Entered quantity higher than requested quantityof" +
              " " +
              i.requestquantity,
            {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
        } else {
          setPartQty(e.target.value);
        }
      }
    });
  };

  return (
    <MainLayout>
      <Box m={3}>
        <BCwrapper
          appendMessage={appendMessage}
          bShowScanner={scannerState.bShowScanner}
        />
        <Box
          className={classes.scanItem}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {locationData.location ? (
            <Box className={classes.codeLabels} component="div" mt={2}>
              <Typography className={classes.strongTxt}>LOCATION</Typography>
              <Typography>{locationData.location}</Typography>
            </Box>
          ) : (
            ""
          )}
          {partData.partnumber ? (
            <Box className={classes.codeLabels} component="div" mt={2} mb={2}>
              <Typography className={classes.strongTxt}>PART NUMBER</Typography>
              <Typography>{partData.partnumber}</Typography>
            </Box>
          ) : (
            ""
          )}

          {partData.parttype !== undefined && partData.parttype === "V" && (
            <>
              <TextField
                value={partQty}
                variant="outlined"
                margin="dense"
                label="Quantity"
                onChange={handlePartQty}
                style={{ width: "100%" }}
                type="number"
              />
            </>
          )}
          {partData.parttype !== undefined && partData.parttype === "NV" && (
            <Box className={classes.codeLabels} component="div" mt={2} mb={2}>
              <Typography>Scanned</Typography>
              <Typography>
                {partData.scannedquantity}/
                {partData.requestquantity - partData.scannedquantity}
              </Typography>
            </Box>
          )}
          {partData.parttype !== undefined && partData.parttype === "NVNU" && (
            <>
              <FormControl
                variant="outlined"
                size="small"
                margin="dense"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Document Number
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Document Number"
                  value={docNumber}
                  onChange={handleDocNumber}
                >
                  {partData.documentnumber.map((item, index) => {
                    return (
                      <MenuItem
                        key={item.requestkey}
                        value={item.documentnumber}
                      >
                        {item.documentnumber}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {docNumber !== null && (
                <TextField
                  value={partQty}
                  variant="outlined"
                  margin="dense"
                  label="Quantity"
                  onChange={handleDocPartQty}
                  style={{ width: "100%" }}
                  type="number"
                />
              )}
            </>
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              variant="outlined"
              margin="dense"
              label="Barcode Value"
              style={{
                width: "100%",
                marginBottom: "10px",
                marginRight: "4px",
              }}
              value={barcodeManual}
              onChange={handleManualBarcode}
            />
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={checkManualBarcode}
            >
              Validate
            </Button>
          </Box>
          <Button color="primary" variant="contained">
            Apply
          </Button>
        </Box>
      </Box>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MainLayout>
  );
}
