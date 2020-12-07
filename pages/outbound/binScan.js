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
import {
  checkBarcode,
  handleInsert,
  stateReset,
} from "../../modules/outbound/actions";
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
  const state = useSelector((state) => state.outBound);
  const { bodyObj, partData, partBarcode, error } = state;
  const [loading, setLoading] = useState(false);
  const [play] = useSound(scanFx, { volume: 0.5 });
  const [scannerState, setScannerState] = useState({
    messageKeyBase: 0,
    text: "",
    bShowScanner: false,
  });
  //   const [docNumber, setDocNumber] = useState(null);
  const [location, setLocation] = useState(undefined);
  const [partQty, setPartQty] = useState(null);
  const [barcodeManual, setBarcodeManual] = useState(undefined);
  const [locationkey, setLocationKey] = useState(undefined);
  const [all, setAll] = useState(false);

  useEffect(() => {
    console.log(bodyObj);
  }, [bodyObj]);

  useEffect(() => {
    setPartQty(null);
    setBarcodeManual("");
    setLocation(null);
  }, [partData]);
  useEffect(() => {
    if (partData.parttype === "NV") {
      location === null || location === "" ? setAll(false) : setAll(true);
    } else {
      partQty === null || partQty === "" ? setAll(false) : setAll(true);
    }
  }, [partQty]);
  useEffect(() => {
    if (partData.parttype === "NV") {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [partData]);
  useEffect(() => {
    error.status &&
      enqueueSnackbar(error.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
  }, [error]);

  const appendMessage = async (str) => {
    play();
    setScannerState({
      text: str,
      bShowScanner: false,
    });
    setLoading(true);
    let newObj = {
      ...bodyObj,
      data: str,
    };

    let loaded = await checkBarcode(dispatch, newObj, state, str);
    setLoading(!loaded);
    setScannerState({
      text: "",
      bShowScanner: true,
    });
  };
  const handlePartQty = (e) => {
    let tempStockQty;
    partData.location.map((i) => {
      i.name === location ? (tempStockQty = i.stockquantity) : null;
    });
    if (
      e.target.value > tempStockQty ||
      e.target.value > partData.requestquantity
    ) {
      enqueueSnackbar(
        "Entered quantity higher than requested quantity of" +
          " " +
          partData.requestquantity +
          " " +
          "or greater than Stock Quantity of" +
          " " +
          tempStockQty,
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
      data: barcodeManual,
    };
    let loaded = await checkBarcode(dispatch, newObj, state, barcodeManual);
    setLoading(!loaded);
    setBarcodeManual("");
  };

  const handleLocation = (e) => {
    partData.location.map((i) => {
      i.name === e.target.value ? setLocationKey(i.locationkey) : null;
    });
    setLocation(e.target.value);
  };

  const handleSubmit = async () => {
    let data = {
      quantity: partData.parttype === "NV" ? 1 : partQty,
      locationkey: locationkey,
    };
    let res = await handleInsert(dispatch, data, state);
    enqueueSnackbar(res.message, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
    stateReset(dispatch, state);
    console.log("submitted");
  };

  return (
    <MainLayout>
      <Box m={3}>
        <BCwrapper
          appendMessage={appendMessage}
          bShowScanner={scannerState.bShowScanner}
        />
        <Box
          style={{ width: "100%" }}
          display="flex"
          justifyContent="center"
          mt={2}
        >
          <Button
            color="primary"
            variant="outlined"
            onClick={() =>
              setScannerState({
                ...scannerState,
                bShowScanner: !scannerState.bShowScanner,
              })
            }
          >
            {scannerState.bShowScanner ? "Hide Scanner" : "Show Scanner"}
          </Button>
        </Box>
        <Box
          className={classes.scanItem}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {partData.partnumber ? (
            <Box className={classes.codeLabels} component="div" mt={2}>
              <Typography className={classes.strongTxt}>PART NUMBER</Typography>
              <Typography>{partData.partnumber}</Typography>
            </Box>
          ) : (
            ""
          )}

          {partBarcode !== null && (
            <Box className={classes.codeLabels} component="div" mt={2} mb={2}>
              <Typography className={classes.strongTxt}>LPN</Typography>
              <Typography>{partBarcode}</Typography>
            </Box>
          )}

          {partData.location !== undefined && (
            <FormControl
              variant="outlined"
              size="small"
              margin="dense"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Location
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Document Number"
                value={location}
                onChange={handleLocation}
              >
                {partData.location.map((item) => {
                  return (
                    <MenuItem key={item.locationkey} value={item.name}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}

          {(partData.parttype !== undefined &&
            location !== null &&
            partData.parttype === "V") ||
          partData.parttype === "NVNU" ? (
            <>
              <TextField
                value={partQty}
                variant="outlined"
                margin="dense"
                label="Quantity"
                onChange={handlePartQty}
                style={{ width: "100%" }}
              />
            </>
          ) : (
            ""
          )}
          {/* {partData.parttype !== undefined && partData.parttype === "NV" && (
              <Box className={classes.codeLabels} component="div" mt={2} mb={2}>
                <Typography>Scanned</Typography>
                <Typography>
                  {partData.scannedquantity}/
                  {partData.requestquantity - partData.scannedquantity}
                </Typography>
              </Box>
            )} */}

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
          {all && (
            <Button color="primary" variant="outlined" onClick={handleSubmit}>
              Apply
            </Button>
          )}
        </Box>
      </Box>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MainLayout>
  );
}
