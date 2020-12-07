import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 180,
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
}));
function MdsearchFilter({ filterValues, handleChange, handleApply }) {
  const classes = useStyles();
  return (
    <Box p={2}>
      <Grid container spacing={3}>
        {filterValues.map((i, index) => {
          return (
            <Grid item xs={6} sm={6} lg={3} xl={3}>
              <FormControl
                variant="outlined"
                size="small"
                margin="dense"
                className={classes.formControl}
                key={index}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  {i.label}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  placeholder={i.placeholder}
                  onChange={handleChange}
                  label={i.label}
                  name={i.name}
                >
                  {i.items.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          );
        })}
      </Grid>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button color="primary" variant="outlined" onClick={handleApply}>
          Apply
        </Button>
      </Box>
    </Box>
  );
}

export default MdsearchFilter;
