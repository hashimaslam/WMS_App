import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useBarcode } from "react-barcodes";
import BarcodePrint from "./BarcodePrint";
import { useReactToPrint } from "react-to-print";
import { Printer as PrinterIcon } from "react-feather";
export default function PrintModal({ value }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const componentRef = useRef();
  // const { inputRef } = useBarcode({
  //   value: "react-barcodes",
  //   options: {
  //     background: "#ccffff",
  //   },
  // })
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Button
        color="primary"
        size="small"
        variant="contained"
        startIcon={<PrinterIcon size="15" />}
        onClick={handleClickOpen}
      >
        Print
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box>
          <BarcodePrint ref={componentRef} value={value} />
        </Box>
        <DialogActions>
          <Button autoFocus onClick={handlePrint} color="primary">
            Print
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
