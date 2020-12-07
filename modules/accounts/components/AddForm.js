import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Link, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  cardHead: {
    fontSize: "22px",
    borderBottom: "1px solid #c7c9d1",
  },
  isActive: {
    marginTop: "10px",
  },
}));
function AddForm() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    isActive: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <form>
      <Box m={3}>
        <Card>
          <CardHeader
            title="ACCOUNT INFO"
            className={classes.cardHead}
          ></CardHeader>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Account Name"
                  margin="dense"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  id="outlined-basic"
                  label="Parent Acc Type"
                  margin="dense"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={3} xl={3}>
                <FormControlLabel
                  className={classes.isActive}
                  control={
                    <Switch
                      checked={state.isActive}
                      onChange={handleChange}
                      name="isActive"
                      required
                    />
                  }
                  label="IsActive"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Box mt={3} />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Link href="/accounts">
            <Button color="primary" variant="outlined">
              Cancel
            </Button>
          </Link>
          <Box mr={2}></Box>
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default AddForm;
