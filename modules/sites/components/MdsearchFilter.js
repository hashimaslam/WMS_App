import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
function MdsearchFilter() {
  return (
    <Box p={2}>
      <Grid container spacing={3}>
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
      <Box display="flex" justifyContent="center" mt={2}>
        <Button color="primary" variant="contained">
          Apply
        </Button>
      </Box>
    </Box>
  );
}

export default MdsearchFilter;
