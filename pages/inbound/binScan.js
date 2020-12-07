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
} from "../../modules/inbound/actions";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { number } from "prop-types";

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
  const { bodyObj, locationData, partData, partBarcode, error } = state;
  const [loading, setLoading] = useState(false);
  const [play] = useSound(scanFx, { volume: 0.5 });
  const [validate, setValidate] = useState(false);
  const [scannerState, setScannerState] = useState({
    messageKeyBase: 0,
    text: "",
    bShowScanner: false,
  });
  const [docNumber, setDocNumber] = useState(null);
  const [partQty, setPartQty] = useState(null);
  const [barcodeManual, setBarcodeManual] = useState(null);
  const [all, setAll] = useState(false);

  useEffect(() => {
    setPartQty(null);
    setDocNumber(null);
    setBarcodeManual(null);
  }, [locationData]);
  useEffect(() => {
    partQty !== null && partQty !== "" ? setAll(true) : setAll(false);
  }, [partQty]);
  useEffect(() => {
    setDocNumber(null);
    setPartQty(null);
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
      data: { ...bodyObj.data, barcode: str },
    };

    let loaded = await checkBarcode(dispatch, newObj, state, str);
    setLoading(!loaded);
    setScannerState({
      text: "",
      bShowScanner: true,
    });
  };
  const handlePartQty = (e) => {
    if (!Number(e.target.value)) {
      setPartQty("");
    } else {
      let tempAvailQty = partData.requestquantity - partData.scannedquantity;
      if (
        e.target.value > partData.requestquantity ||
        e.target.value > tempAvailQty
      ) {
        enqueueSnackbar(
          "Entered quantity higher than Requested quantity of" +
            " " +
            partData.requestquantity +
            " " +
            "or greater than Remaining Quantity of" +
            " " +
            (partData.requestquantity - partData.scannedquantity),
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
    }
  };
  const handleManualBarcode = (e) => {
    if (
      e.target.value === "" ||
      e.target.value === undefined ||
      e.target.value === null
    ) {
      setBarcodeManual(null);
    } else {
      setBarcodeManual(e.target.value);
    }
  };
  useEffect(() => {
    if (barcodeManual === null || barcodeManual === "") {
      console.log(barcodeManual, "from");
      setValidate(true);
    } else {
      setValidate(false);
    }
  }, [barcodeManual]);

  const checkManualBarcode = async () => {
    setLoading(true);
    let newObj = {
      ...bodyObj,
      data: {
        islocation: false,
        barcode: barcodeManual,
      },
    };
    let loaded = await checkBarcode(dispatch, newObj, state, barcodeManual);
    setLoading(!loaded);
    setBarcodeManual("");
  };
  const handleDocNumber = (e) => {
    setDocNumber(e.target.value);
  };
  const handleDocPartQty = (e) => {
    partData.documentnumber.map((i) => {
      if (i.documentnumber === docNumber) {
        let tempAvailQty = i.requestquantity - i.scannedquantity;
        if (
          e.target.value > i.requestquantity ||
          e.target.value > tempAvailQty
        ) {
          enqueueSnackbar(
            "Entered quantity higher than requested quantity of" +
              " " +
              i.requestquantity +
              " " +
              "or greater than scanned Quantity of" +
              " " +
              (i.requestquantity - i.scannedquantity),
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
  const handleSubmit = async () => {
    let data = {
      quantity: partData.parttype === "NV" ? 1 : partQty,
      documentnumber: docNumber,
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
          boxShadow={7}
        >
          {locationData.location ? (
            <Box className={classes.codeLabels} component="div" mt={2} mb={2}>
              <Typography className={classes.strongTxt}>LOCATION</Typography>
              <Typography>{locationData.location}</Typography>
            </Box>
          ) : (
            ""
          )}
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

          {partData.parttype !== undefined && partData.parttype === "V" && (
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
              label="Barcode"
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
              disabled={validate}
            >
              Validate
            </Button>
          </Box>
          {all && (
            <Button color="primary" variant="contained" onClick={handleSubmit}>
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
