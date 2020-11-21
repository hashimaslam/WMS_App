import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  cardHead: {
    fontSize: "22px",
    borderBottom: "1px solid #c7c9d1",
  },
}));
function AddForm() {
  const classes = useStyles();
  return (
    <div>
      <Box m={3}>
        <Card>
          <CardHeader
            title="SITE INFO"
            className={classes.cardHead}
          ></CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        <Box mt={3} />
        <Card>
          <CardHeader
            title="SITE DETAILS"
            className={classes.cardHead}
          ></CardHeader>
          <CardContent>
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
            <Box mt={3}>
              <TextField
                id="outlined-multiline-static"
                label="Comments"
                multiline
                rows={4}
                placeholder="Enter Comments Here"
                variant="outlined"
                fullWidth
              />
            </Box>
          </CardContent>
        </Card>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button color="primary" variant="contained">
            Cancel
          </Button>
          <Box mr={2}></Box>
          <Button color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default AddForm;
