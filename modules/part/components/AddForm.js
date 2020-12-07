import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {
  makeStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Link,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  cardHead: {
    fontSize: "22px",
    borderBottom: "1px solid #c7c9d1",
  },
  formControl: {
    minWidth: "100%",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
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
      <Box m={2}>
        <Card>
          <CardHeader
            title="SITE INFO"
            className={classes.cardHead}
          ></CardHeader>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <FormControl
                  variant="outlined"
                  size="small"
                  margin="dense"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Account Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Account Name"
                  >
                    <MenuItem value="acc2">Acc1</MenuItem>
                    <MenuItem value="acc3">Acc2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  label="Part Number"
                  margin="dense"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <TextField
                  label="Part Description"
                  margin="dense"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <FormControl
                  variant="outlined"
                  size="small"
                  margin="dense"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Part Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Site Type"
                  >
                    <MenuItem value="NV">NV</MenuItem>
                    <MenuItem value="V">V</MenuItem>
                    <MenuItem value="NV">NV</MenuItem>
                    <MenuItem value="NVNU">NVNU</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6} lg={4} xl={4}>
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
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} lg={2} xl={2}>
                <FormControl
                  variant="outlined"
                  size="small"
                  margin="dense"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    CUS/LPN No
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="CUS/LPN No"
                  >
                    <MenuItem value="NV">Yes</MenuItem>
                    <MenuItem value="V">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Box mt={3} />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Link href="/">
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
