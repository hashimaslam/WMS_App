import React, { useState, useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";

import { setRequests } from "../actions";
const useStyles = makeStyles((theme) => ({
  cardHead: {
    fontSize: "22px",
    borderBottom: "1px solid #c7c9d1",
  },
}));
function CreateRequest({ dispatch }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [reqValue, setReqValue] = useState({
    destination_site: "",
    pocust_ref: "",
    invoice_no: "",
    reference_1: "",
    reference_2: "",
    reference_3: "",
    part_no: "",
    stock_type: "",
    quantity: "",
    cust_lpn: "",
    batch_number: "",
  });

  const handleChange = (e) => {
    setReqValue({ ...reqValue, [e.target.name]: e.target.value });
  };

  const resetValues = () => {
    setReqValue({
      destination_site: "",
      pocust_ref: "",
      invoice_no: "",
      reference_1: "",
      reference_2: "",
      reference_3: "",
      part_no: "",
      stock_type: "",
      quantity: "",
      cust_lpn: "",
      batch_number: "",
    });
  };

  const handleSubmit = async () => {
    let res = await setRequests(dispatch, reqValue);
    enqueueSnackbar(res, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
    resetValues();
  };

  return (
    <div>
      <Box m={3}>
        <Card>
          <CardHeader
            title="ORDER CREATION"
            className={classes.cardHead}
          ></CardHeader>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Destination Site"
                  margin="dense"
                  variant="outlined"
                  name="destination_site"
                  value={reqValue.destination_site}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="PO/Cust Ref"
                  margin="dense"
                  variant="outlined"
                  name="pocust_ref"
                  value={reqValue.pocust_ref}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Invoice No"
                  margin="dense"
                  variant="outlined"
                  name="invoice_no"
                  value={reqValue.invoice_no}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Reference 1"
                  margin="dense"
                  variant="outlined"
                  name="reference_1"
                  value={reqValue.reference_1}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Reference 2"
                  margin="dense"
                  variant="outlined"
                  name="reference_2"
                  value={reqValue.reference_2}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Reference 3"
                  margin="dense"
                  variant="outlined"
                  name="reference_3"
                  value={reqValue.reference_3}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Box mt={3} />
        <Card>
          <CardHeader title="DETAILS" className={classes.cardHead}></CardHeader>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Part Number"
                  margin="dense"
                  variant="outlined"
                  name="part_no"
                  value={reqValue.part_no}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Part Description"
                  margin="dense"
                  variant="outlined"
                  disabled
                  placeholder="Enter"
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Stock Type"
                  margin="dense"
                  variant="outlined"
                  required
                  name="stock_type"
                  value={reqValue.stock_type}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Quantity"
                  margin="dense"
                  variant="outlined"
                  name="quantity"
                  value={reqValue.quantity}
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Customer LPN"
                  margin="dense"
                  variant="outlined"
                  name="cust_lpn"
                  value={reqValue.cust_lpn}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Batch Number"
                  margin="dense"
                  variant="outlined"
                  name="batch_number"
                  value={reqValue.batch_number}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* <Grid container spacing={3}>
              <Grid item xs={6} sm={6} lg={3} xl={3}>
                <TextField
                  id="outlined-basic"
                  label="Site Name*"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={3} xl={3}>
                <TextField
                  id="outlined-basic"
                  label="Site Type*"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={3} xl={3}>
                <TextField
                  id="outlined-basic"
                  label="Entity*"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={3} xl={3}>
                <TextField
                  id="outlined-basic"
                  label="Cust Assign*"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            */}
          </CardContent>
        </Card>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default CreateRequest;
